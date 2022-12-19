import {FC, useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

export type FilterModeType = 'all' | 'active' | 'completed'
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

const App: FC = () => {

  const [tasks, setTask] = useState<Array<TaskType>>([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false}
  ]);
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
  };
  const filteredTasks = showFilteredTask();
  const filterModeHandle = (filter: FilterModeType) => setFilterMode(filter);
  const deleteTask = (taskId: string) => setTask(tasks.filter(item => item.id !== taskId));
  const addNewTask = (text: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: text,
      isDone: false
    }
    setTask([...tasks, newTask]);
  }
  const toggleDoneValue = (taskId: string) => setTask(tasks.map((item) => {
    if(item.id === taskId) {
      return {...item, isDone: !item.isDone}
    } else {
      return item
    }
  }))

  return (
    <div className="App">
      <Todolist
        title={'What to learn'}
        taskList={filteredTasks}
        deleteTask={deleteTask}
        changeFilter={filterModeHandle}
        addNewTask={addNewTask}
        toggleDoneValue={toggleDoneValue}
      />
    </div>
  );
}

export default App;
