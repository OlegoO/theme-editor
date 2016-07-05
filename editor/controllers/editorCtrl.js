;(function() {

  angular.module('theme-editor')
    .controller('EditorCtrl', ['defaultSchema', 'presets', 'modelBuilder', EditorCtrl]);

  function EditorCtrl(defaultSchema, presets, modelBuilder) {
    var self = this;

    self.log = function() {
      console.dir(self.model);
    }

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
      });

    self.convertName = function(name) {
      return name.toLowerCase().replace(/ /g, "-");
    };
  }

})();
