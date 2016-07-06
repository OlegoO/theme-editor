;(function() {

  angular.module('theme-editor')
    .directive('editorSetImage', setImage);

  function setImage() {
    return {
      restrict: 'AE',
      scope: {
        src: "=",
        name: "="
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

        function readURL(input) {
          if (input.files && input.files[0]) {
            var reader = new FileReader();
            var $self = $(input).parent().parents('.pane-settings');
            reader.onload = function (e) {
              scope.src = e.target.result;
              scope.name = input.files[0].name;
              $self.find('.form-img').html('');
              $self.find('.form-img').html('<img src="' + scope.src + '" alt="" /><div class="name">' + scope.name + '</div>');
              scope.$apply();
            };
            reader.readAsDataURL(input.files[0]);
          }
        }

        $(elem).children(".form-file").children("input").change(function() {
          readURL(this);
        });

        if (scope.src !== undefined) {
          var name = scope.name !== undefined ? scope.name : "";
          $(input).parents('.pane-settings').find('.form-img').html('<img src="' + scope.src + '" alt="" /><div class="name">' + name + '</div>');
        }

        scope.$on('modelUpdated', function(event, model) {
          var id = attrs.id;
          var image = model[id] !== undefined ? model[id] : {src: "", name: ""};

          $(elem).parents('.pane-settings').find('.form-img').html('<img src="' + image.src + '" alt="" /><div class="name">' + image.name + '</div>');
        });

      }
    };
  }

})();
