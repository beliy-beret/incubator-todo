import React, {ChangeEvent, KeyboardEvent, FC, useState} from "react";
import {FilterModeType, TaskType} from "./App";

type ComponentProps = {
  title: string
  taskList: Array<TaskType>
  deleteTask: (taskId: string) => void
  changeFilter: (filter: FilterModeType) => void
  addNewTask: (text: string) => void
  toggleDoneValue: (id: string) => void
}

const Todolist: FC<ComponentProps> = ({
                                        title,
                                        taskList,
                                        deleteTask,
                                        changeFilter,
                                        addNewTask,
                                        toggleDoneValue
                                      }) => {

  const [newTaskTitle, setNewTask] = useState<string>('');
  const newTaskTitleHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.currentTarget.value);
  }
  const showTaskList = () => {
    if(taskList.length === 0) {
      return <span>Task list is empty.</span>
    } else {
      return taskList.map((item) => {

        const onChangeCheckHandle = () => toggleDoneValue(item.id);
        const onKeyDownHandle = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && toggleDoneValue(item.id)
        const deleteTaskButtonHandle = () => deleteTask(item.id);

        return(
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.isDone}
              onChange={onChangeCheckHandle}
              onKeyDown={onKeyDownHandle}
            />
            <span>{item.title}</span>
            <button onClick={deleteTaskButtonHandle}>Del</button>
          </li>
        )
      })
    }
  }
  const addTaskButtonHandle = () => {
    addNewTask(newTaskTitle);
    setNewTask('');
  };
  const addTaskKeyDownHandle = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && addNewTask(newTaskTitle);
  const filterHandle = {
    getAllTask(){
      changeFilter('all')
    },
    getActiveTask(){
      changeFilter('active')
    },
    getCompletedTask(){
      changeFilter('completed')
    }
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={newTaskTitleHandle}
          onKeyDown={addTaskKeyDownHandle}
        />
        <button
          onClick={addTaskButtonHandle}
        >+</button>
      </div>
      <ul>
        {showTaskList()}
      </ul>
      <div>
        <button onClick={filterHandle.getAllTask}>All</button>
        <button onClick={filterHandle.getActiveTask}>Active</button>
        <button onClick={filterHandle.getCompletedTask}>Completed</button>
      </div>
    </div>
  )
}

export default Todolist;

