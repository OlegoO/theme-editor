;(function() {

  angular.module('theme-editor')
    .directive('editorSetColor', setColor);

  function setColor() {
    return {
      restrict: 'E',
      scope: {
        value: "="
      },
      template: "<div class='bg'></div>",
      link: function(scope, elem, attrs) {

        $(elem).ColorPicker({
          color: scope.value,
          onChange: function (hsb, hex, rgb) {
            $(elem).find('div').css('backgroundColor', '#' + hex);
          }
        });

        $(elem).children('.bg').css("background-color", scope.value);

      }
    };
  }

})();
