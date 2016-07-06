;(function() {

  angular.module('theme-editor')
    .controller('EditorCtrl', ['$scope', '$timeout', 'defaultSchema', 'presets', 'modelBuilder',/* 'History', */'stack', EditorCtrl]);

  function EditorCtrl($scope, $timeout, defaultSchema, presets, modelBuilder,/* History,*/ stack) {
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
      });

    self.updateModel = function() {
      self.preventWatch = true;
      self.model = modelBuilder.modelFromSchema(self.settings, {});
      self.model = modelBuilder.updateModelFromPresets(self.presets, self.model);
      // Update colorPicker directives by modelUpdated event
      $scope.$broadcast('modelUpdated', self.model);
      //History.forget(self, 'model');
      //History.watch('model', self);
    };

    self.updateStack = function() {
      stack.clear();
      stack.push(self.model);
    };

    $scope.$watch('editor.model', function(newValue, oldValue) {
      if (self.preventWatch) {
        $timeout(function() {
          self.preventWatch = false;
        });
      } else if (newValue !== undefined) {
        stack.push(newValue);
      }
      console.log(stack.length());
    }, true);

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
      //History.undo('model', self);
      self.preventWatch = true;
      if(!stack.isLast()) {
        stack.pop();
        console.log(stack.length());
        self.model = stack.get();
        $scope.$broadcast('modelUpdated', self.model);
      }
    };

  }

})();
