'use strict';

require('angular/angular');

var todoApp = angular.module('todoApp', []);

require('./services/todoService.js')(todoApp);

require('./controllers/todoController.js')(todoApp);


