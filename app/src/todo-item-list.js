'use strict';

var TodoItemList = React.createClass({
    render: function() {
        var onTodo = this.props.onTodoClick;
        var todos = this.props.data.map(function (todo) {
            return (
                <TodoItem key={todo.id} id={todo.id} done={todo.done} onTodoClick={onTodo}>{todo.text}</TodoItem>
            );
        });
        return (
            <ul className="todo-item-list">
                {todos}
            </ul>
        );
    }
});