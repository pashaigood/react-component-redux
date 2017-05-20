import RCR from 'react-component-redux';

// Inherit from the RCR component.
export default class Hello extends RCR.Component {

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

  // It's better to move this template to a external entity.
  // And don't have any render library relations.
  render() {
    const React = require('react');
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
