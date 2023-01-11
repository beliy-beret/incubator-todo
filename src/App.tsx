import {FC, useState} from 'react';
import TaskList from "./components/TaskList/TaskList";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import s from './App.module.css';

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
  const todoListID1 = v1();
  const todoListID2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
    {id: todoListID1, title: 'What to learn', filterMode: 'all'},
    {id: todoListID2, title: 'What to buy', filterMode: 'all'},
  ]);
  const [tasks, setTasks] = useState<TaskListType>({
    [todoListID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todoListID2]: [
      {id: v1(), title: "HTML&CSS2", isDone: true},
      {id: v1(), title: "JS2", isDone: true},
      {id: v1(), title: "ReactJS2", isDone: false},
      {id: v1(), title: "Rest API2", isDone: false},
      {id: v1(), title: "GraphQL2", isDone: false},
    ]
  });

  const tasksHandler = {
    deleteTask(todoListsId: string, taskId: string) {
      setTasks({
        ...tasks,
        [todoListsId]: tasks[todoListsId].filter(el => el.id !== taskId)
      })
    },
    addTask(todoListsId: string, taskTitle: string){
      const newTask: TaskType = {
        id: v1(),
        title: taskTitle,
        isDone: false
      }
      setTasks({...tasks, [todoListsId]: [newTask, ...tasks[todoListsId]]})
    },
    toggleDoneValue(todoListId: string, taskId: string, newStatus: boolean) {
      setTasks(
        {
          ...tasks,
          [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, isDone: newStatus} : el)
        })
    },
    changeTask(todoListId: string, taskId: string, newText: string){
      setTasks({
        ...tasks,
        [todoListId]: tasks[todoListId].map(item => {
          if(item.id === taskId){
            return{...item, title: newText}
          } else {
            return item
          }
        })
      })
    }
  };
  const todoListsHandler = {
    addList(title: string) {
      const newTodoList: TodoListsType = {
        id: v1(),
        title: title,
        filterMode: 'all'
      }
      setTodoLists([...todoLists, newTodoList])
      setTasks({...tasks, [newTodoList.id]: []})
    },
    deleteList(listId: string) {
      setTodoLists(todoLists.filter(item => item.id !== listId));
      delete tasks[listId];
      setTasks({...tasks});
    },
    changeListTitle(listId: string, newTitle: string) {
      setTodoLists(todoLists.map(item => {
        if(item.id === listId) {
          return {...item, title: newTitle}
        } else {
          return item
        }
      }))
    },
    toggleFilterMode(todoListId: string, filterMode: FilterModeType){
      setTodoLists(todoLists.map(item => {
        if(item.id === todoListId) {
          return {...item, filterMode: filterMode}
        } else {
          return item
        }
      }))
    }
  };

  return (
    <div className={s.App}>
      <div className={s.header}>
        <h1 className={s.title}>Track your tasks</h1>
        <div className={s.form}>
          <span className={s.label}> Add new TodoList: </span>
          <AddItemForm addItem={todoListsHandler.addList} />
        </div>
      </div>
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
          const deleteTask = (taskId: string) => tasksHandler.deleteTask(list.id, taskId)
          const addNewTask = (text: string) => tasksHandler.addTask(list.id, text)
          const toggleDoneValue = (taskId: string, newStatus: boolean) => tasksHandler.toggleDoneValue(list.id, taskId, newStatus)
          const changeFilter = (filterMode: FilterModeType) => todoListsHandler.toggleFilterMode(list.id, filterMode)
          const deleteTodoList = () => todoListsHandler.deleteList(list.id)
          const changeTask = (taskId: string, newText: string) => tasksHandler.changeTask(list.id, taskId, newText)
          const changeListTitle = (newTitle: string) => todoListsHandler.changeListTitle(list.id, newTitle)

          return (
            <TaskList
              key={list.id}
              title={list.title}
              taskList={filteredTasks}
              filterMode={list.filterMode}
              deleteTask={deleteTask}
              changeFilter={changeFilter}
              addNewTask={addNewTask}
              toggleDoneValue={toggleDoneValue}
              deleteTodoList={deleteTodoList}
              changeTaskTitle={changeTask}
              changeListTitle={changeListTitle}
            />
          )
        })
      }
    </div>
  );
}

export default App;
