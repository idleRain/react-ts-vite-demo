import { KeyboardEvent, ChangeEvent, useEffect, useState } from 'react'
import './App.css'

interface todo {
  id: number | string
  name: string
  done: boolean
}
export default function App() {
  const [todos, setTodos] = useState<todo[]>(JSON.parse(localStorage.getItem('todos') ?? '[]'))
  const [text, setText] = useState<string>('')

  const addTodo = (): void => {
    if (!text.trim()) return
    const newTodo = {
      id: Date.now(),
      name: text.trim(),
      done: false
    }
    setTodos([newTodo, ...todos])
    setText('')
  }

  const changeTodoState = (id: number | string, type: string) => {
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

  const handleInputKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Enter') addTodo()
  }

  const lis = todos.map(item => (
    <li key={item.id} className={item.done ? 'ok' : 'no'}>
      <label className="label">
        <input type="checkbox" checked={item.done} onChange={() => changeTodoState(item.id, 'check')}/>
        <span className="todo-name">{ item.name }</span>
      </label>
      <button className="delete-button" onClick={() => changeTodoState(item.id, 'delete')}>Delete</button>
    </li>
  ))

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="form">
        <label>Add Todo:</label>
        <input
          type="text"
          placeholder="Enter your todo"
          value={text}
          onInput={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          onKeyUp={handleInputKeyUp}
        />
        <button type="submit" onClick={addTodo}>Add</button>
      </div>
      <ul>{ lis }</ul>
    </div>
  )
}
