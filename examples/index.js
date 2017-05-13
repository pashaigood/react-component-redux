import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/Hello';
import TodoList from './components/TodoList';
import MultiInstance from './components/MultiInstance';
import PureComponent from './components/Pure/Component';
import PureFunction from './components/Pure/Function';
import PureFunction2 from './components/Pure/Function2';
import Classic from './components/Classic';
import './middlewares/speech';
import RCR from 'react-component-redux';
import {Provider} from 'react-redux';


RCR.store.subscribe((...params) => {
  console.log('store changed')
});

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
      <div className="col-xs-3">
        <PureComponent/>
      </div>
      <div className="col-xs-3">
        <PureFunction/>
      </div>
      <div className="col-xs-3">
        <PureFunction2/>
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12">
        <Provider store={RCR.store}>
          <Classic/>
        </Provider>
      </div>
    </div>
  </div>
  ,
  document.getElementById('app')
);
