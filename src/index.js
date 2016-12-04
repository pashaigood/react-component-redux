import RCR from 'react-component-redux';
import React from 'react';
import ReactDOM from 'react-dom';

const Style = {
  fontFamily: 'sans-serif'
};

// @RCR.container
class TestComponent extends RCR.Container {
  state = {
    counter: 1,
    somthElse: 'Text'
  };

  actions = {
    doIncrement: () => {
      return {
        ...this.state,
        counter: this.state.counter + 1
      };
    },

    doDecrement: () => {
      return {
        ...this.state,
        counter: this.state.counter - 1
      };
    }
  };

  render() {
    return (
    <div style={Style}>
      <h1>Hello world {this.state.counter} times!</h1>
      <button onClick={() => this.actions.doIncrement()}>+</button>
      <button onClick={() => this.actions.doDecrement()}>-</button>
    </div>
    );
  }
}

ReactDOM.render(
  <TestComponent/>,
  document.getElementById('app')
);
