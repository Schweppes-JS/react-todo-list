import React, { useState } from 'react';
import List from '../List/index';
import addSvg from '../../assets/img/add.svg';

import './AddButton.scss';

import Badge from '../Badge';

const AddButton = ({ colors }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);

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
        <input className="field" type="text" placeholder="Task Name"></input>
        <div className="add-button__popup-colors">
          {
            colors.map(color => <Badge key={color.id} color={color.name} />)
          }
        </div>
        <button className="button">Add</button>
      </div>}
    </div>
  )
}

export default AddButton;