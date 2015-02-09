'use strict';

var TodoItem = React.createClass({
  handleClick: function(event) {
      this.props.onTodoClick(this.props.data);
  },
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'todo-item ': true,
      'done': this.props.data.done
    });

    return (
      <li className={classes} onClick={this.handleClick}>{this.props.children}</li>
    );
  }
});