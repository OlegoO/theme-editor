;(function() {

  angular.module('theme-editor')
    .factory('imageService', ImageService);

  function ImageService() {
    var obj = {};

    obj.upload = function(str) {
      // TODO: saving image
      return str;
    };

    return obj;
  }

})();
