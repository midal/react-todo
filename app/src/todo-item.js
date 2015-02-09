'use strict';

var TodoItem = React.createClass({
  handleClick: function(event) {
      this.props.onTodoClick(this.props.id);
  },
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'todo-item ': true,
      'done': this.props.done
    });

    return (
      <li className={classes} onClick={this.handleClick}>{this.props.children}</li>
    );
  }
});