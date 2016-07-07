;(function() {

  angular.module('theme-editor')
    .directive('editorSetImage', ['imageService', setImage]);

  function setImage(imageService) {
    return {
      restrict: 'AE',
      scope: {
        model: "="
      },
      template:
        "<div class='form-file'>\
          <input type='file'>\
          <button class='btn'>Choose file</button>\
        </div>",
      link: function(scope, elem, attrs) {

        $(elem).children('.form-file').children('.btn').bind('click', function () {
          var input = $(this).parent().find('input[type="file"]');
          input.val('');
          input.trigger('click');
        });

        $(elem).children(".form-file").children("input").change(function() {
          var self = this;

          if (self.files && self.files[0]) {
            var reader = new FileReader();
            var $self = $(self).parents('.pane-settings');
            reader.onload = function(e) {
              var id = attrs.id;
              var file = imageService.upload(e.target.result);
              var name = self.files[0].name;

              scope.$apply(function() {
                scope.model.src = file;
                scope.model.name = name;
              });

              $self.find('.form-img').html('');
              $self.find('.form-img').html('<img src=\"' + file + '\" alt="" /><div class="name">' + name + '</div>');
            };
            reader.readAsDataURL(self.files[0]);
          }
        });

        scope.$on('modelUpdated', function(event, model) {
          var id = attrs.id;
          if (model[id] === undefined) {
            model[id] = {
              src: "",
              name: ""
            };
          }
          $(elem).parents('.pane-settings').find('.form-img').html('<img src="' + model[id].src + '" alt="" /><div class="name">' + model[id].name + '</div>');
        });

      }
    };
  }

})();
