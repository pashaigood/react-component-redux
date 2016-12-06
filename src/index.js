import RCR from 'react-component-redux';
import React from 'react';
import ReactDOM from 'react-dom';

class TestComponent extends RCR.Container {
  /**
   * Начальное состояние компонента.
   * @type {{counter: number, name: string}}
   */
  state = {
    counter: 1,
    name: 'World'
  };

  /**
   * Список действий компонента.
   * @type {{updateName: ((name)), doIncrement: ((number)), doDecrement: ((number))}}
   */
  actions = {
    updateName(name) {
      return {
        ...this.state,
        name
      }
    },

    doIncrement (number) {
      return {
        ...this.state,
        counter: this.state.counter + number
      };
    },

    doDecrement(number) {
      return {
        ...this.state,
        counter: this.state.counter - number
      };
    }
  };

  render() {
    const {actions, state} = this;

    return (
    <div>
      <h1>Hello {state.name} {state.counter} times!</h1>
      <div>
        <input
          type="text"
          value={state.name}
          onChange={(event) => actions.updateName(event.target.value)}
        />
      </div>
      <button onClick={() => actions.doIncrement(1)}>+</button>
      <button onClick={() => actions.doDecrement(2)}>-</button>
    </div>
    );
  }
}

ReactDOM.render(
  <TestComponent/>,
  document.getElementById('app')
);
