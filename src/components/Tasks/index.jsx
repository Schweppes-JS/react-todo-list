import axios from 'axios';
import React from 'react';

import editSvg from '../../assets/img/edit.svg';

import AddTaskForm from './AddTaskForm';

import './Tasks.scss';

const Tasks = ({ list, onEditTitle, onAddTask }) => {

  const editTitle = () => {
    const newTitle = window.prompt("List name", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios.patch('http://localhost:3001/lists/' + list.id, {
        name: newTitle
      }).catch(() => {
        alert('Update the list failed');
      });
    }
  }

  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name}
        <img className="title__edit-icon" onClick={editTitle} src={editSvg} alt="Edit icon" />
      </h2>

      <div className="tasks__items">
        {!list.tasks.length && <h2>No tasks</h2>}
        {list.tasks.map(task => (
          <div key={task.id} className="tasks__items-row">
            <div className="checkbox">
              <input type="checkbox" id={`task-${task.id}`} />
              <label htmlFor={`task-${task.id}`}>
                <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </label>
            </div>
            <input readOnly value={task.text} />
          </div>
        ))}
        <AddTaskForm list={list} onAddTask={onAddTask} />
      </div>
    </div>
  )
}

export default Tasks;
