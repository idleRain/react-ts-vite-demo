export interface todo {
  id: number | string
  name: string
  done: boolean
}

type type = 'check' | 'delete'
export type changeTodoState = (id: string | number, type: type) => void
