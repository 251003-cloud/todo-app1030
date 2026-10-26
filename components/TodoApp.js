'use client'

import { useEffect, useState } from 'react'
import TodoFilter from './TodoFilter'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import { countRemaining } from '@/lib/todos'

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

  function addTodo(text) {
    const newTodo = { id: crypto.randomUUID(), text, done: false }
    setTodos([...todos, newTodo])
  }

  function toggleTodo(id) {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
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
      <TodoForm onAdd={addTodo} />
      <TodoFilter value={filter} onChange={setFilter} />
      <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
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
