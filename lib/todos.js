export function countRemaining(todos) {
  return todos.filter((todo) => !todo.done).length
}

export function isValidTodoText(text) {
  const trimmed = text.trim()
  return trimmed.length > 0 && trimmed.length <= 50
}
export function countDone(todos) {
  return todos.filter((todo) => todo.done).length
}

export function createTodo(text) {
  return { id: crypto.randomUUID(), text, done: false }
}

export function addTodo(todos, text) {
  return [...todos, createTodo(text)]
}

export function toggleTodo(todos, id) {
  return todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
}

export function deleteTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id)
}
