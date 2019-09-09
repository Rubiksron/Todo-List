import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
import Todos from './components/Todos';
import uuid from 'uuid'

import './App.css';

//Main App component
class App extends Component {
  state = {
    todos: [
      {
        title: 'Make List',
        id: 1
      }
    ]
  }

  //Grabbing todos from localStorage
  componentDidMount() {
    var parsedStateObject = JSON.parse(localStorage.getItem('stateObj'));
    parsedStateObject ? this.setState({ todos:parsedStateObject }) : this.setState({ todos:this.state.todos });
  }
  //Marking a checkbox complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    })
  })
}
//Deleting the completed todo from localStorage
deleteTodo = (id) => {
  let filtered = [...this.state.todos.filter(todo => todo.id !== id)]
  localStorage.setItem('stateObj', JSON.stringify(filtered));
  this.setState({ todos: filtered })
}
//Adding a todo to localStorage
addTodo = (title) => {
  let id = uuid();
  let newTodo = {
    id: id,
    title: title,
    completed: false
  }

  let addTodo = [...this.state.todos, newTodo]
  localStorage.setItem('stateObj', JSON.stringify(addTodo));
  this.setState({ todos: addTodo })
}

render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={ props => (
              <React.Fragment>
              <AddTodo addTodo={ this.addTodo }/>
              <Todos
              todos={ this.state.todos }
              markComplete={ this.markComplete }
              deleteTodo={ this.deleteTodo }
              />
              </React.Fragment>
            )}/>
            <Route path="/about" component={ About  } />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
