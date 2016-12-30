import React from 'react';
import RCR from 'react-component-redux';

export default class Test extends RCR.Container {
  /**
   * Начальное состояние компонента.
   * @type {{counter: number, name: string}}
   */
  state = {
    counter: 1,
    name: 'friend'
  };

  /**
   * Список действий компонента.
   * @type {{updateName: ((name)), doIncrement: ((number)), doDecrement: ((number))}}
   */
  actions = {
    updateName(state, name) {
      return {
        ...state,
        name
      }
    },

    doIncrement (state, number) {
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
    const {actions, state} = this;

    return (
      <div>
        <h1>Hello {state.name} {state.counter} times!</h1>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            value={state.name}
            onChange={(event) => actions.updateName(event.target.value)}
          />
        </div>
        <button
          className="btn btn-default"
          onClick={() => actions.doIncrement(1)}>+</button>
        <button
          className="btn btn-default"
          onClick={() => actions.doDecrement(2)}>-</button>
      </div>
    );
  }
}
