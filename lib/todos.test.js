import { countRemaining,countDone } from './todos'

test('未完了の TODO の数を返す', () => {
  const todos = [
    { id: '1', text: '牛乳を買う', done: false },
    { id: '2', text: 'レポート提出', done: true },
    { id: '3', text: '部屋の掃除', done: false },
  ]

  const result = countRemaining(todos)

  expect(result).toBe(2)
})

test('TODO が0件なら 0 を返す', () => {
  expect(countRemaining([])).toBe(0)
})

test('すべて完了なら 0 を返す', () => {
  const todos = [
    { id: '1', text: 'A', done: true },
    { id: '2', text: 'B', done: true },
  ]
  expect(countRemaining(todos)).toBe(0)
})

import { countRemaining, isValidTodoText } from './todos'

test('普通の文字列は OK', () => {
  expect(isValidTodoText('牛乳を買う')).toBe(true)
})
test('空文字は NG', () => {
  expect(isValidTodoText('')).toBe(false)
})
test('空白だけは NG', () => {
  expect(isValidTodoText('   ')).toBe(false)
})
test('50文字ちょうどは OK', () => {
  expect(isValidTodoText('あ'.repeat(50))).toBe(true)
})
test('51文字は NG', () => {
  expect(isValidTodoText('あ'.repeat(51))).toBe(false)
})

test('toBe と toEqual', () => {
  const a = { text: '牛乳', done: false }
  const b = { text: '牛乳', done: false }
  const c = a
  // expect(a).toBe(b)
  expect(a).toEqual(b)
  expect(a).toBe(c)
  expect([1, 2]).toEqual([1, 2])
  // expect([1, 2]).toBe([1, 2])
})

test('完了済みの件数', () => {  const todos = [
    { id: '1', text: '牛乳を買う', done: false },
    { id: '2', text: 'レポート提出', done: true },
    { id: '3', text: '部屋の掃除', done: false },
  ]

  const result = countDone(todos)

  expect(result).toBe(1)
})