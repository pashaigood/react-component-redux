import React from 'react';

const Style = {
  height: 200,
  overflow: 'hidden',
  overflowY: 'scroll'
};

export default class List extends React.Component {
  static propTypes = {
    todos: React.PropTypes.object.isRequired,
    toggleDone: React.PropTypes.func.isRequired
  };

  render() {
    const {todos, toggleDone} = this.props;
    return (
      <ol style={Style}>
        {
          todos.map(todo =>
            <li
              key={todo.get('id')}
              style={{textDecoration: todo.get('done') ? 'line-through' : void 0, cursor: 'pointer'}}
              onClick={() => toggleDone(todo.get('id'))}
            ><big>{todo.get('name')}</big></li>
          )
        }
      </ol>
    );
  }
}
