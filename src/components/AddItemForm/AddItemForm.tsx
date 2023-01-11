import {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import style from './style.module.css';

type ComponentPropsType = {
  addItem: (itemTitle: string) => void
}

const AddItemForm: FC<ComponentPropsType> = (
  {addItem}
) => {

  const [newItemTitle, setNewItemTitle] = useState<string>('');
  const [error, setError] = useState<string>('');
  const newItemTitleHandle = (event: ChangeEvent<HTMLInputElement>) => {
    error && setError('');
    setNewItemTitle(event.currentTarget.value.trim());
  };
  const addItemButtonHandle = () => {
    if (newItemTitle) {
      addItem(newItemTitle);
      setNewItemTitle('');
    } else {
      setError('Enter title.');
    }
  };
  const addItemKeyDownHandle = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (newItemTitle) {
        addItem(newItemTitle);
        setNewItemTitle('');
      } else {
        setError('Enter task title.');
      }
    }
  };

  return (
    <div className={style.form}>
      <input
        value={newItemTitle}
        onChange={newItemTitleHandle}
        onKeyDown={addItemKeyDownHandle}
        className={`${style.input} ${error ? style.notValid : ''}`}
      />
      <button
        onClick={addItemButtonHandle}
      >+
      </button>
      {error && <p className={style.error}>{error}</p>}
    </div>
  )
}

export default AddItemForm;
