import React from 'react';

import './Badge.scss';

const Badge = ({ color }) => <span className={`badge badge--${color}`}></span>;

export default Badge;