;(function() {

  angular.module('theme-editor')
    .factory('stack', Stack);

  function Stack() {
    var obj = {}, stack = [];

    obj.push = function(item) {
      var copy = JSON.parse(JSON.stringify(item));
      stack.push(copy);
    }

    obj.pop = function() {
      if (stack.length > 1) {
        stack.pop();
      }
    };

    obj.length = function() {
      return stack.length;
    };

    obj.isLast = function() {
      return stack.length === 1;
    };

    obj.get = function() {
      if (stack.length !== 0) {
        return stack[stack.length - 1]
      } else {
        return stack;
      }
    };

    obj.clear = function() {
      return stack = [];
    };

    return obj;
  }

})();
