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
   *
   * @type {{updateName: ((state, name)), doIncrement: ((state, number)), doDecrement: ((state, number))}}
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

  render = () => (
    <div>
      <h1>Hello {this.state.name} {this.state.counter} times!</h1>
      <div className="form-group">
        <input
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
  )
}
