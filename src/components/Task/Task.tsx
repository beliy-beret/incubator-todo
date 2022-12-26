import {FC, KeyboardEvent} from 'react';
import {TaskType} from "../../App";

type ComponentPropsType = {
  task: TaskType
  deleteTask: (taskId: string) => void
  changeTaskStatus: (taskId: string, taskStatus: boolean) => void
}

const Task: FC<ComponentPropsType> = (
  { task, deleteTask, changeTaskStatus  }
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
      <span className={task.isDone ? 'isDone' : ''}>{task.title}</span>
      <button onClick={deleteTaskButtonHandle}>Del</button>
    </>
  )
};

export default Task;
