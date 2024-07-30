import styles from './TaskStatus.module.css'
import { FormEvent, ChangeEvent, useState, InvalidEvent } from 'react'
import plusSVG from '../assets/plus.svg'

interface TaskStatusProps {
  onAddNewTask: (newTaskText:string) => void
  numberTotalTask: number
  numberDoneTask: number
}

export function TaskStatus({onAddNewTask, numberTotalTask, numberDoneTask}:TaskStatusProps){
  const [newTaskText, setNewTaskText] = useState("")

  function handleAddNewTask(event: FormEvent){
    event.preventDefault()
    onAddNewTask(newTaskText)
    setNewTaskText("")
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>){
    event.target.setCustomValidity('')
    setNewTaskText(event.target.value)
  }

  function handleNewTaskValid(event: InvalidEvent<HTMLInputElement>){
    event.target.setCustomValidity('É necessário dar um nome a tarefa!')
  }

  return(
    <header>
       <form onSubmit={handleAddNewTask} className={styles.addTask}>
      <input
      value = {newTaskText}
      onChange = {handleChange}
      onInvalid={handleNewTaskValid}
      required
      type="text" name="addNewTask" id="addNewTask" placeholder='Adicione uma nova tarefa'/>
      <button>
        <span>Criar</span>
        <img src={plusSVG}/>
      </button>
    </form>
    <strong className={styles.totalTasks}>
      Tarefas criadas <span>{numberTotalTask}</span>
      </strong>
    <strong className={styles.doneTasks}>
      Concluídas <span>{numberDoneTask} de {numberTotalTask}</span>
      </strong>
  </header>
  )
}