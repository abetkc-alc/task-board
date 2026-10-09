import { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([])
  const [text, setText] = useState('')

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
