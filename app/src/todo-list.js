'use strict';

var TodoList = React.createClass({
  render: function() {
    var todos = this.props.data.map(function (todo) {
        return (
            <TodoItem key={todo.id} done={todo.done}>{todo.text}</TodoItem>
        );
    });
    return (
        <ul className="todo-list">
            {todos}
        </ul>
    );
  }
});