import { type NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const TrashIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
  )
}

const EditIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>
  )}

const SaveIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )}

const TodoInput = ({handleAddTodo}: {handleAddTodo: () => void}) => {
  return (
    <form className="w-full flex flex-row gap-4" onSubmit={handleAddTodo} >
    <label htmlFor="todoInput" className="sr-only">Todo input</label>
    <input id="todoInput" type="text" placeholder="What do you need to get done?" className="w-full p-4 text-lg font-semibold placeholder-color-subtext text-color-text bg-card-background rounded-lg shadow-md focus:outline-primary" />

    <input className="bg-card-background text-color-text shadow-md rounded px-6 text-lg font-semibold cursor-pointer hover:bg-primary hover:text-color-text" type="submit" value="Submit" />
  </form>
  );
}

const ListOfTodos = (
    {
      todos, 
      handleDeleteTodo, 
      handleTodoCheck, 
      editTodo, 
      todosToEdit, 
      handleEditingTodos, 
      title}
      : {
        todos: Todo[], 
        handleDeleteTodo: (id: number) => void, 
        handleTodoCheck: (id: number) => void, 
        editTodo?: (id: number) => void, 
        handleEditingTodos?: (id: number, e: string) => void, 
        todosToEdit?: Todo, 
        title?: string
      }
) => {
  const editTodoRef = useRef<HTMLInputElement>(null);

  const focusEditInput = () => {
    requestAnimationFrame(() => {
      if(editTodoRef.current !== null) editTodoRef.current.focus();
    }); 
  }

  return (
    <div className="container w-full">
      {title && (<h2 className="self-start text-2xl text-color-text font-bold mb-4 ">{title}</h2>)}
    <ul className=" flex flex-col">
    {todos.map((todo: Todo) => {
      return (
        <li key={todo.id}>
        {todosToEdit && handleEditingTodos && editTodo && todosToEdit?.id === todo.id ? (
          <div className="flex flex-row mb-4 group content-center">
          <div 
          className="flex items-center justify-between w-full p-4 text-lg font-semibold text-color-text bg-card-background rounded-l-lg  group-hover:bg-primary"
          >
              <div className="flex flex-row w-full" >
                <input
                  id={`todo ${todo.id}`} type="checkbox" className="appearance-none mt-2 mr-4 w-3 h-3 rounded-xl  checked:bg-color-text checked:ring-color-text ring-primary ring-2 cursor-pointer"
                  checked={todo.completed} 
                  readOnly
                />
                <label className="cursor-text sr-only" htmlFor={`todo ${todo.id}`} />
                <input
                  ref={editTodoRef}                  
                  className=" bg-card-background ring-1 ring-primary rounded w-full focus:outline-primary focus:ring-2 focus:ring-primary text-color-text"
                  type="text"
                  value={todo.text}
                  onChange={(e) => handleEditingTodos(todo.id, e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { editTodo(todo.id) }}}
                />
              </div>
          </div>
          {!todo.completed && (
            <div className="w-8 hover:text-color-subtext cursor-pointer text-2xl font-bold flex h-[60px] bg-card-background text-color-text" onClick={() => editTodo(todo.id)}>
              <p className="h-fit my-auto"><SaveIcon/></p>                 
            </div>
          )}
          <div className="rounded-r-lg w-8 group-hover:bg-primary hover:text-color-subtext cursor-pointer text-2xl font-bold flex h-[60px] bg-card-background text-color-text" onClick={() => handleDeleteTodo(todo.id)}>
            <p className="h-fit my-auto"><TrashIcon/></p>                 
          </div>
        </div>
        ) : ( 
          <div key={todo.id} className="flex flex-row mb-4 group content-center">
          <div 
          className="flex items-center justify-between w-full p-4 text-lg font-semibold text-color-text bg-card-background rounded-l-lg cursor-pointer group-hover:bg-primary"
          onClick={() => handleTodoCheck(todo.id)}
          >
              <div className="flex flex-row" >
                <input
                  id={`todo ${todo.id}`} type="checkbox" className="appearance-none mt-2 mr-4 w-3 h-3 rounded-xl  checked:bg-color-text checked:ring-color-text ring-primary ring-2 cursor-pointer"
                  checked={todo.completed} 
                  readOnly
                />
                <label className="cursor-text" htmlFor={`todo ${todo.id}`}>{todo.text}</label>
              </div>
          </div>
          {!todo.completed && editTodo && (
            <div 
              className="w-8 group-hover:bg-primary hover:text-color-subtext cursor-pointer text-2xl font-bold flex h-[60px] bg-card-background text-color-text" 
              onClick={() => {
                editTodo(todo.id)
                focusEditInput()
              }}>
              <p className="h-fit my-auto"><EditIcon/></p>                 
            </div>
          )}
          <div className="rounded-r-lg w-8 group-hover:bg-primary hover:text-color-subtext cursor-pointer text-2xl font-bold flex h-[60px] bg-card-background text-color-text" onClick={() => handleDeleteTodo(todo.id)}>
            <p className="h-fit my-auto"><TrashIcon/></p>                 
          </div>
        </div>
          )
        }
        </li>
      );
    })
    }
    </ul>
  </div>
  )
}

const ListActionButton = ({onClick, title}: {onClick: () => void, title: string}) => {
  return (
    <button className=" bg-card-background text-lg font-semibold p-4 rounded-full self-start hover:bg-primary text-color-text" onClick={onClick} >{title}</button>
  );
}

const Home: NextPage = () => {
  //const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const [todos, setTodos] = useState<Todo[]>([{ id: 1, text: "todo 1", completed: false }, { id: 2, text: "todo 2", completed: false}]);
  const uncompletedTodos = todos.filter((todo) => todo.completed === false);
  const completedTodos = todos.filter((todo) => todo.completed === true);

  const [todosToEdit, setTodoToEdit] = useState<Todo | undefined>(undefined);

  const handleAddTodo = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();  
    const newTodo = {
      id: todos.length + 1,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      text: e.target.elements.todoInput.value,
      completed: false
    }
    setTodos([...todos, newTodo]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    e.target.reset();
  }

  const handleDeleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  const handleTodoCheck = (id: number) => {
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

  const handleEditingTodos = (id: number, text: string) => {
    const todoToEdit = todos.find((todo) => todo.id === id) as Todo
    const remainingTodos = todos.filter((todo) => todo.id !== id);
    todoToEdit.text = text;
    setTodos([...remainingTodos, todoToEdit].sort((a, b) => a.id - b.id));
  }

  const editTodo = (id: number) => {
    if (todosToEdit && todosToEdit?.id !== id) return

    if (!todosToEdit) {
      setTodoToEdit(todos.find((todo) => todo.id === id));
    } else {
      setTodoToEdit(undefined);
    }
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
          <TodoInput handleAddTodo={handleAddTodo as () => void} />
          <div className="flex flex-row gap-2 flex-start w-full">
            <ListActionButton onClick={handleCompleteAllTodos} title="Complete All" />
            <ListActionButton onClick={clearAllCompletedTodos} title="Clear Completed" />
          </div>
          
          {uncompletedTodos.length > 0 && <ListOfTodos 
            todos={uncompletedTodos} 
            handleDeleteTodo={handleDeleteTodo} 
            handleTodoCheck={handleTodoCheck}
            editTodo={editTodo}
            todosToEdit={todosToEdit}
            handleEditingTodos={handleEditingTodos}
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
