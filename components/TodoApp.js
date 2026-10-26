'use client'

import { useEffect, useState } from 'react'
import TodoFilter from './TodoFilter'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import { addTodo, countRemaining, deleteTodo, toggleTodo } from '@/lib/todos'

const STORAGE_KEY = 'todos'

function loadTodos() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export default function TodoApp() {
  const [todos, setTodos] = useState(loadTodos)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAdd(text) {
    setTodos(addTodo(todos, text))
  }

  function handleToggle(id) {
    setTodos(toggleTodo(todos, id))
  }

  function handleDelete(id) {
    setTodos(deleteTodo(todos, id))
  }

  function clearDone() {
    if (!window.confirm('完了済みの TODO を削除しますか？')) return
    setTodos(todos.filter((todo) => !todo.done))
  }
function clearAll() {
  if (!window.confirm('すべての TODO を削除しますか？')) return
  setTodos([])
}

  const doneCount = todos.filter((todo) => todo.done).length
  const remaining = countRemaining(todos)

  const visibleTodos =
    filter === 'active' ? todos.filter((todo) => !todo.done) : filter === 'done' ? todos.filter((todo) => todo.done) : todos

  return (
    <div>
      <TodoForm onAdd={handleAdd} />
      <TodoFilter value={filter} onChange={setFilter} />
      <TodoList todos={visibleTodos} onToggle={handleToggle} onDelete={handleDelete} />
      {todos.length > 0 && (
        <p>
          全 {todos.length} 件 / 完了 {doneCount} 件 / 残り {remaining} 件
        </p>
      )}
      <button onClick={clearDone} disabled={doneCount === 0}>
        完了済みを削除
      </button>
      <button onClick={clearAll} disabled={todos.length === 0}>
  すべて削除
</button>

    </div>
  )
}
