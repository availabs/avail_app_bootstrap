import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
  <div className="os-tabs-w mx-4">
    <div className="os-tabs-controls">
      <ul className="nav nav-tabs upper">
        {props.items.map((item, i) => {
          return (
            <li className="nav-item">
              <Link
                className={
                  'nav-link' +
                  (item.active ? ' active' : '') +
                  (item.active ? ' disabled' : '')
                }
                to={item.link}
              >
                {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);
