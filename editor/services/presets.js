;(function() {

  angular.module('theme-editor')
    .factory('presets', ['$http', Presets]);

  function Presets($http) {
    var obj = {};

    obj.getPresets = function() {
      return $http.get('settings_data.json');
    }

    return obj;
  }

})();
