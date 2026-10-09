import { useEffect, useState } from 'react'

const STORAGE_KEY = 'tasks'

// localStorage から保存済みのタスクを読み込む（読めない・壊れている場合は空にする）
const loadTasks = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [text, setText] = useState('')

  // タスクが変わるたびに localStorage に保存する
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      // 保存できない環境（プライベートモードなど）では何もしない
    }
  }, [tasks])

  // タスクを追加する（空白だけの入力は無視）
  const addTask = (e) => {
    e.preventDefault()
    const title = text.trim()
    if (!title) return
    setTasks([...tasks, { id: crypto.randomUUID(), title, done: false }])
    setText('')
  }

  // 完了・未完了を切り替える
  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  return (
    <main className="board">
      <h1>タスクボード</h1>

      <form className="add-form" onSubmit={addTask}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しいタスクを入力"
          aria-label="新しいタスク"
        />
        <button type="submit">追加</button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty">タスクはまだありません</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.done ? 'task done' : 'task'}>
              <label>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span>{task.title}</span>
              </label>
              <button
                className="delete"
                onClick={() => deleteTask(task.id)}
                aria-label={`「${task.title}」を削除`}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
