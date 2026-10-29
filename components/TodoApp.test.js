import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { fetchSampleTodos } from '@/lib/api'
import TodoApp from './TodoApp'

jest.mock('@/lib/api')

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  jest.restoreAllMocks()
})

test('すべて削除：キャンセルしたら何も消えない', async () => {
  const user = userEvent.setup()
  localStorage.setItem('todos', JSON.stringify([{ id: '1', text: '牛乳を買う', done: false }]))
  jest.spyOn(window, 'confirm').mockReturnValue(false)
  render(<TodoApp />)

  await user.click(screen.getByRole('button', { name: 'すべて削除' }))

  expect(window.confirm).toHaveBeenCalledWith('すべての TODO を削除しますか？')
  expect(screen.getByText('牛乳を買う')).toBeInTheDocument()
})

test('すべて削除：OK なら全部消える', async () => {
  const user = userEvent.setup()
  localStorage.setItem('todos', JSON.stringify([{ id: '1', text: '牛乳を買う', done: false }]))
  jest.spyOn(window, 'confirm').mockReturnValue(true)
  render(<TodoApp />)

  await user.click(screen.getByRole('button', { name: 'すべて削除' }))

  expect(screen.getByText('やることはありません')).toBeInTheDocument()
})

test('サンプルを読み込むと一覧に追加される', async () => {
  const user = userEvent.setup()
  localStorage.setItem('todos', JSON.stringify([{ id: '1', text: '牛乳を買う', done: false }]))
  fetchSampleTodos.mockResolvedValue(['サンプル1', 'サンプル2'])
  render(<TodoApp />)

  await user.click(screen.getByRole('button', { name: 'サンプルを読み込む' }))

  expect(await screen.findByText('サンプル2')).toBeInTheDocument()
  expect(screen.getAllByRole('listitem')).toHaveLength(3)
  expect(screen.getByText(/残り 3 件/)).toBeInTheDocument()
})
