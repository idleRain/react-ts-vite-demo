import { todo, changeTodoState } from '../types'

interface props {
  item: todo,
  changeTodoState: changeTodoState
}

export default function Li({ item, changeTodoState }: props) {
  return (
    <li className={item.done ? 'ok' : 'no'}>
      <label className="label">
        <input type="checkbox" checked={item.done} onChange={() => changeTodoState(item.id, 'check')}/>
        <span className="todo-name">{ item.name }</span>
      </label>
      <button className="delete-button" onClick={() => changeTodoState(item.id, 'delete')}>Delete</button>
    </li>
  )
}
