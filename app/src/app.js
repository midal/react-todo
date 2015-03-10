'use strict';
var React = require('react');
var TodoList = require('./components/TodoList.react');

React.render(
  <TodoList />,
  document.getElementById('container')
);
