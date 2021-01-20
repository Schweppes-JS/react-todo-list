import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

import editSvg from '../../assets/img/edit.svg';

import AddTaskForm from './AddTaskForm';
import Task from './Task';

import './Tasks.scss';

const Tasks = ({ list, onEditTitle, onAddTask, onEditTask, onCompleteTask, onRemoveTask, withoutEmpty }) => {

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
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <img className="title__edit-icon" onClick={editTitle} src={editSvg} alt="Edit icon" />
        </h2>
      </Link>

      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && <h2>No tasks</h2>}
        {list.tasks && list.tasks.map(task => (
          <Task
            key={task.id}
            onEdit={onEditTask}
            onRemove={onRemoveTask}
            onComplete={onCompleteTask}
            list={list}
            {...task}
          />
        ))}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  )
}

export default Tasks;
