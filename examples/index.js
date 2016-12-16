import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Test from './containers/Hello';
import TodoList from './containers/TodoList';

ReactDOM.render(
  <div className="container">
    <div className="row">
      <div className="col-xs-6">
        <Test />
      </div>
      <div className="col-xs-6">
        <TodoList />
      </div>
    </div>
  </div>
  ,
  document.getElementById('app')
);
