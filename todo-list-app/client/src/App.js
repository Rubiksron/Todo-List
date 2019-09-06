import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
import Todos from './components/Todos';
import axios from 'axios';

import './App.css';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    //grab todos from localStorage
    var parsedStateObject = JSON.parse(localStorage.getItem('stateObj'));
    console.log('parsedStateObject', parsedStateObject);
    // this.setState({ todos:[...this.state.todos, parsedStateObject] })
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(res => this.setState({ todos:res.data }));
  }

  deleteTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }))
      .catch(err => (err))
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
  //The below function will add to the state object, which is proved by the console.log in the last .then() showing 6 todos, not 5, after using the input to create another todo.
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title:title,
      completed: false
    })
    .then(res => this.setState({ todos: [...this.state.todos, res.data]}))
    // .then((res) => console.log('res.data: ', res.data))
    .then(() => {
      let stateObj = this.state.todos;
      console.log('this.state.todos: ', this.state.todos);
      localStorage.setItem('stateObj', JSON.stringify(stateObj));
    })
    .then(() => console.log('this.state: ', this.state))
    .then(() => {
      let parsedStateObject = JSON.parse(localStorage.getItem('stateObj'));
      console.log('parsedStateObject', parsedStateObject);
    })
    .catch(err => (err))
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
