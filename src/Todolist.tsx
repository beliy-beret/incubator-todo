import React from "react";

type Task = {
  id: number
  title: string
  isDone: boolean
};

type ComponentProps = {
  title: string
  taskList: Array<Task>
}

export function Todolist({title, taskList}: ComponentProps) {
  function showTaskList(){
    return taskList.map((item) => (
      <li key={item.id}><input type="checkbox" checked={item.isDone}/> <span>{item.title}</span></li>
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
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}
