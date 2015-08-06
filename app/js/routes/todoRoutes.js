'use strict';

module.exports = function(app) {
  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when ('/about', {
      controller: 'mainController',
      templateUrl:'js/directives/aboutDirective.html'
    })
    .otherwise ({
      redirectTo: '/'
    });
  }]);
};
