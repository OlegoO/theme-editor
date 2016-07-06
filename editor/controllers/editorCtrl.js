;(function() {

  angular.module('theme-editor')
    .controller('EditorCtrl', ['$scope', 'defaultSchema', 'presets', 'modelBuilder',/* 'History', */'stack', EditorCtrl]);

  function EditorCtrl($scope, defaultSchema, presets, modelBuilder,/* History,*/ stack) {
    var self = this;

    self.convertName = function(name) {
      return name.toLowerCase().replace(/ /g, "-");
    };

    defaultSchema.getDefaultSchema()
      .then(function(response) {
        return self.settings = response.data;
      })
      .then(function(settings) {
        self.model = modelBuilder.modelFromSchema(settings, {});
      });

    presets.getPresets()
      .then(function(response) {
        return self.presets = response.data;
      })
      .then(function(presets) {
        self.model = modelBuilder.updateModelFromPresets(presets, self.model);
        $scope.$broadcast('modelUpdated', self.model);
      });

    self.updateModel = function() {
      self.model = modelBuilder.modelFromSchema(self.settings, {});
      self.model = modelBuilder.updateModelFromPresets(self.presets, self.model);
      $scope.$broadcast('modelUpdated', self.model);
      stack.clear();
      //History.forget(self, 'model');
      //History.watch('model', self);
    };

    $scope.$watch('editor.model', function(newValue, oldValue) {
      if (newValue !== undefined) {
        stack.push(newValue);
      }
      console.log(newValue);
    }, true);

    ////// Presets //////
    self.openPreset = function(name) {
      self.presets.current = name;
      self.updateModel();
    };

    self.removePreset = function(name) {
      presets.removePreset(self.presets, name);
      self.updateModel();
    }

    self.savingPreset = false;
    //self.newPresetName = "Preset name";
    self.startSavingPreset = function() {
      self.savingPreset = true;
      self.newPresetName = "Preset name";
    };
    self.endSavingPreset = function() {
      self.savingPreset = false;
      self.presets.presets[self.newPresetName] = self.model;
      self.presets.current = self.newPresetName;
      // TODO: savin in servise
    };
    self.cancelSavingPreset = function() {
      self.savingPreset = false;
      console.log(self.newPresetName);
    };


    self.undo = function() {
      //History.undo('model', self);
      if(!stack.isLast()) {
        stack.pop();
        self.model = stack.get();
        $scope.$broadcast('modelUpdated', self.model);
      }
    };

  }

})();
