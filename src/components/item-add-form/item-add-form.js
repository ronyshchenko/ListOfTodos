import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

  state = {
    label: ''
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label } = this.state;
    this.setState({ label: '' });
    const cb = this.props.onItemAdded || (() => {});
    cb(label);
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form
        onSubmit={this.onSubmit}>
        <input type="text"
          className="new-todo"
          value={this.state.label}
          onChange={this.onLabelChange}
          placeholder="What needs to be done?" />
        </form>
      </header>
      
    );
  }
}
