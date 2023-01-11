import {FC} from "react";
import {FilterModeType, TaskType} from "../../App";
import Task from "../Task/Task";
import s from './style.module.css';
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";

type ComponentProps = {
  title: string
  taskList: Array<TaskType>
  filterMode: FilterModeType
  deleteTask: (taskId: string) => void
  changeFilter: (filter: FilterModeType) => void
  addNewTask: (text: string) => void
  toggleDoneValue: (id: string, status: boolean) => void
  deleteTodoList: () => void
  changeTaskTitle: (taskId: string, newText: string) => void
  changeListTitle: (newTitle: string) => void
}

const TaskList: FC<ComponentProps> = (
  {
    title,
    taskList,
    deleteTask,
    changeFilter,
    addNewTask,
    toggleDoneValue,
    filterMode,
    deleteTodoList,
    changeTaskTitle,
    changeListTitle
  }
) => {

  const showTaskList = () => {
    if (taskList.length === 0) {
      return <span>Task list is empty.</span>
    } else {
      return taskList.map((item) => {
        const editTaskTitle = (newText: string) => changeTaskTitle(item.id, newText)
        return (
          <li key={item.id} className={s.task}>
            <Task
              task={item}
              deleteTask={deleteTask}
              changeTaskStatus={toggleDoneValue}
              changeTaskTitle={editTaskTitle}
            />
          </li>
        )
      })
    }
  };
  const filterHandle = {
    getAllTask() {
      changeFilter('all')
    },
    getActiveTask() {
      changeFilter('active')
    },
    getCompletedTask() {
      changeFilter('completed')
    }
  }

  return (
    <div>
      <div className={s.title}>
        <h2><EditableSpan text={title} changeText={changeListTitle} /></h2>
        <button onClick={deleteTodoList}>&#10007;</button>
      </div>

      <AddItemForm addItem={addNewTask}/>
      <ul className={s.list}>
        {showTaskList()}
      </ul>
      <div className={s.buttons}>
        <button className={filterMode === 'all' ? s.activeFilter : ''} onClick={filterHandle.getAllTask}>All</button>
        <button className={filterMode === 'active' ? s.activeFilter : ''} onClick={filterHandle.getActiveTask}>Active
        </button>
        <button className={filterMode === 'completed' ? s.activeFilter : ''}
                onClick={filterHandle.getCompletedTask}>Completed
        </button>
      </div>
    </div>
  )
}

export default TaskList;

