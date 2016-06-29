;(function() {

  angular.module('theme-editor')
    .controller('EditorCtrl', ['defaultSchema', EditorCtrl]);

  function EditorCtrl(defaultSchema) {
    var self = this;

    defaultSchema.getDefaultSchema().then(function (response) {
      self.settings = response.data;
    });

    self.convertName = function(name) {
      return name.toLowerCase().replace(/ /g, "-");
    };
  }

})();
