# todo-app（Phase 1 完成版）

「Webフロントエンド」授業 Phase 1（コマ1〜6）の完成版 TODO アプリです。
Next.js（App Router）で作っています。

## 動かし方

Node.js（LTS）が入っていれば、次の2つで起動します。

```powershell
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開きます。

## できること

| 機能 | 対応コマ |
|------|---------|
| TODO の追加・完了・削除 | コマ5 本題 |
| 件数表示（全 / 完了 / 残り） | コマ5 演習1 |
| 空のまま追加したときのエラーメッセージ | コマ5 演習2 |
| すべて / 未完了 / 完了 の絞り込み | コマ5 演習3 |
| 完了済みを一括削除 | コマ5 演習4 |
| localStorage への保存（再読み込みしても消えない） | コマ6 本題 |
| 「このアプリについて」ページと共通ヘッダー | コマ6 本題 |
| 404 ページ | コマ6 演習1 |
| 「使い方」ページ | コマ6 演習2 |
| 保存データが壊れていても落ちない | コマ6 演習3 |

## ファイル構成

```text
app/
  layout.js         共通レイアウト（ヘッダー）
  page.js           TODO 一覧（/）
  about/page.js     このアプリについて（/about）
  help/page.js      使い方（/help）
  not-found.js      404 ページ
  globals.css
components/
  Header.js         共通ヘッダー
  TodoAppClient.js  TodoApp をブラウザだけで描画する（ssr: false）
  TodoApp.js        TODO の配列 state を持つ親
  TodoForm.js       入力フォーム
  TodoFilter.js     絞り込みボタン
  TodoList.js       一覧
  TodoItem.js       1件分
```

## その他のコマンド

```powershell
npm run lint    # ESLint でチェック
npm run build   # 本番用にビルド
npm run start   # ビルド結果を起動
```

## 教材（docs/phase1）

| コマ | ファイル | タイトル |
|-----|---------|---------|
| 1 | [01_orientation.md](docs/phase1/01_orientation.md) | オリエンテーション・環境構築（create-next-app で最初の一歩） |
| 2 | [02_jsx_props.md](docs/phase1/02_jsx_props.md) | JSXとコンポーネント・props |
| 3 | [03_state_events.md](docs/phase1/03_state_events.md) | stateとイベント・'use client' |
| 4 | [04_list_conditional.md](docs/phase1/04_list_conditional.md) | リストと条件付き表示 |
| 5 | [05_todo_app_1.md](docs/phase1/05_todo_app_1.md) | TODOアプリ実装①（追加・完了・削除） |
| 6 | [06_todo_app_2.md](docs/phase1/06_todo_app_2.md) | TODOアプリ実装②（保存・ページ分け） |
| 7 | [07_github_branch.md](docs/phase1/07_github_branch.md) | GitHub連携・ブランチ・PR体験 |

Phase 2（コマ8〜）からは、この TODO アプリに Jest と React Testing Library でテストを書いていきます。
