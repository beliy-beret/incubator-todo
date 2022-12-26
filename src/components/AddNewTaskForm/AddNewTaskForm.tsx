import {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import style from './style.module.css';

type ComponentPropsType = {
  addNewTask: (taskTitle: string) => void
}

const AddNewTaskForm: FC<ComponentPropsType> = (
  {addNewTask}
) => {

  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [error, setError] = useState<string>('');
  const newTaskTitleHandle = (event: ChangeEvent<HTMLInputElement>) => {
    error && setError('');
    setNewTaskTitle(event.currentTarget.value.trim());
  };
  const addTaskButtonHandle = () => {
    if (newTaskTitle) {
      addNewTask(newTaskTitle);
      setNewTaskTitle('');
    } else {
      setError('Enter task title.');
    }
  };
  const addTaskKeyDownHandle = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (newTaskTitle) {
        addNewTask(newTaskTitle);
        setNewTaskTitle('');
      } else {
        setError('Enter task title.');
      }
    }
  };

  return (
    <div className={style.form}>
      <input
        value={newTaskTitle}
        onChange={newTaskTitleHandle}
        onKeyDown={addTaskKeyDownHandle}
        className={`${style.input} ${error ? style.notValid : ''}`}
      />
      <button
        onClick={addTaskButtonHandle}
      >+
      </button>
      {error && <p className={style.error}>{error}</p>}
    </div>
  )
}

export default AddNewTaskForm;
