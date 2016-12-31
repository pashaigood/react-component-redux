import React from 'react';
import RCR from 'react-component-redux';

@RCR.container
export default class Test extends React.Component {
  /**
   * Начальное состояние компонента.
   * @type {{counter: number, name: string}}
   */
  state = {
    counter: 1,
    name: 'friend',
    print: undefined
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

  /**
   * Действие компонента, нозначенное как метод первого уровня.
   *
   * @param state
   * @returns {*}
   */
  @RCR.action
  printState(state) {
    state = {
      ...state,
    };
    delete state.print;
    state.print = JSON.stringify(state, null, 2);
    return state;
  }

  render() {
    const {actions, state} = this;

    return (
      <div>
        <h1>Hello {state.name} {state.counter} time!s!</h1>
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
        <button
          className="btn btn-default"
          onClick={() => this.printState()}
        >Print state</button>
        <br/>
        <br/>
        <pre>{state.print || 'Click on the print button to see current state.'}</pre>
      </div>
    );
  }
}
