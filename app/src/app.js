'use strict';
var React = require('react');
var TodoList = require('./components/TodoList.react');

React.render(
  <TodoList url="http://localhost:8091/api/todos" />,
  document.getElementById('container')
);
