import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { List, AddButton, Tasks } from './components';

import listSvg from './assets/img/list.svg';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
      setLists(data);
    });
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    })
  }, []);

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

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={[
          {
            active: true,
            icon: <img src={listSvg} alt="List icon" />,
            name: 'All lists',
            active: true
          }
        ]} />
        {lists ?
          (<List onRemove={(id) => {
            const newList = lists.filter(item => item.id !== id);
            setLists(newList);
          }}
            items={lists}
            isRemovable
            onClickItem={item => setActiveItem(item)}
            activeItem={activeItem} />) :
          ('Loading...')
        }
        <AddButton onAdd={onAddList} colors={colors} />
      </div>
      <div className="todo__tasks">
        {lists && activeItem && <Tasks list={activeItem} onAddTask={onAddTask} onEditTitle={onEditListTitle} />}
      </div>
    </div>
  );
}

export default App;
