'use strict';
var React = require('react');
var TodoItem = require('./TodoItem.react');

var TodoItemList = React.createClass({
    render: function() {
        var todos = {};

        if (this.props.data) {
            todos = this.props.data.todos.map(function (todo) {
                return (
                    <TodoItem
                        key={todo.id}
                        data={todo}>
                            {todo.text}
                    </TodoItem>
                );
            });
        }

        return (
            <ul className="todo-item-list">
                {todos}
            </ul>
        );
    }
});

module.exports = TodoItemList;
