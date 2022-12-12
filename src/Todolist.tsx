import React from "react";
import {FilterModeType, TaskType} from "./App";

type ComponentProps = {
  title: string
  taskList: Array<TaskType>
  deleteTask: (taskId: number) => void
  changeFilter: (filter: FilterModeType) => void
}

export function Todolist({title, taskList, deleteTask, changeFilter}: ComponentProps) {
  function showTaskList(){
    return taskList.map((item) => (
      <li key={item.id}><input type="checkbox" checked={item.isDone}/>
        <span>{item.title}</span>
        <button onClick={() => deleteTask(item.id)}>Del</button>
      </li>
    ))
  }
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {showTaskList()}
      </ul>
      <div>
        <button onClick={() => changeFilter('all')}>All</button>
        <button onClick={() => changeFilter('active')}>Active</button>
        <button onClick={() => changeFilter('completed')}>Completed</button>
      </div>
    </div>
  )
}
