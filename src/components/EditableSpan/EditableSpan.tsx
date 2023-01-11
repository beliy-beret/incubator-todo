import {KeyboardEvent, ChangeEvent, FC, useState} from 'react';
import s from './style.module.css';

type ComponentPropsType = {
  text: string
  changeText: (text: string) => void
  spanClassName?: string
  inputClassName?: string
}

const EditableSpan: FC<ComponentPropsType> = ({text, changeText, spanClassName = '', inputClassName= s.input}) => {
  const [inputValue, setInputValue] = useState<string>(text);
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const isEditedHandler = () => setIsEdited(!isEdited);
  const inputValueHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value.trim());

  const setNewText = () => {
    if(text !== inputValue){
      changeText(inputValue)
      isEditedHandler()
    } else {
      isEditedHandler()
    }
  }
  const onEnterPress = (e: KeyboardEvent) => {
    if(e.key === 'Enter') {
      setNewText()
    }
  }


  return (
    <span className={spanClassName} onDoubleClick={isEditedHandler}>
      {
        isEdited ?
          <input
            className={inputClassName}
            type={'text'}
            value={inputValue}
            onChange={inputValueHandler}
            onBlur={setNewText}
            onKeyDown={onEnterPress}
            autoFocus={true}
          /> : text
      }
    </span>
  );
};

export default EditableSpan;
