'use strict';

var TodoItemList = React.createClass({
  render: function() {
    var todos = this.props.data.map(function (todo) {
        return (
            <TodoItem key={todo.id} done={todo.done}>{todo.text}</TodoItem>
        );
    });
    return (
        <ul className="todo-item-list">
            {todos}
        </ul>
    );
  }
});