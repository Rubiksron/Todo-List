import React, { Component } from 'react';

export class TodoItem extends Component {

  getStyle = () => {
    return{
      background: '#f4f4f4',
      padding: '.5em',
      borderBottom: '1px #cc solid',
      textDecoration: this.props.todo.completed ?
      'line-through' : 'none'
    }
  }

  render() {
    const { id, title } = this.props.todo;
    return(
      <div style={ this.getStyle()}>
        <p>
        <input type="checkbox" onChange={ this.props.markComplete.bind(this, id) } />{' '}
        { title }
        <button onClick={ this.props.deleteTodo.bind(this, id)} style={ btnStyle }>delete</button>
        </p>
      </div>
    )
  }
}

const btnStyle = {
  background: '#ff0000',
  color: '#fff',
  border: 'none',
  padding: '.5em .75em',
  borderRadius: '1em',
  cursor: 'pointer',
  float: 'right'
}

export default TodoItem;
