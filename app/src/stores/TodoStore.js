var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = [];

function findTodoWithId(id) {
    var todos = _todos.filter(function (todo) {
        return todo.id === id || todo._id === id;
    });

    return _todos.indexOf(todos[0]);
}

function create(text, callback) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos.push({
        id: id,
        done: false,
        text: text
    });
}

function update(id, updates) {
    var index = findTodoWithId(id);
    _todos[index] = assign({}, _todos[index], updates);
}

function updateAll(updates) {
    for (var id in _todos) {
        update(id, updates);
    }
}

function destroy(id) {
    var index = findTodoWithId(id);
    delete _todos[index];
}

function destroyCompleted() {
    for (var id in _todos) {
        if (_todos[id].done) {
            destroy(id);
        }
    }
}

var TodoStore = assign({}, EventEmitter.prototype, {

    areAllComplete: function() {
        for (var id in _todos) {
            if (!_todos[id].complete) {
                return false;
            }
        }
        return true;
    },

    getAll: function() {
        return _todos;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {

    switch(action.actionType) {
        case TodoConstants.TODO_CREATE:
            var text;
            text = action.text.trim();
            if (text !== '') {
                create(text);
                TodoStore.emitChange();
            }
            break;

        case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
            if (TodoStore.areAllComplete()) {
                updateAll({done: false});
            }
            else {
                updateAll({done: true});
            }
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_NOT_COMPLETE:
            update( action.id, {done: false} );
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_COMPLETE:
            update( action.id, {done: true} );
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_DESTROY:
            destroy( action.id );
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_DESTROY_COMPLETED:
            destroyCompleted();
            TodoStore.emitChange();
            break;
        case TodoConstants.api.GET_TODOS:
            _todos = action.response;
            TodoStore.emitChange();
            break;

        default:
            // no op
    }
});

module.exports = TodoStore;
