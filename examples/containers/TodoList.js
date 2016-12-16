import React from 'react';
import RCR from 'react-component-redux';
import Immutable from 'immutable';
import List from '../components/todoList/List';

let todoId = 0;

export default class TodoList extends RCR.Container {

  /**
   * @type {Immutable.Map}
   */
  state = Immutable.fromJS({
    name: '',
    todos: []
  });

  actions = {
    updateName: (name) => {
      return this.state.set('name', name);
    },

    addItem: () => {
      return this.state
        .update('todos', todos => todos.push(Immutable.Map({
          id: todoId++,
          done: false,
          name: this.state.get('name')
        })))
        .set('name', '');
    },

    toggleTodo: (id) => {

      return this.state.update('todos', todos => todos.update(
        todos.findIndex(todo => todo.get('id') === id),
        todo => todo.set('done', !todo.get('done'))
      ));
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.actions.addItem();
  }

  render() {
    const {state, actions} = this;

    return (
      <div>
        <h1>Todo app</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <input
              value={state.get('name')}
              type="text"
              onChange={({target}) => actions.updateName(target.value)}
              className="form-control"
              placeholder="What todo?"
            />
          </div>
          <button
            className="btn btn-default"
            type="submit"
          >Submit</button>
        </form>
        <br/>
        <List
          todos={state.get('todos')}
          toggleDone={actions.toggleTodo}
        />
      </div>
    );
  }
}


