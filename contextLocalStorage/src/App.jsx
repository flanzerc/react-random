
import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider, useTodo } from './contexts/ToDoContext'
import TodoForm from './components/TodoForm'
import { TodoItem } from './components'

function App() {

  const [todos, setTodos] = useState([])
  
  const addTodo = (todo) => {
    setTodos((prevtodos) => ([{id: Date.now(), ...todo}, ...prevtodos]))
  }

  const updateTodo = (id, todo) => {
    setTodos((prevtodos) => {
      return prevtodos.map((eachtodo) => (eachtodo.id === id ? todo : eachtodo))
    })
  }

  const deleteTodo = (id) => {
    setTodos((prevtodo) => (prevtodo.filter((eachtodo) => eachtodo.id !== id)))
  }

  const toggleComplete = (id) => {
    setTodos((prevtodos) => prevtodos.map(
      (eachtodo) => eachtodo.id === id ? {...eachtodo, completed: !eachtodo.completed} : eachtodo)
    )
  }

  // use localstorage to store the data
  useEffect(() => {
    const todos =  JSON.parse(localStorage.getItem("todos"))
    // console.log('get local storage', todos);
    if(todos && todos.length > 0) {
      setTodos(todos);
    }
  }, [])

  useEffect(() => {
    console.log('useEffect add local')
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  

  return (
    <>
      <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
        <div className="bg-[#172842] min-h-screen py-8">
            <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                <div className="mb-4">
                    <TodoForm />
                </div>
                <div className="flex flex-wrap gap-y-3">
                    {/*Loop and Add TodoItem here */}
                    {todos.map((todo) => (
                      <div key={todo.id} className='w-full'>
                        <TodoItem todo={todo} />
                      </div>
                    ))}
                </div>
            </div>
        </div>  
      </TodoProvider>
    </>
  )
}

export default App
