'use strict';

var TodoList = React.createClass({

    handleTodoSubmit: function(todo) {
        var newTodo = {
            text: todo.text,
            done: false,
            id: -1
        };
        var todos = this.state.data;
        var newTodos = todos.concat([newTodo]);
        this.setState({data: newTodos});

        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: todo,
            success: function(data) {
                this.setState({data: data});
                this.loadTodosFromServer();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleTodoClick: function(key) {
        var data = this.state.data;
        data[key].done = !data[key].done;
        this.setState({data: data});
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadTodosFromServer();
    },
    loadTodosFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="todo-list">
                <TodoForm onTodoSubmit={this.handleTodoSubmit} />
                <TodoItemList data={this.state.data} onTodoClick={this.handleTodoClick} />
            </div>
        );
    }
});
