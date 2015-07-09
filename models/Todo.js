'use strict';

var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
  todo: String
});

module.exports = mongoose.model('Todo', todoSchema);
