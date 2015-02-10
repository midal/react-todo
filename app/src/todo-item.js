'use strict';

var TodoItem = React.createClass({
  handleDone: function(event) {
      this.props.onTodoDone(this.props.data);
  },
  handleDelete: function(event) {
      this.props.onTodoDelete(this.props.data);
  },
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'todo-item ': true,
      'done': this.props.data.done
    });

    return (
      <li className={classes} onClick={this.handleDone}>
        {this.props.children}
        <span className="deleteTodo" onClick={this.handleDelete}>x</span>
      </li>
    );
  }
});