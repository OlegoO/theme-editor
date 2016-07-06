;(function() {

  angular.module('theme-editor')
    .directive('editorBack', setActivePane);

  function setActivePane() {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        //console.dir(attrs.name);
        $(elem).click(function() {

          $('.sidebar-main .pane:nth-child(2)').removeClass('__selected');
          $('.sidebar-main .pane:first-child').removeClass('__disabled');

          scope.$on('closePane', function() {
            $('.sidebar-main .pane:nth-child(2)').removeClass('__selected');
            $('.sidebar-main .pane:first-child').removeClass('__disabled');
          });

        });
      }
    };
  }

})();
