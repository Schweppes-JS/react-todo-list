import React, { useState } from 'react';
import List from './components/List/index';
import AddButton from './components/AddButton';
import listSvg from './assets/img/list.svg';

import data from './assets/db.json';

function App() {
  const [lists, setLists] = useState(data.lists.map(item => {
    item.color = data.colors.filter(color => color.id === item.colorId)[0].name;
    return item;
  }));

  const onAddList = (obj) => {
    const newList = [
      ...lists,
      obj
    ]
    setLists(newList);
    console.log(newList);
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
        <List items={lists} isRemovable />
        <AddButton onAdd={onAddList} colors={data.colors} />
      </div>
      <div className="todo__tasks">
      </div>
    </div>
  );
}

export default App;
