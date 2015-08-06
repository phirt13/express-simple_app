'use strict';

require('angular/angular');
require('angular-route');

var todoApp = angular.module('todoApp', ['ngRoute']);

//require service
require('./services/todoService.js')(todoApp);

//require controller
require('./controllers/todoController.js')(todoApp);

//require directive
require('./directives/todoDirective.js')(todoApp);

//require routes
require('./routes/todoRoutes.js')(todoApp);
