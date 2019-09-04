import React, { Component } from 'react';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import uuid from 'uuid';
import './App.css';

class App extends Component {
  state = {
    todos: [
      {
        id: uuid.v4(),
        title: 'Take dog for walk',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Dinner with racoons',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Meeting with dolphins',
        completed: false
      },
    ]
  }

  deleteTodo = (id) => {
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] })
  }

  markComplete = (id) => {
    console.log('id', id);
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) })
  }

  addTodo = (title) => {
    const newTodo = {
      id: uuid.v4(),
      title: title,
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo]})
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <AddTodo addTodo={ this.addTodo }/>
          <Todos deleteTodo={ this.deleteTodo } todos={ this.state.todos } markComplete={ this.markComplete }/>
        </div>
      </div>
    );
  }
}
export default App;
