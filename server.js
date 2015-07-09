'use strict';

var mongoose = require('mongoose');
var express = require('express');
var app = express();

var todoRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/apptodos');

app.use(express.static(__dirname + '/public'));

require('./routes/todos_routes')(todoRoutes);

app.use('/api', todoRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('Server running on port ' + (process.env.PORT || 3000));
});


