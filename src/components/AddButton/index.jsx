import React, { useState, useEffect } from 'react';
import axios from 'axios';

import List from '../List/index';
import addSvg from '../../assets/img/add.svg';

import closeSvg from '../../assets/img/close.svg';

import './AddButton.scss';

import Badge from '../Badge';

const AddButton = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(3);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id);
    }
  }, [colors]);

  const addList = () => {
    if (!inputValue) {
      alert('Input task name');
      return;
    }
    setIsLoading(true);
    axios.post('http://localhost:3001/lists', { name: inputValue, colorId: selectedColor }).then(({ data }) => {
      const color = colors.filter(col => col.id === selectedColor)[0];
      const listObj = { ...data, color, tasks: [] };
      onAdd(listObj);
      onClose();
    })
      .catch(() => alert('Error on adding list'))
      .finally(() => {
        setIsLoading(false);
      });
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
            name: 'Add list'
          }
        ]}
      />
      {visiblePopup && <div className="add-button__popup">
        <img
          src={closeSvg}
          className="add-button__popup-close-btn"
          alt="close"
          onClick={onClose} />

        <input value={inputValue} onChange={e => setInputValue(e.target.value)} className="field" type="text" placeholder="List name"></input>

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
        <button onClick={addList} className="button">{isLoading ? "Adding..." : "Add"}</button>
      </div>}
    </div>
  )
}

export default AddButton;