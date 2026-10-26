import TodoItem from './TodoItem'

export default function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p>やることはありません</p>
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}
