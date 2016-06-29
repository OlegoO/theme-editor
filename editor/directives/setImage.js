;(function() {

  angular.module('theme-editor')
    .directive('editorSetImage', setImage);

  function setImage() {
    return {
      restrict: 'A',
      template:
        "<input type='file'>\
        <button class='btn'>Choose file</button>",
      link: function(scope, elem, attrs) {
        $(elem).children('.btn').bind('click', function () {
            var $self = $(this).parent();
            $self.find('input[type="file"]').trigger('click');
        });

        function readURL(input) {
          if (input.files && input.files[0]) {
            var reader = new FileReader();
            var $self = $(input).parents('.pane-settings');
            reader.onload = function (e) {
              $self.find('.form-img').html('<img src="' + e.target.result + '" alt="" /><div class="name">' + input.files[0].name + '</div>');
            };
            reader.readAsDataURL(input.files[0]);
          }
        }
        $(elem).children("input").change(function(){
          readURL(this);
        });
      }
    };
  }

})();
