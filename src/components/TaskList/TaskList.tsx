import {FC} from "react";
import {FilterModeType, TaskType} from "../../App";
import Task from "../Task/Task";
import AddNewTaskForm from "../AddNewTaskForm/AddNewTaskForm";
import style from './style.module.css';

type ComponentProps = {
  title: string
  taskList: Array<TaskType>
  filterMode: FilterModeType
  deleteTask: (taskId: string) => void
  changeFilter: (filter: FilterModeType) => void
  addNewTask: (text: string) => void
  toggleDoneValue: (id: string, status: boolean) => void
  removeTodoList: () => void
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
    removeTodoList
  }
) => {

  const showTaskList = () => {
    if (taskList.length === 0) {
      return <span>Task list is empty.</span>
    } else {
      return taskList.map((item) => {
        return (
          <li key={item.id}>
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
      <div><button onClick={removeTodoList}>Delete List</button></div>
      <h3>{title}</h3>
      <AddNewTaskForm addNewTask={addNewTask} />
      <ul>
        {showTaskList()}
      </ul>
      <div>
        <button className={filterMode === 'all' ? style.activeFilter : ''} onClick={filterHandle.getAllTask}>All</button>
        <button className={filterMode === 'active' ? style.activeFilter : ''} onClick={filterHandle.getActiveTask}>Active</button>
        <button className={filterMode === 'completed' ? style.activeFilter : ''} onClick={filterHandle.getCompletedTask}>Completed</button>
      </div>
    </div>
  )
}

export default TaskList;

