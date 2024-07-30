import styles from './App.module.css'
import { Header } from './components/Header'
import { TasksList } from './components/TasksList'
import './global.css'

export function App() {
  return (
    <div className={styles.app}>
      <header>
        <Header/>
      </header>
      <TasksList/>
    </div>
  )
}
