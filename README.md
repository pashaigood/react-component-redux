**Redux** отличная библиотека, вот только слишком низкоуровневая для повседневного использования.

Идея в том, что бы упростить использование и сделать процесс создания компонентов как можно быстрее.

Пример:
```javascript
import React from 'react';
import RCR from 'react-component-redux';
import view from './view';

@RCR.container
export default class Test extends React.Component {
  /**
   * Отображение компонента,
   * используется, если не назначен метод render.
   *
   * @type {Function}
   */
  view = view;

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
   * Действие компонента, назначенное как метод первого уровня.
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
```

И это весть код!

Мы абстрагировались от низкого уровня управления данными, к которому всегда можем вернутся и получили **умный** компонент.

Не нужно настраивать ни хранилища, не нужно писать ни _actions_, ни _actionsCreators_, ни _reducers_.
Да конечно, этот подход не универсален, но покрывает простое использование **Redux**.
В данном подходе есть противоречия с философией чистых функций, и это вопрос обсуждаем, можно ли заменить на _договоренность_ в угоду увеличения производительности.

## Подробнее
Вот так выглядит простой набор действий:

![actions](./images/actions.jpg)

Вот так будет выглядеть действие:

```json
{
  "type": "TestComponent/DO_DECREMENT",
  "meta": {
    "component": "TestComponent"
  },
  "payload": [
    2
  ]
}
```

Самым интересным тут будет _payload_, который по сути является списком параметром, передаваемых функции _actions.doDecrement_.
