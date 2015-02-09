'use strict';

var data = [
  {text: "Item 1", done: false, id: 0},
  {text: "Item 2", done: false, id: 1}
];

React.render(
  <TodoList data={data} />,
  document.getElementById('container')
);
