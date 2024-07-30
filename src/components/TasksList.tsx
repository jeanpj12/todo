import styles from './TasksList.module.css'
import Clipboard from '../assets/Clipboard.png'
import { Task } from './Task'
import { v4 as uuidv4 } from 'uuid'
import { TaskStatus } from './TaskStatus'
import { useEffect, useState } from 'react'

interface TaskListProps {
  id: string
  isChecked: boolean
  content: string
}

export function TasksList() {

  const [tasks, setTasks] = useState<TaskListProps[]>([])
  const [totalTasks, setTotalTasks] = useState(0)
  const [doneTask, setDoneTask ] = useState(0)

useEffect(()=>{
  setTotalTasks(tasks.length)
  const updatedDoneTask = tasks.filter(task => task.isChecked).length
  setDoneTask(updatedDoneTask)
}, [tasks])

 function onAddNewTask(onAddNewContent:string){
  const newTask = {
    id: uuidv4(),
    isChecked: false,
    content: onAddNewContent,
  }
  setTasks(prevTasks => {
    const updatedTasks = [...prevTasks, newTask];
    setTotalTasks(updatedTasks.length);
    setDoneTask(updatedTasks.filter(task => task.isChecked).length);
    return updatedTasks;
  });
}

 function handleIsChecked(idToToggle:string){
  setTasks(prevTasks => {
    const updatedTasks = prevTasks.map(task =>
      task.id === idToToggle ? { ...task, isChecked: !task.isChecked } : task
    );
    setTotalTasks(updatedTasks.length);
    setDoneTask(updatedTasks.filter(task => task.isChecked).length);
    return updatedTasks;
  });
 }

 function handleDeleteTask(taskToDelete:string){
  setTasks(prevTasks => {
    const updatedTasks = prevTasks.filter(task => task.id !== taskToDelete);
    setTotalTasks(updatedTasks.length);
    setDoneTask(updatedTasks.filter(task => task.isChecked).length);
    return updatedTasks;
  });
  }

  if (tasks.length === 0) {
    return (
      <div className={styles.tasks}>
        <TaskStatus onAddNewTask={onAddNewTask} numberTotalTask={totalTasks} numberDoneTask={doneTask}/>
        <main>
          <img src={Clipboard} alt="" />
          <div className={styles.textEmptyTasks}>
            <strong>
              Você ainda não tem tarefas cadastradas
            </strong>
            <span>
              Crie tarefas e organize seus itens
            </span>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.tasks}>
        <TaskStatus onAddNewTask={onAddNewTask} numberTotalTask={totalTasks} numberDoneTask={doneTask}/>
        <main>
      {tasks.map((task) => {
        return (
        <Task id={task.id} isChecked={task.isChecked} content={task.content} onDoneTask={handleIsChecked} onDeleteTask={handleDeleteTask}/>
      )
      })}
      </main>
    </div>
  )
}