'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');
var Api = require('../Api');

var TodoActions = {

    create: function(text) {
        Api.createTodo(text);
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_CREATE,
            text: text
        });
    },

    toggleComplete: function(todo) {
        var id = todo._id || todo.id;

        if (todo.done) {
            Api.updateTodo(id, {done: false});
            AppDispatcher.dispatch({
                actionType: TodoConstants.TODO_NOT_COMPLETE,
                id: id
            });
        }
        else {
            Api.updateTodo(id, {done: true});
            AppDispatcher.dispatch({
                actionType: TodoConstants.TODO_COMPLETE,
                id: id
            });
        }
    },

    toggleCompleteAll: function() {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
        });
    },

    destroy: function(todo) {
        var id = todo._id || todo.id;

        Api.deleteTodo(id);
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_DESTROY,
            id: id
        });
    },

    destroyCompleted: function() {
        AppDispatcher.dispatch({
            TodoActionstionType: TodoConstants.TODO_DESTROY_COMPLETED
        });
    },

    getTodos: function() {
        Api.getTodos();
    }

};

module.exports = TodoActions;

