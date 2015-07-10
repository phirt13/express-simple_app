'use strict';

var Todo = require('../models/Todo.js');
var bodyParser = require('body-parser');

module.exports = function(router) {

  router.use(bodyParser.json());

  router.post('/create_todos', function(req, res) {

    console.log('Inside create todos!');
    console.log(req.body);


    var newTodoData = JSON.parse(JSON.stringify(req.body));
    //this is a fail-catch to makes sure that the info
    //is in JSON format.

    console.log(typeof(newTodoData));

    var newTodo = new Todo(newTodoData);

    newTodo.save(function(err, newTodo) {
      if(err) {
        console.log(err);
        return res.status(500).json({ msg : 'could not create todo'});
      } else {
        console.log('Mongo says: "Saved!"');

        res.json(newTodo);
      }
    });
  });

  router.get('/get_todos', function(req, res) {

    console.log('Inside get todos!');

    Todo.find({}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({ msg : 'internal server error'});
      } else {
        console.log('Mongo says: "Got it!"');
        console.log(data);

        res.json(data);
      }
    });
  });

  router.put('/update_todos', function(req, res) {

    console.log('Inside update todos!');

    Todo.update({ _id : req.body._id }, { todo : req.body.todo }, function(err, result) {
      if(err) {
        console.log(err);
        return res.status(500).json({ msg : 'internal server error'});
      } else {
        console.log('Mongo says: "Updated!"');
      }
    });

    Todo.find({}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({ msg : 'internal server error'});
      } else {
        console.log('Mongo says: "Got it!"');
        console.log(data);

        res.json(data);
      }
    });
  });

  router.delete('/remove_todos', function(req, res) {

    console.log('Inside remove todo!');
    console.log(req.body);

    Todo.remove({ _id : req.body._id }, function(err, result) {
      if(err) {
        console.log(err);
        return res.status(500).json({ msg : 'internal server error'});
      } else {
        console.log('Mongo says: "Removed!"');
      }
    });

    Todo.find({}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({ msg : 'internal server error'});
      } else {
        console.log('Mongo says: "Got it!"');
        console.log(data);

        res.json(data);
      }
    });
  });

};
