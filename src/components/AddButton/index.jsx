import React, { useState } from 'react';
import List from '../List/index';
import addSvg from '../../assets/img/add.svg';

import closeSvg from '../../assets/img/close.svg';

import './AddButton.scss';

import Badge from '../Badge';

const AddButton = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState('');

  const addList = () => {
    if (!inputValue) {
      alert('Input task name');
      return;
    }
    const color = colors.filter(col => col.id === selectedColor)[0].name;
    onAdd({
      "id": Math.random(),
      "name": inputValue,
      color
    });
    onClose();
  }

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    selectColor(colors[0].id);
  }

  return (
    <div className="add-button">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: "list__add-icon",
            icon: <img src={addSvg} alt="List icon" />,
            name: 'Add task'
          }
        ]}
      />
      {visiblePopup && <div className="add-button__popup">
        <img
          src={closeSvg}
          className="add-button__popup-close-btn"
          alt="close"
          onClick={onClose} />

        <input value={inputValue} onChange={e => setInputValue(e.target.value)} className="field" type="text" placeholder="Task Name"></input>

        <div className="add-button__popup-colors">
          {
            colors.map(color => <Badge
              onClick={() => selectColor(color.id)}
              key={color.id}
              color={color.name}
              className={selectedColor === color.id && 'active'}
            />)
          }
        </div>
        <button onClick={addList} className="button">Add</button>
      </div>}
    </div>
  )
}

export default AddButton;