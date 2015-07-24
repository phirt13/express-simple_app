'use strict';

module.exports = function(app) {

  app.controller('mainController', ['$scope', 'resource', function($scope, resource) {

    var Http = resource();

      function makeMongoTodo() {

        Http.maker(function(data) {

          console.log('Mongo says: "Got it"');
          console.log(data);

          $scope.todos = data;

          for(var i = 0; i < $scope.todos.length; i++) {
            $scope.todos[i].update = false;
          }

          console.log($scope.todos);
        });
    };

  makeMongoTodo();

  $scope.submitForm = function(newTodo) {
      Http.submitter(newTodo, function(data) {

        console.log('Mongo says: "Recieved!"');
        console.log(data);

        makeMongoTodo();

      });
  };

  $scope.destroyTodo = function(todoID) {

    console.log(todoID);

    Http.destroyer(todoID, function(data) {

      console.log('Mongo says: "Removed!"');
      console.log(data);

      makeMongoTodo();

    });
  };

  $scope.updateTodo = function(todoID, todoBody) {

    console.log(todoID);
    console.log(todoBody);

    Http.updater(todoID, todoBody, function(data) {

      console.log('Mongo says: "Updated!"');
      console.log(data);

      // makeMongoTodo();

    });

    return function(todo) {
      todo.update = false;
    }
  };

}]);

};
