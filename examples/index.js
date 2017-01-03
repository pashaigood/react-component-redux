import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Test from './containers/Hello';
import TodoList from './containers/TodoList';
import MultiInstance from './containers/MultiInstance';

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
    <div className="row">
      <div className="col-xs-4"><MultiInstance title="First instance with common state."/></div>
      <div className="col-xs-4">
        <MultiInstance name="other-instance" title="Second instance with own state."/>
      </div>
      <div className="col-xs-4"><MultiInstance title="Third instance with common state."/></div>
    </div>
  </div>
  ,
  document.getElementById('app')
);
