import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
import Todos from './components/Todos';
import uuid from 'uuid'
// import axios from 'axios';

import './App.css';

class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: 'Make List'
      }
    ]
  }

  componentDidMount() {
    console.log('componentDidMount-start-grabbing local storage...');
    var parsedStateObject = JSON.parse(localStorage.getItem('stateObj'));
    if(this.state.todos) {
      this.setState({ todos:this.state.todos })
    } else {
        this.setState({ todos:parsedStateObject })
    }
    console.log('componentDidMount-end-parsedStateObject: ', parsedStateObject);
  }

  deleteTodo = (id) => {
      this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] })
      //now store state in localStorage to update!!!!!!!!
    }

    markComplete = (id) => {
      this.setState({ todos: this.state.todos.map(todo => {
        if(todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    })
  }

  addTodo = (title) => {
    console.log('this.state', this.state);
    let id = uuid();
    let newTodo = {
      id: id,
      title: title,
      completed: false
    }

    this.setState({ todos: [...this.state.todos, newTodo]})
    console.log('this.state.todos in addTodo(): ' ,this.state.todos);
    let stateObj = this.state.todos;
    localStorage.setItem('stateObj', JSON.stringify(stateObj));
    console.log('stateObj in addTodo(): ', stateObj);
  }

  render() {
    console.log('this.state in render():  ', this.state);
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
