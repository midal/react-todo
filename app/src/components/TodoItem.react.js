'use strict';
var React = require('react/addons');
var TodoActions = require('../actions/TodoActions');

var TodoItem = React.createClass({
    componentDidMount: function() {
        var that = this;
        $(this.refs.MyTodoItem.getDOMNode()).swipe( {
            swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                switch (direction) {
                    case "right":
                        TodoActions.toggleComplete(that.props.data);
                        break;
                    case "left":
                        TodoActions.destroy(that.props.data);
                        break;
                }
            },
            swipeStatus: function (event, phase, direction, distance) {
                if (phase === "move") {
                    var dir = direction==="right" ? '1' : '-1';
                    $(this).css({'transform': 'translateX(' + (distance < 200 ? distance : 200)*dir + 'px)'});
                }
                else {
                    $(this).css({'transform': 'translateX(0px)'});
                }
            }
        });
        $(this.refs.MyTodoItem.getDOMNode()).swipe("option", "threshold", 100);
    },
    render: function() {
        var cx = React.addons.classSet;
        var classes = cx({
            'todo-item ': true,
            'done': this.props.data.done
        });

        return (
            <li className={classes} ref="MyTodoItem">
                <div className="pre"></div>
                <div className="theItem">{this.props.children}</div>
                <div className="post">Delete</div>
            </li>
        );
    }
});

module.exports = TodoItem;
