import React, { Component } from 'react';
import TodoItem from './TodoItem.js';

class Todos extends Component {

  render() {
    console.log('this.props.todos: ', this.props.todos);
    return this.props.todos.map((todo) => (
      <TodoItem
      key={ todo.id }
      todo={ todo }
      markComplete={ this.props.markComplete }
      deleteTodo={ this.props.deleteTodo }
      />
    ));
  }
}

export default Todos;
