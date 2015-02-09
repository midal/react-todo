'use strict';

var TodoList = React.createClass({

    handleTodoSubmit: function(todo) {
        var data = this.state.data;
        var id = data.length;
        var newTodo = {
            text: todo.text,
            done: false,
            id: id
        };

        data.push(newTodo);
        console.log(newTodo);
        console.log(data.length);
        console.log(id);

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
