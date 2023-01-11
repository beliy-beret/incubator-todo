import {FC} from "react";
import {FilterModeType, TaskType} from "../../App";
import Task from "../Task/Task";
import s from './style.module.css';
import AddItemForm from "../AddItemForm/AddItemForm";

type ComponentProps = {
  title: string
  taskList: Array<TaskType>
  filterMode: FilterModeType
  deleteTask: (taskId: string) => void
  changeFilter: (filter: FilterModeType) => void
  addNewTask: (text: string) => void
  toggleDoneValue: (id: string, status: boolean) => void
  deleteTodoList: () => void
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
    deleteTodoList
  }
) => {

  const showTaskList = () => {
    if (taskList.length === 0) {
      return <span>Task list is empty.</span>
    } else {
      return taskList.map((item) => {
        return (
          <li key={item.id} className={s.task}>
            <Task task={item} deleteTask={deleteTask} changeTaskStatus={toggleDoneValue}/>
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
        <h3>{title}</h3><button onClick={deleteTodoList}>&#10007;</button>
      </div>

      <AddItemForm addItem={addNewTask} />
      <ul className={s.list}>
        {showTaskList()}
      </ul>
      <div className={s.buttons}>
        <button className={filterMode === 'all' ? s.activeFilter : ''} onClick={filterHandle.getAllTask}>All</button>
        <button className={filterMode === 'active' ? s.activeFilter : ''} onClick={filterHandle.getActiveTask}>Active</button>
        <button className={filterMode === 'completed' ? s.activeFilter : ''} onClick={filterHandle.getCompletedTask}>Completed</button>
      </div>
    </div>
  )
}

export default TaskList;

