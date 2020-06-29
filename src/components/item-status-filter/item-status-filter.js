import React from 'react';

const filterButtons = [
  { name: 'all', label: 'All' },
  { name: 'active', label: 'Active' },
  { name: 'done', label: 'Done' }
];

const ItemStatusFilter = ({onFilterChange}) => {

  const buttons = filterButtons.map(({name, label}) => {

    return (
      <li key={name}
              type="button"
             ><a href="#/active" onClick={() => onFilterChange(name)}>{label} </a></li>
    );
  });

  return (
    <>
    <ul className="filters">
      { buttons }
    </ul>
    </>
  );
};

export default ItemStatusFilter;
