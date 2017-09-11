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

//  <ul className="nav nav-pills smaller hidden-md-down">
//   <li className="nav-item">
//     <a className="nav-link active" data-toggle="tab" href="#" aria-expanded="true"> Today</a></li>
//   <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#" aria-expanded="false"> 7 Days</a></li>
//   <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#" aria-expanded="false"> 14 Days</a></li>
//   <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#" aria-expanded="false"> Last Month</a></li>
// </ul>
