import { useState } from 'react'
import type { ChangeEvent, KeyboardEvent } from 'react'

interface props {
  addTodo: (value: string) => void
}
export default function From({addTodo}: props) {
  const [text, setText] = useState<string>('')
  const handleInputKeyUp = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return
    addTodo(text)
    setText('')
  }

  return (
    <div className="form">
      <label>Add Todo:</label>
      <input
        type="text"
        placeholder="Enter your todo"
        value={text}
        onInput={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        onKeyUp={handleInputKeyUp}
      />
      <button type="submit" onClick={() => addTodo(text)}>Add</button>
    </div>
  )
}
