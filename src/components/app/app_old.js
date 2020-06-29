import React, { Component } from 'react';
import TodoList from '../todo-list';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
  maxId = 100;

  state = {
    items: [
      {
        id: 1, label: 'Drink Coffee', done: false,
      },
      {
        id: 2, label: 'Learn React', done: false,
      },
      {
        id: 3, label: 'Make Awesome App', done: false,
      },
    ],
    filter: 'all',
  };

  onItemAdded = (label) => {
    if (label === '') {
      return;
    }

    this.setState((state) => {
      const item = this.createItem(label);

      return { items: [...state.items, item] };
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex(item => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = {
      ...arr[idx], [propName]: value,
    };

    return [
      ...arr.slice(0, idx),
      item,
      ...arr.slice(idx + 1),
    ];
  };

  onToggleDone = (id) => {
    this.setState((state) => {
      const items = this.toggleProperty(state.items, id, 'done');

      return { items };
    });
  };

  onToggleDoneAll = () => {
    this.setState((state) => {
      let items;

      if (state.items.every(item => item.done === false)) {
        items = state.items.map((item, i) => ({
          ...item, done: !item.done,
        }));

        return { items };
      }

      if (state.items.every(item => item.done === true)) {
        items = state.items.map((item, i) => {
          const value = !item.done;

          return {
            ...item, done: value,
          };
        });

        return { items };
      }

      items = state.items.map((item, i) => {
        let value = item.done;

        if (value === false) {
          value = true;
        }

        return {
          ...item, done: value,
        };
      });

      return { items };
    });
  };

  onToggleImportant = (id) => {
    this.setState((state) => {
      const items = this.toggleProperty(state.items, id, 'important');

      return { items };
    });
  };

  onDelete = (id) => {
    this.setState((state) => {
      const idx = state.items.findIndex(item => item.id === id);
      const items = [
        ...state.items.slice(0, idx),
        ...state.items.slice(idx + 1),
      ];

      return { items };
    });
  };

  onDeleteAll = () => {
    this.setState((state) => {
      const items = [
        ...state.items.slice(0, 0),
      ];

      return { items };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  searchItems(items, search) {
    if (search.length === 0) {
      return items;
    }

    return items.filter(item => item.label.toLowerCase().indexOf(search.toLowerCase()) > -1);
  }

  count(members) {
    return members.filter(item => item.done === true).length;
  }

  onEdit = (id) => {
    this.setState((state) => {
      const items = this.toggleProperty(state.items,
        id, 'edit');

      return { items };
    });
  }

  createItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId + 1,
    };
  }

  filterItems(items, filter) {
    if (filter === 'active') {
      return items.filter(item => (!item.done));
    }

    if (filter === 'done') {
      return items.filter(item => item.done);
    }

    return items;
  }

  render() {
    const { items, filter } = this.state;

    const visibleItems = this.filterItems(items, filter);

    return (
      <section className="todoapp">
        <ItemAddForm
          onItemAdded={this.onItemAdded}
        />
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.onToggleDoneAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            onEdit={this.onEdit}
            countTodo={this.countTodo}
            items={visibleItems}
            onToggleImportant={this.onToggleImportant}
            onToggleDone={this.onToggleDone}
            onDelete={this.onDelete}
            onDeleteAll={this.onDeleteAll}
            count={this.count}
            filter={this.state.filter}
            onFilterChange={this.onFilterChange}
          />
        </section>
      </section>
    );
  }
}
