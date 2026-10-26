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
