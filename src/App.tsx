import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterModeType = 'all' | 'active' | 'completed'
export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

function App() {
  const [tasks, setTask] = useState<Array<TaskType>>([
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false}
  ])

  const [filterMode, setFilterMode] = useState<FilterModeType>('all');

  const showFilteredTask = (): Array<TaskType> => {
    switch (filterMode){
      case 'active':
        return tasks.filter(item => !item.isDone);
      case 'completed':
        return tasks.filter(item => item.isDone);
      default:
        return tasks
    }
  }
  const filteredTasks = showFilteredTask();
  const filterModeHandle = (filter: FilterModeType) => setFilterMode(filter);

  const deleteTask = (taskId: number) => setTask(tasks.filter(item => item.id !== taskId));
  return (
    <div className="App">
      <Todolist
        title={'What to learn'}
        taskList={filteredTasks}
        deleteTask={deleteTask}
        changeFilter={filterModeHandle}
      />
    </div>
  );
}

export default App;
