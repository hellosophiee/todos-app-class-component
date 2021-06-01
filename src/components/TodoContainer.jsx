import React from "react";
import Header from "./Header";
import InputTodo from "./InputTodo";
import TodosList from "./TodosList";

import { v4 as uuidv4 } from "uuid";

export default class TodoContainer extends React.Component {
  state = {
    // todos: [
    //   {
    //     id: uuidv4(),
    //     title: "Setup development environment",
    //     completed: true
    //   },
    //   {
    //     id: uuidv4(),
    //     title: "Develop website and add content",
    //     completed: false
    //   },
    //   {
    //     id: uuidv4(),
    //     title: "Deploy to live server",
    //     completed: false
    //   }
    // ]
    todos: []
  };

  handleChange = (id) => {
    // console.log("clicked", id);
    this.setState((prevState) => {
      return {
        todos: prevState.todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              completed: !todo.completed
            };
          }
          return todo;
        })
      };
    });
  };

  delTodo = (id) => {
    // console.log("deleted", id);
    this.setState({
      todos: [
        ...this.state.todos.filter((todo) => {
          return todo.id !== id;
        })
      ]
    });
  };

  addTodoItem = (title) => {
    // console.log(title);
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false
    };
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  };

  setUpdate = (updatedTitle, id) => {
    // console.log(updatedTitle, id);
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      })
    });
  };

  // componentDidMount() {
  //   fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
  //     .then((res) => res.json())
  //     // .then((data) => console.log(data));
  //     .then((data) => this.setState({ todos: data }));
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      const temp = JSON.stringify(this.state.todos);
      localStorage.setItem("todos", temp);
    }
  }

  componentDidMount() {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);
    if (loadedTodos) {
      this.setState({
        todos: loadedTodos
      });
    }
  }

  render() {
    return (
      // <ul>
      //   {this.state.todos.map((todo) => (
      //     <li>{todo.title}</li>
      //   ))}
      // </ul>
      <div className="container">
        <div className="inner">
          <Header />
          <InputTodo addTodoProps={this.addTodoItem} />
          <TodosList
            todos={this.state.todos}
            handleChangeProps={this.handleChange}
            deleteTodoProps={this.delTodo}
            setUpdate={this.setUpdate}
          />
        </div>
      </div>
    );
  }
}
