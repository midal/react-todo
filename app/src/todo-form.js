'use strict';
var React = require('react');

var TodoForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var text = this.refs.text.getDOMNode().value.trim();
        if (!text) {
          return;
        }
        this.refs.text.getDOMNode().value = '';
        this.props.onTodoSubmit({text: text});
    },
    render: function() {
        return (
          <form className="todoForm" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Add new todo" ref="text" />
            <input type="submit" value="Post" />
          </form>
        );
    }
});

module.exports = TodoForm;
