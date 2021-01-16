import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { List, AddButton, Tasks } from './components';

import listSvg from './assets/img/list.svg';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color').then(({ data }) => {
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

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={[
          {
            icon: <img src={listSvg} alt="List icon" />,
            name: 'All tasks',
            active: true
          }
        ]} />
        {lists ?
          (<List onRemove={(item) => alert(1)} items={lists} isRemovable />) :
          ('Loading...')
        }
        <AddButton onAdd={onAddList} colors={colors} />
      </div>
      <div className="todo__tasks">
        <Tasks />
      </div>
    </div>
  );
}

export default App;
