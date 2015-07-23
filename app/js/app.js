'use strict';

var todoApp = angular.module('todoApp', []);

  todoApp.controller('mainController', ['$scope', '$http', function($scope, $http) {

  function makeMongoTodo() {

    $http.get('api/get_todos').success(function(data) {

      console.log('Mongo says: "Got it"');
      console.log(data);

      $scope.todos = data;

    for(var i = 0; i < $scope.todos.length; i++) {
      $scope.todos[i].update = false;
    }

      console.log($scope.todos);

    });
  }

  makeMongoTodo();

  $scope.submitForm = function(newTodo) {
      $http.post('api/create_todos', newTodo).success(function(data) {

        console.log('Mongo says: "Recieved!"');
        console.log(data);

        makeMongoTodo();

      });
  };

  $scope.destroyTodo = function(todoID) {

    console.log(todoID);

    $http.delete('api/remove_todos' + todoID).success(function(data) {

      console.log('Mongo says: "Removed!"');
      console.log(data);

      makeMongoTodo();

    });
  };

  $scope.updateTodo = function(todoID, todoBody) {

    console.log(todoID);
    console.log(todoBody);

    $http.put('api/update_todos', {_id : todoID, todo : todoBody}).success(function(data) {

      console.log('Mongo says: "Updated!"');
      console.log(data);

      // makeMongoTodo();

    });

    return function(todo) {
      todo.update = false;
    }
  };

}]);


