import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, useHistory, useLocation } from 'react-router-dom';

import { List, AddButton, Tasks } from './components';

import listSvg from './assets/img/list.svg';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const listId = location.pathname.split('lists/')[1];
    if (lists) {
      const list = lists.find(list => list.id === Number(listId));
      setActiveItem(list);
    }
  }, [lists, location.pathname]);

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
      setLists(data);
    });
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    })
  }, []);

  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios.patch('http://localhost:3001/tasks/' + taskId, { completed })
      .catch(() => {
        alert('Update the task failed');
      });
  }

  const onAddList = (obj) => {
    const newList = [
      ...lists,
      obj
    ]
    setLists(newList);
  }

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  }

  const onEditListTitle = (id, title) => {
    const newList = lists.map(list => {
      if (list.id === id) {
        list.name = title;
      }
      return list;
    })
    setLists(newList);
  }

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm('Do you realy want to delete this task?')) {
      const newList = lists.map(item => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter(task => task.id !== taskId);
        }
        return item;
      });
      setLists(newList);
      axios.delete('http://localhost:3001/tasks/' + taskId)
        .catch(() => {
          alert('Delete the task failed');
        });
    }
  }

  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt('Task text', taskObj.text);

    if (!newTaskText) {
      return;
    }

    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if (task.id === taskObj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios.patch('http://localhost:3001/tasks/' + taskObj.id, { text: newTaskText })
      .catch(() => {
        alert('Edit the task failed');
      });
  }

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          onClickItem={list => {
            history.push(`/`)
          }}
          items={[
            {
              active: location.pathname === '/',
              icon: <img src={listSvg} alt="List icon" />,
              name: 'All lists'
            }
          ]}
        />
        {lists ?
          (<List onRemove={(id) => {
            const newList = lists.filter(item => item.id !== id);
            setLists(newList);
          }}
            items={lists}
            isRemovable
            onClickItem={list => history.push(`/lists/${list.id}`)}
            activeItem={activeItem} />) :
          ('Loading...')
        }
        <AddButton onAdd={onAddList} colors={colors} />
      </div>
      <div className="todo__tasks">
        <Route exact path="/">
          {lists &&
            lists.map(list => <Tasks
              list={list}
              onAddTask={onAddTask}
              onEditTitle={onEditListTitle}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
              onCompleteTask={onCompleteTask}
              withoutEmpty />)
          }
        </Route>
        <Route exact path="/lists/:id">
          {lists && activeItem && <Tasks
            list={activeItem}
            onAddTask={onAddTask}
            onEditTitle={onEditListTitle}
            onRemoveTask={onRemoveTask}
            onEditTask={onEditTask}
            onCompleteTask={onCompleteTask}
          />}
        </Route>
      </div>
    </div>
  );
}

export default App;
