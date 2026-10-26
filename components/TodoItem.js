export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <label style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
        {todo.text}
      </label>
      <button onClick={() => onDelete(todo.id)} aria-label={`${todo.text}を削除`}>
        削除
      </button>
    </li>
  )
}
