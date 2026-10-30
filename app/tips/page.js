// app/tips/page.js

import { getTips } from '@/lib/tips'

export const metadata = {
  title: 'TODOのコツ | TODOアプリ',
}

export default async function TipsPage() {
  const tips = await getTips()

  return (
    <div>
      <h1>TODOのコツ</h1>
      <ul>
        {tips.map((tip) => (
          <li key={tip.id}>{tip.text}</li>
        ))}
      </ul>
    </div>
  )
}
