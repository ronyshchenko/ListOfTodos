import React from 'react';

import TodoListItem from '../todo-list-item/todo-list-item';
import ItemStatusFilter from '../item-status-filter/item-status-filter';

import './todo-list.css';

const TodoList = ({ items, onToggleImportant, onToggleDone, onDelete, onDeleteAll, count, filter, onFilterChange, onEdit }) => {

  const elements = items.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <li key={id}>
        <TodoListItem
          id = { id }
          { ...itemProps }
          onToggleImportant={ () => onToggleImportant(id) }
          onToggleDone={ () => onToggleDone(id) }
          onDelete={ () => onDelete(id) }  onEdit={ () => onEdit(id) } />
      </li>
    );
  });
  const countTodo = items.length - count(items);
  return (
  <>
  <ul className="todo-list">{ elements }</ul>
  <footer className="footer">
  <span className="todo-count">
          {`${countTodo} items left`}
        </span>
        <ItemStatusFilter
             filter={filter}
            onFilterChange={onFilterChange} />
            <button type="button" className="clear-completed" onClick={onDeleteAll}>
          Clear completed
        </button>
      </footer>
  
            </>);
};

export default TodoList;
