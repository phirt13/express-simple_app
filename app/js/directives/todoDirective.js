'use strict';

module.exports = function(app){
  app.directive('todoDirective', function(){
    return {
      restrict: 'AC',
      templateUrl: '/js/directives/todoDirective.html'
    };
  });
};
