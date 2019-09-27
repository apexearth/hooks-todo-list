import React, {Component, useState} from 'react';
import './TodoApp.scss';

export default class TodoApp extends Component {
  state = {
    todos: [
      {name: 'Wash Dishes', complete: false},
      {name: 'Make the Bed', complete: true},
      {name: 'Count things!', complete: false},
    ],
  };

  onAdd = (name) => {
    if (!name) {
      return
    }
    this.setState((state) => ({
      todos: [...state.todos, {name, complete: false}]
    }));
  };

  toggleComplete = (todo) => {
    todo.complete = !todo.complete;
    this.setState((state) => ({
      todos: [...state.todos]
    }));
  };

  render() {
    return <div className={'todo-app'}>
      <div>
        <TodoForm onAdd={this.onAdd}/>
        <TodoList todos={this.state.todos} toggleComplete={this.toggleComplete}/>
      </div>
    </div>;
  }

}

const TodoForm = ({onAdd}) => {
  const [text, setText] = useState('');
  return <div className={'todo-form'}>
    <span>Add item:</span>
    <div>
      <input type="text" value={text} onChange={e => setText(e.target.value)}/>
      <button onClick={() => {
        onAdd(text);
        setText('');
      }}>
        Add
      </button>
    </div>
  </div>;
};

const TodoList = ({todos, toggleComplete}) => (
  <div className={'todo-list'}>
    {todos.map(todo => <Todo todo={todo} toggleComplete={toggleComplete}/>)}
  </div>
);

const Todo = ({todo, toggleComplete}) => (
  <div className={'todo'}>
    <div className={todo.complete && 'todo-complete'}>{todo.name}</div>
    <button onClick={() => toggleComplete(todo)}>{todo.complete ? 'incomplete' : 'complete'}</button>
  </div>
);
