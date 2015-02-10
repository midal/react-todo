'use strict';

var TodoItem = React.createClass({
  componentDidMount: function() {
    var that = this;
    $(this.refs.MyTodoItem.getDOMNode()).swipe( {
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            switch (direction) {
              case "right":
                that.props.onTodoDone(that.props.data);
                break;
              case "left":
                that.props.onTodoDelete(that.props.data);
                break;
            }
        }
    });
  },
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'todo-item ': true,
      'done': this.props.data.done
    });

    return (
      <li className={classes} ref="MyTodoItem">{this.props.children}</li>
    );
  }
});