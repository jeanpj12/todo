import styles from './Task.module.css'


interface TaskProps{
  id: string
  isChecked: boolean
  content: string
  onDoneTask: (id: string) => void
  onDeleteTask: (id: string) => void
}

export function Task({ isChecked, content, onDoneTask, id, onDeleteTask}:TaskProps) {

  function handleIsDone(){
    onDoneTask(id)
  }

  function handleDeleteTask(){
    onDeleteTask(id)
  }

  return (
    <div className={styles.task}>
      <button
      onClick={handleIsDone}
        className={isChecked ? styles.checked : styles.checker}>
        <i className={`fi fi-sr-circle ${styles.iconChecker}`}></i>
        <i className={`fi fi-sr-check-circle ${styles.iconChecked}`}></i>

      </button>
      <span className={isChecked ? styles.textChecked : styles.textChecker}>
        {content}:TaskProps
      </span>
      <button className={styles.trash} onClick={handleDeleteTask}>
        <i className={`fi fi-rr-trash`}></i>
      </button>
    </div>
  )
}

/* <button className={styles.checked}>
<i class="fi fi-sr-check-circle"></i>
</button> */