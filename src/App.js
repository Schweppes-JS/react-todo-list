import React from 'react';
import List from './components/List/index';
import AddButton from './components/AddButton';
import listSvg from './assets/img/list.svg';

import data from './assets/db.json';

function App() {

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
        <List items={[
          {
            color: "green",
            name: 'Shopping'
          },
          {
            color: "blue",
            name: 'Frontend'
          },
          {
            color: "pink",
            name: 'Films and serials'
          }
        ]} isRemovable />
        <AddButton colors={data.colors} />
      </div>
      <div className="todo__tasks">
      </div>
    </div>
  );
}

export default App;
