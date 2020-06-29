import React from 'react';

import './todo-list-item.css';

const TodoListItem = ({ important, done, id, edit,
      label, onToggleImportant, onToggleDone, onDelete, onEdit}) => {
  // console.log(edit, 'eeee');
  let classNamesEdit = 'edit'      
  let classNames = '';
  let isChecked = false;
  if (important) {
    classNames += 'important';
  }

  if (edit) {
    classNamesEdit += ' go';
  }

  if (done) {
    classNames += ' done';
    isChecked = !isChecked;
  }

  return (
    <>
    <div className="view">
      <input type="checkbox" className = "toggle" 
      id={id} onClick={onToggleDone} 
      checked = {isChecked}
       />
      <label htmlFor={id} className = {classNames}
      >{label}</label>
      <button type="button" className="destroy" onClick={onDelete}/>
     </div>
    <input type="text" className={classNamesEdit} />
  </>
  );
};

export default TodoListItem;
