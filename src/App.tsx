import { useEffect, useState } from 'react'
import './App.css'
import Li from './components/Li'
import From from './components/Form'
import type { ChangeTodoState, Todo } from './types'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem('todos') ?? '[]'))
  const addTodo = (name: string): void => {
    if (!name.trim()) return
    const newTodo = {
      id: Date.now(),
      name: name.trim(),
      done: false
    }
    setTodos([newTodo, ...todos])
  }

  const changeTodoState: ChangeTodoState = (id, type) => {
    const newTodos = [...todos]
    const index = newTodos.findIndex(i => i.id === id)
    switch (type) {
      case 'check':
        newTodos[index].done = !newTodos[index].done
        break
      case 'delete':
        newTodos.splice(index, 1)
        break
    }
    setTodos(newTodos)
  }

  const lis = todos.map(item => (
    <Li key={item.id} item={item} changeTodoState={changeTodoState}/>
  ))

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className="container">
      <h1>Todo List</h1>
      <From addTodo={addTodo}/>
      <ul>{ lis }</ul>
    </div>
  )
}
