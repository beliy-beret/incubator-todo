import {FC, useState} from 'react';
import './App.css';
import TaskList from "./components/TaskList/TaskList";
import {v1} from "uuid";

export type FilterModeType = 'all' | 'active' | 'completed'
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TodoListsType = {
  id: string
  title: string
  filterMode: FilterModeType
}
export type TaskListType = {
  [key: string]: Array<TaskType>
}

const App: FC = () => {

  const todolistID1 = v1();
  const todolistID2 = v1();
  const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
    {id: todolistID1, title: 'What to learn', filterMode: 'all'},
    {id: todolistID2, title: 'What to buy', filterMode: 'all'},
  ]);
  const [tasks, setTasks] = useState<TaskListType>({
    [todolistID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]: [
      {id: v1(), title: "HTML&CSS2", isDone: true},
      {id: v1(), title: "JS2", isDone: true},
      {id: v1(), title: "ReactJS2", isDone: false},
      {id: v1(), title: "Rest API2", isDone: false},
      {id: v1(), title: "GraphQL2", isDone: false},
    ]
  });

  const filterModeHandle = (todolistId: string, filterMode: FilterModeType) => setTodoLists(todoLists.map(el => el.id === todolistId ? {
    ...el,
    filterMode: filterMode
  } : el));
  const deleteTask = (todoListsId: string, taskId: string) => setTasks({
    ...tasks,
    [todoListsId]: tasks[todoListsId].filter(el => el.id !== taskId)
  });
  const addTask = (todoListsId: string, text: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: text,
      isDone: false
    }
    setTasks({...tasks, [todoListsId]: [newTask, ...tasks[todoListsId]]})
  };
  const removeTodoListHandle = (todoListsId: string) => {
    setTodoLists(todoLists.filter(el => el.id !== todoListsId));
    delete tasks[todoListsId];
  };

  return (
    <div className="App">
      {
        todoLists.map((list) => {

          const showFilteredTask = () => {
            switch (list.filterMode) {
              case 'active':
                return tasks[list.id].filter(item => !item.isDone);
              case 'completed':
                return tasks[list.id].filter(item => item.isDone);
              default:
                return tasks[list.id]
            }
          };
          const filteredTasks = showFilteredTask();
          const removeTask = (taskId: string) => deleteTask(list.id, taskId)
          const addNewTask = (text: string) => addTask(list.id, text);
          const toggleDoneValue = (taskId: string, status: boolean) => setTasks(
            {
              ...tasks,
              [list.id]: tasks[list.id].map(el => el.id === taskId ? {...el, isDone: status} : el)
            })
          const changeFilter = (filterMode: FilterModeType) => filterModeHandle(list.id, filterMode);
          const removeTodoList = () => removeTodoListHandle(list.id);

          return (
            <TaskList
              key={list.id}
              title={list.title}
              taskList={filteredTasks}
              filterMode={list.filterMode}
              deleteTask={removeTask}
              changeFilter={changeFilter}
              addNewTask={addNewTask}
              toggleDoneValue={toggleDoneValue}
              removeTodoList={removeTodoList}
            />
          )
        })
      }
    </div>
  );
}

export default App;
