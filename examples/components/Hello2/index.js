import React from 'react';
import RCR from 'react-component-redux';
import view from './view';
import render from './render';

@RCR.container
export default class Test extends React.Component {
  /**
   * Отображение компонента, чистая функция
   * используется, если не назначен метод render.
   *
   * @type {Function}
   */
  // view = view;

  /**
   * Рендер как отдельная функция.
   * @type {Function}
   */
  render = render;

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
}
