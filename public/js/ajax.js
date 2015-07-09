$(function() {

  var todos = [];
  var $mongoUl = $('#mongo_list');
  var $todoInput = $('#new_todo');

  $todoInput.prop('required', false);

  var TodoModel = function(todo, _id) {
    this.todo = todo;
    this._id = _id;
  };

  (function makeMongoTodo() {

    $.ajax({
      type : 'GET',
      url: '/api/get_todos',
      datatype: 'json',
      success: function(data) {
        console.log('Mongo says: "Got it"');

        for(var i = 0; i < data.length; i++) {
          JSON.parse(todos.push( new TodoModel(data[i].todo, data[i]._id)));
        }

        console.log(data);
        console.log(todos);

      },
      error: function() {
        console.log('MongoDB says: "eff u!"');
      },
      complete: function() {

        // $('#list_container').append('<ul id="mongo_list"></ul>');
        for(var i = 0; i < todos.length; i++) {
          var todo = todos[i].todo;
          var todoId = todos[i]._id;
          var todoEl = '<li id="' + todoId + '">' +
           '<textarea disabled id="">' + todo + '</textarea>' +
           '<section class="todo-toggles">' +
           '<button id="edit" class="toggle-edit">edit</button>' +
           '<button id="done" class="toggle-edit-done">done</button>' +
           '<button id="delete" class="toggle-delete">del</button>' +
           '</section>' +
           '</li>';

          $('#mongo_list').append(todoEl);
        }
      }
    });

  })();

  $('#todo_maker').submit(function(e) {
    e.preventDefault();

    console.log($todoInput.val());

    var addTodo = new TodoModel($todoInput.val());

    var mongoTodo = JSON.stringify(addTodo, ['todo']);

    console.log(mongoTodo);

    $('input:text').val('');

    $.ajax({
      type: 'POST',
      url: 'api/create_todos',
      data: mongoTodo,
      datatype: 'json',
      contentType: 'application/json',
      success: function(data) {
        console.log('Sent!')
        var todo = data.todo;
        var todoId = data._id;
        var todoEl = '<li id="' + todoId + '">' +
         '<textarea disabled id="">' + todo + '</textarea>' +
         '<section class="todo-toggles">' +
         '<button id="edit" class="toggle-edit">edit</button>' +
         '<button id="done" class="toggle-edit-done">done</button>' +
         '<button id="delete" class="toggle-delete">del</button>' +
         '</section>' +
         '</li>';

        $('#mongo_list').append(todoEl);
      },
      error: function() {
        console.log('sucks dude');
      }

    });

  });

  $(mongo_list).on('click', '.toggle-delete', (function() {

    var getMongoId = ($(this).parents('li').attr('id'));

    $(this).parents('li').remove();

    var DeleteTodo = {
      _id : getMongoId
    };

    console.log(DeleteTodo);
    console.log(getMongoId);

    var sendDelete = JSON.stringify(DeleteTodo);

    $.ajax({
      type: 'DELETE',
      url: 'api/remove_todos',
      data: sendDelete,
      contentType: 'application/json',
      success: function() {
        console.log('deleted');
      },
      err: function(err) {
        console.log(err);
      }
    });

  }));

  $(mongo_list).on('click', '.toggle-edit', (function() {

    var $this = $(this).parent().prev();

    $this.prop('disabled', false);

  }));

  $(mongo_list).on('click', '.toggle-edit-done', (function() {

    $('textarea').prop('disabled', true);

    var getTodo = ($(this).parent().prev().val());
    var getId = ($(this).parents('li').attr('id'));

    console.log(getId);
    console.log(getTodo);

    var UpdateTodo = {
      todo : getTodo,
      _id : getId
    };

    var updateMongoData = JSON.stringify(UpdateTodo);

    console.log(updateMongoData);

    $.ajax({
      type: 'PUT',
      url: 'api/update_todos',
      data: updateMongoData,
      datatype: 'json',
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
      },
      erro: function() {
        console.log('no good');
      }
    })
  }));


});




