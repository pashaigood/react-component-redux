import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './containers/Hello';
import TodoList from './containers/TodoList';
import MultiInstance from './containers/MultiInstance';
import PureComponent from './containers/Pure/Component';
import PureFunction from './containers/Pure/Function';
import './middlewares/speech';

ReactDOM.render(
  <div className="container">
    <div className="row">
      <div className="col-xs-6">
        <Hello />
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
    <div className="row">
      <div className="col-xs-4">
        <PureComponent/>
      </div>
      <div className="col-xs-4">
        <PureFunction/>
      </div>
    </div>
  </div>
  ,
  document.getElementById('app')
);
