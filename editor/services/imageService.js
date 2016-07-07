;(function() {

  angular.module('theme-editor')
    .factory('imageService', ImageService);

  function ImageService() {
    var obj = {};

    obj.upload = function(str) {
      // TODO: saving image
      return "http://i.istockimg.com/image-zoom/77960171/3/380/214/stock-illustration-77960171-desktop-and-devices-evolution.jpg";
    };

    return obj;
  }

})();
