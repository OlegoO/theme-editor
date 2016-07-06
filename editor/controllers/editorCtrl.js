;(function() {

  angular.module('theme-editor')
    .controller('EditorCtrl', ['$scope', '$timeout', 'defaultSchema', 'presets', 'modelBuilder', 'stack', '$interval', EditorCtrl]);

  function EditorCtrl($scope, $timeout, defaultSchema, presets, modelBuilder, stack, $interval) {
    var self = this;

    // Convert invalid id
    self.convertName = function(name) {
      return name.toLowerCase().replace(/ /g, "-");
    };

    // Load schema and presets
    defaultSchema.getDefaultSchema()
      .then(function(response) {
        return self.settings = response.data;
      })
      .then(function() {
        return presets.getPresets();
      })
      .then(function(response) {
        return self.presets = response.data;
      })
      .then(function() {
        self.updateModel();
        self.updateStack();
      })
      .then(function() {
        console.log(self.model);
        angular.forEach(self.model, function(value, key) {
          $scope.$watch('editor.model.' + key, function(newValue, oldValue) {
            if (self.preventWatch) {
              $timeout(function() {
                self.preventWatch = false;
              });
            } else {
              if (typeof oldValue === 'object') {
                console.log(oldValue);
              }
              stack.push({
                key: key,
                value: oldValue
              });
            }
          }, true);
        });
      });

    self.updateModel = function() {
      self.preventWatch = true;
      self.model = modelBuilder.modelFromSchema(self.settings, {});
      self.model = modelBuilder.updateModelFromPresets(self.presets, self.model);
      // Update colorPicker directives by modelUpdated event
      $scope.$broadcast('modelUpdated', self.model);
    };

    $timeout(function () {
      console.log(self.model['logo.png']);
      console.log(self.model);
    }, 10000);

    self.updateStack = function() {
      stack.clear();
    };

    // Change current preset
    self.openPreset = function(name) {
      self.presets.current = name;
      self.updateModel();
      self.updateStack();
    };

    self.removePreset = function(name) {
      if (name === self.presets.current) {
        self.preventWatch = true;
      }
      presets.removePreset(self.presets, name);
      self.updateModel();
    }

    self.savingPreset = false;
    self.startSavingPreset = function() {
      self.savingPreset = true;
      self.newPresetName = "Preset name";
    };
    self.endSavingPreset = function() {
      self.savingPreset = false;
      self.presets.presets[self.newPresetName] = self.model;
      self.presets.current = self.newPresetName;
    };
    self.cancelSavingPreset = function() {
      self.savingPreset = false;
      console.log(self.newPresetName);
    };

    self.undo = function() {
      if (stack.length() > 0) {
        self.preventWatch = true;
        var oldValue = stack.pop();
        console.log(stack.length());
        self.model[oldValue.key] = oldValue.value;
        $scope.$broadcast('modelUpdated', self.model);
      } else {
        console.log(stack.length());
      }
    };

  }

})();
