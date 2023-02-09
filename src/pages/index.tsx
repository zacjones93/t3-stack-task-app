import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { api } from "../utils/api";

let TodoInput = ({handleAddTodo}: {handleAddTodo: any}) => {
  return (
    <form className="w-full flex flex-row gap-4" onSubmit={handleAddTodo} >
    <label htmlFor="todoInput" className="sr-only">Todo input</label>
    <input id="todoInput" type="text" placeholder="What do you need to get done?" className="w-full p-4 text-lg font-semibold placeholder-color-subtext text-color-text bg-card-background rounded-lg shadow-md focus:outline-primary" />

    <input className="bg-card-background text-color-text shadow-md rounded px-6 text-lg font-semibold cursor-pointer hover:bg-primary hover:text-color-text" type="submit" value="Submit" />
  </form>
  );
}

let ListOfTodos = ({todos, handleDeleteTodo, handleTodoCheck, title}: {todos: any, handleDeleteTodo: any, handleTodoCheck: any, title?: string}) => {
  return (
    <div className="container w-full">
      {title && (<h2 className="self-start text-2xl text-color-text font-bold mb-4 ">{title}</h2>)}
    <ul className=" flex flex-col">
    {todos.map((todo: any) => {
      return (
        <li className="flex flex-row mb-4 group content-center">
          <div 
          key={todo.id}
          className="flex items-center justify-between w-full p-4 text-lg font-semibold text-color-text bg-card-background rounded-l-lg cursor-pointer group-hover:bg-primary"
          onClick={() => handleTodoCheck(todo.id)}
          >
              <div className="flex flex-row" >
                <input
                  id={`todo ${todo.id}`} type="checkbox" className="appearance-none mt-1 mr-4 w-4 h-4 rounded-xl  checked:bg-primary ring-primary ring-2 cursor-pointer"
                  checked={todo.completed} 
                  readOnly
                />
                <label className="cursor-pointer" htmlFor={`todo ${todo.id}`}>{todo.text}</label>
              </div>
          </div>
          <div className="rounded-r-lg w-8 group-hover:bg-primary hover:text-color-subtext cursor-pointer text-2xl font-bold flex h-[60px] bg-card-background text-color-text" onClick={() => handleDeleteTodo(todo.id)}>
            <p className="h-fit my-auto">x</p>                 
          </div>
          
        </li>
      );
    })
    }
    </ul>
  </div>
  )
}

let ListActionButton = ({onClick, title}: {onClick: any, title: string}) => {
  return (
    <button className=" bg-card-background text-lg font-semibold p-4 rounded-full self-start hover:bg-primary text-color-text" onClick={onClick} >{title}</button>
  );
}

const Home: NextPage = () => {
  //const hello = api.example.hello.useQuery({ text: "from tRPC" });

  let [todos, setTodos] = useState([{ id: 1, text: "todo 1", completed: false }, { id: 2, text: "todo 2", completed: false}]);
  let uncompletedTodos = todos.filter((todo) => todo.completed === false);
  let completedTodos = todos.filter((todo) => todo.completed === true);

  const handleAddTodo = (e: any) => {
    e.preventDefault();
    const newTodo = {
      id: todos.length + 1,
      text: e.target.elements.todoInput.value,
      completed: false
    }
    setTodos([...todos, newTodo]);
    e.target.reset();
  }

  const handleDeleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  const handleTodoCheck = (id: number) => {
    console.log(id)
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodos);
  }

  const handleCompleteAllTodos = () => {
    const newTodos = todos.map((todo) => {
      todo.completed = true;
      return todo;
    });
    setTodos(newTodos);
  }

  const clearAllCompletedTodos = () => {
    const newTodos = todos.filter((todo) => todo.completed === false);
    setTodos(newTodos);
  }
  

  return (
    <>
      <Head>
        <title>Task Tracker</title>
        <meta name="description" content="task tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-background">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 max-w-screen-md mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tight text-color-text sm:text-[5rem]">
            Task Tracker
          </h1>
          <TodoInput handleAddTodo={handleAddTodo} />
          <div className="flex flex-row gap-2 flex-start w-full">
            <ListActionButton onClick={handleCompleteAllTodos} title="Complete All" />
            <ListActionButton onClick={clearAllCompletedTodos} title="Clear Completed" />
          </div>
          
          {uncompletedTodos.length > 0 && <ListOfTodos 
            todos={uncompletedTodos} 
            handleDeleteTodo={handleDeleteTodo} 
            handleTodoCheck={handleTodoCheck} 
            title="Uncompleted Tasks"
          />}
          
          {completedTodos.length > 0 && <ListOfTodos 
            todos={completedTodos} 
            handleDeleteTodo={handleDeleteTodo} 
            handleTodoCheck={handleTodoCheck} 
            title="Completed Tasks"
          />}
        </div>
      </main>
    </>
  );
};

export default Home;
