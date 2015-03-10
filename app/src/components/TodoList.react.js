'use strict';
var React = require('react');
var TodoForm = require('./TodoForm.react');
var TodoItemList = require('./TodoItemList.react');
var TodoStore = require('../stores/TodoStore');
var TodoActions = require('../actions/TodoActions');

function getTodoState() {
    return { todos: TodoStore.getAll() };
}

var TodoList = React.createClass({

    getInitialState: function() {
        return getTodoState();
    },

    componentDidMount: function() {
        TodoActions.getTodos();
        TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return (
            <div className="todo-list">
                <TodoForm />
                <TodoItemList data={this.state} />
            </div>
        );
    },

    _onChange: function() {
        this.setState(getTodoState());
    }
});

module.exports = TodoList;
