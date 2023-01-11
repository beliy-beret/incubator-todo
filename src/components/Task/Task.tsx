import {FC, KeyboardEvent} from 'react';
import {TaskType} from "../../App";
import s from './style.module.css';
import EditableSpan from "../EditableSpan/EditableSpan";

type ComponentPropsType = {
  task: TaskType
  deleteTask: (taskId: string) => void
  changeTaskStatus: (taskId: string, taskStatus: boolean) => void
  changeTaskTitle: (newText: string) => void
}

const Task: FC<ComponentPropsType> = (
  { task, deleteTask, changeTaskStatus, changeTaskTitle }
) => {

  const onChangeCheckHandle = () => changeTaskStatus(task.id, !task.isDone);
  const deleteTaskButtonHandle = () => deleteTask(task.id);
  const onKeyDownHandle = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && changeTaskStatus(task.id, !task.isDone)

  return (
    <>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={onChangeCheckHandle}
        onKeyDown={onKeyDownHandle}
      />
      <EditableSpan spanClassName={task.isDone ? s.isDone : ''} text={task.title} changeText={changeTaskTitle} />
      <button onClick={deleteTaskButtonHandle}>&#10007;</button>
    </>
  )
};

export default Task;
