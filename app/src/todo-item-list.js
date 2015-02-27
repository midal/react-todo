'use strict';
var React = require('react');
var TodoItem = require('./todo-item');

var TodoItemList = React.createClass({
    render: function() {
        var onTodoDone = this.props.onTodoDone;
        var onTodoDelete = this.props.onTodoDelete;
        var todos = this.props.data.map(function (todo) {
            return (
                <TodoItem
                    key={todo.id}
                    data={todo}
                    onTodoDone={onTodoDone}
                    onTodoDelete={onTodoDelete}>
                        {todo.text}
                </TodoItem>
            );
        });
        return (
            <ul className="todo-item-list">
                {todos}
            </ul>
        );
    }
});

module.exports = TodoItemList;
