import React, { useState, useRef, useEffect } from "react";
import { TodoList } from "./components/TodoList";
import { v4 as uuid } from "uuid";

const KEY= "todoApp.todos";

export const App = () => {
  const [todos, setTodos] = useState([
      {id:1,task:"tarea 1", completed:false},
  ]);


  const todoTaskRef = useRef();

  useEffect(() => {
    const storedTodos=JSON.parse(localStorage.getItem(KEY));
    if(storedTodos){
       setTodos(storedTodos);
    }
},[]);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);


  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);

    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value;
    if (task === "") return;

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuid(), task, completed: false }];
    });
    todoTaskRef.current.value = "";
  };

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoTaskRef} type="text" placeholder="Nueva tarea" />
      <button onClick={handleTodoAdd}>➕</button>
      <button onClick={handleClearAll}>🗑</button>
      <div>
        <h3>
          Te quedan {todos.filter((todo) => !todo.completed).length} tareas por
          terminar
        </h3>
      </div>
    </>
  );
};
