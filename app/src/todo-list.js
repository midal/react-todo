'use strict';

var TodoList = React.createClass({

    handleTodoSubmit: function(todo) {
        var data = this.state.data;
        data.push({
            text: todo.text,
            done: false,
            id: data.length
        });
        this.setState({data: data});
    },
    getInitialState: function() {
        return {data: []};
    },
    render: function() {
        return (
            <div className="todo-list">
                <TodoForm onTodoSubmit={this.handleTodoSubmit} />
                <TodoItemList data={this.state.data} />
            </div>
        );
    }
});
