import React from 'react';
import classNames from 'classnames';

import './Badge.scss';

const Badge = ({ color, onClick, className }) =>
  <span onClick={onClick} className={classNames('badge', { [`badge--${color}`]: color }, className)}></span>;

export default Badge;