'use strict';

module.exports = function(app) {

  var handleError = function(err) {
    console.log(err);
  }

  app.factory('resource', ['$http', function($http) {
    return function() {
      return {
        maker: function(callback) {
          $http({
            method: 'GET',
            url: 'api/get_todos'
          })
          .success(callback)
          .error(handleError);
        },
        submitter: function(data, callback) {
          $http({
            method: 'POST',
            url: 'api/create_todos',
            data: data
          })
          .success(callback)
          .error(handleError);
        },
        destroyer: function(id, callback) {
          $http({
            method: 'DELETE',
            url: 'api/remove_todos' + id
          })
          .success(callback)
          .error(handleError);
        },
        updater: function(id, body, callback) {
          $http({
            method: 'PUT',
            url: 'api/update_todos',
            data: {_id : id, todo : body}
          })
          .success(callback)
          .error(handleError);
        }
      };
    };
  }]);
};
