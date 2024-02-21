import React, { createContext, useContext } from "react"

export const ToDoContext = createContext({
    todos: [{
        id: 1,
        todo: "Todo Msg",
        completed: false,
    }],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {},
});

export const TodoProvider = ToDoContext.Provider

export const useTodo = () => {
    return useContext(ToDoContext);
}