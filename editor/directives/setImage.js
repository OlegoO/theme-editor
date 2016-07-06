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
          var $self = $(this).parent();
          $self.find('input[type="file"]').val('');
          $self.find('input[type="file"]').trigger('click');
        });

        $(elem).children(".form-file").children("input").change(function() {
          var self = this;

          if (self.files && self.files[0]) {
            var reader = new FileReader();
            var $self = $(self).parent().parents('.pane-settings');
            reader.onload = function(e) {
              scope.$apply(function() {
                scope.model = {
                  src: imageService.upload(e.target.result),
                  name: self.files[0].name
                };
              });

              $self.find('.form-img').html('');
              $self.find('.form-img').html('<img src="' + scope.model.src + '" alt="" /><div class="name">' + scope.model.name + '</div>');
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
          var image = model[id];

          $(elem).parents('.pane-settings').find('.form-img').html('<img src="' + image.src + '" alt="" /><div class="name">' + image.name + '</div>');
        });

      }
    };
  }

})();
