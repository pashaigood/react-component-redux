import React from 'react';
import RCR from 'react-component-redux';

// Apply the decorator.
@RCR.container
export default class Hello extends React.Component {

  /**
   * Write the initial state.
   */
  state = {
    counter: 1,
    name: 'friend'
  };

  /**
   * Describe the component's actions list.
   */
  actions = {
    updateName(state, name) {
      return {
        ...state,
        name
      };
    },

    doIncrement(state, number) {
      return {
        ...state,
        counter: state.counter + number
      };
    },

    doDecrement(state, number) {
      return {
        ...state,
        counter: state.counter - number
      };
    }
  };

  render() {
    return (
      <div>
        <h1>Hello {this.state.name} {this.state.counter} times!</h1>
        <div className="form-group">
          <input
            placeholder="Type your name..."
            className="form-control"
            type="text"
            value={this.state.name}
            onChange={e => this.actions.updateName(e.target.value)}
          />
        </div>
        <button
          className="btn btn-default"
          onClick={() => this.actions.doIncrement(1)}>+
        </button>
        <button
          className="btn btn-default"
          onClick={() => this.actions.doDecrement(2)}>-
        </button>
      </div>
    );
  }
}
