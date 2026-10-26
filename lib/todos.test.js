import { addTodo, clearDone, countDone, countRemaining, deleteTodo, filterTodos, isValidTodoText, toggleTodo } from './todos'

const sample = [
  { id: 'a', text: '牛乳を買う', done: false },
  { id: 'b', text: 'レポート提出', done: true },
]

describe('addTodo', () => {
  test('末尾に未完了の TODO が1件増える', () => {
    const result = addTodo(sample, '部屋の掃除')
    expect(result).toHaveLength(3)
    expect(result[2]).toEqual({ id: expect.any(String), text: '部屋の掃除', done: false })
  })

  test('元の配列は書き換えない', () => {
    const result = addTodo(sample, '部屋の掃除')
    expect(result).not.toBe(sample)
    expect(sample).toHaveLength(2)
  })
})

describe('toggleTodo', () => {
  test('指定した id の done だけが反転する', () => {
    const result = toggleTodo(sample, 'a')
    expect(result[0].done).toBe(true)
    expect(result[1].done).toBe(true)
  })

  test('元の TODO オブジェクトは書き換えない', () => {
    toggleTodo(sample, 'a')
    expect(sample[0].done).toBe(false)
  })

  test('変更していない TODO は同じオブジェクトのまま', () => {
    const result = toggleTodo(sample, 'a')
    expect(result[1]).toBe(sample[1])
  })
})

describe('deleteTodo', () => {
  test('指定した id の TODO だけが消える', () => {
    const result = deleteTodo(sample, 'a')
    expect(result).toEqual([{ id: 'b', text: 'レポート提出', done: true }])
  })

  test('存在しない id なら何も消えない', () => {
    const result = deleteTodo(sample, 'zzz')
    expect(result).toEqual(sample)
  })

  test('元の配列は書き換えない', () => {
    const result = deleteTodo(sample, 'a')
    expect(result).not.toBe(sample)
    expect(sample).toHaveLength(2)
  })
})

describe('countRemaining', () => {
  test('未完了の数を返す', () => {
    expect(countRemaining(sample)).toBe(1)
  })

  test('0件なら 0', () => {
    expect(countRemaining([])).toBe(0)
  })

  test('すべて完了なら 0', () => {
    const allDone = [
      { id: 'x', text: 'A', done: true },
      { id: 'y', text: 'B', done: true },
    ]
    expect(countRemaining(allDone)).toBe(0)
  })
})

describe('countDone', () => {
  test('完了済みの数を返す', () => {
    expect(countDone(sample)).toBe(1)
  })
})

describe('isValidTodoText', () => {
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
})

describe('filterTodos', () => {
  test.each([
    ['all', ['a', 'b']],
    ['active', ['a']],
    ['done', ['b']],
  ])('%s のとき id が %j の TODO が残る', (filter, expectedIds) => {
    const result = filterTodos(sample, filter)
    expect(result.map((todo) => todo.id)).toEqual(expectedIds)
  })
})

describe('clearDone', () => {
  test('完了済みが消え、未完了だけが残る', () => {
    expect(clearDone(sample)).toEqual([{ id: 'a', text: '牛乳を買う', done: false }])
  })

  test('完了済みがなければ中身は同じ', () => {
    const todos = [{ id: 'x', text: 'X', done: false }]
    expect(clearDone(todos)).toEqual(todos)
  })

  test('元の配列は書き換えない', () => {
    clearDone(sample)
    expect(sample).toHaveLength(2)
  })
})
