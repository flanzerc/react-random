import React, { useState } from "react";
import { useTodo } from "../contexts/ToDoContext";

function TodoForm() {
    const [todo, setTodo] = useState('');

    const {addTodo} = useTodo()
    
    const submitTodo = (e) => {
        e.preventDefault()
        if(!todo) return
        addTodo({todo: todo, completed: false})
        setTodo('')
    }

    return (
        <form  className="flex">
            <input
                type="text"
                value={todo}
                placeholder="Write Todo..."
                onChange={(e) => setTodo(e.target.value)}
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
            />
            <button type="submit" 
                onClick={submitTodo}
                className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;