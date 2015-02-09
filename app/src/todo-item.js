'use strict';

var TodoItem = React.createClass({
  render: function() {
    return (
      <li className="todo-item">{this.props.children}</li>
    );
  }
});