import React, { Component } from 'react';
import Todos from './components/Todos';
import './App.css';

class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: 'Take dog for walk',
        completed: false
      },
      {
        id: 2,
        title: 'Dinner with racoons',
        completed: false
      },
      {
        id: 3,
        title: 'Meeting with dolphins',
        completed: false
      },
    ]
  }

  deleteTodo = (id) => {
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] })
  }

  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) })
  }

  render() {
    return (
      <div>
      <Todos deleteTodo={ this.deleteTodo } todos={ this.state.todos } markComplete={ this.markComplete }/>
      </div>
    );
  }
}
export default App;
