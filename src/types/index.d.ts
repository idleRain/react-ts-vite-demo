export interface Todo {
  id: number | string
  name: string
  done: boolean
}

type type = 'check' | 'delete'
export type ChangeTodoState = (id: string | number, type: type) => void
