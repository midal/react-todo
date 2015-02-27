'use strict';
var React = require('react');
var TodoList = require('./todo-list');

React.render(
  <TodoList url="http://localhost:8091/api/todos" />,
  document.getElementById('container')
);
