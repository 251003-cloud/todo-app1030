import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { fetchSampleTodos } from '@/lib/api'
import SampleLoader from './SampleLoader'

jest.mock('@/lib/api')

test('読み込みに成功したら、取得した文字で onLoad が呼ばれる', async () => {
  const user = userEvent.setup()
  fetchSampleTodos.mockResolvedValue(['サンプル1', 'サンプル2'])
  const handleLoad = jest.fn()
  render(<SampleLoader onLoad={handleLoad} />)

  await user.click(screen.getByRole('button', { name: 'サンプルを読み込む' }))

  expect(handleLoad).toHaveBeenCalledWith(['サンプル1', 'サンプル2'])
})

test('読み込みに失敗したらエラーメッセージを表示する', async () => {
  const user = userEvent.setup()
  fetchSampleTodos.mockRejectedValue(new Error('HTTP 500'))
  render(<SampleLoader onLoad={jest.fn()} />)

  await user.click(screen.getByRole('button', { name: 'サンプルを読み込む' }))

  expect(await screen.findByRole('alert')).toHaveTextContent('読み込みに失敗しました')
})

test('通信中は「読み込み中…」を表示し、ボタンを押せなくする', async () => {
  const user = userEvent.setup()
  let resolveFetch
  fetchSampleTodos.mockReturnValue(
    new Promise((resolve) => {
      resolveFetch = resolve
    }),
  )
  render(<SampleLoader onLoad={jest.fn()} />)

  await user.click(screen.getByRole('button', { name: 'サンプルを読み込む' }))

  expect(screen.getByText('読み込み中…')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'サンプルを読み込む' })).toBeDisabled()

  resolveFetch([])
  await waitForElementToBeRemoved(() => screen.queryByText('読み込み中…'))
  expect(screen.getByRole('button', { name: 'サンプルを読み込む' })).toBeEnabled()
})
