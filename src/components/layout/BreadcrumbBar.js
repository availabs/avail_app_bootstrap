import React from 'react';
import { Link } from 'react-router-dom';
import './BreadcrumbBar.css';

export default props => (
  <ul className="breadcrumb">
    {props.items.map((item, i) => {
      if (props.items.length === i + 1) {
        return <li className="breadcrumb-item">{item.text}</li>;
      }
      return (
        <li className="breadcrumb-item">
          <Link to={item.link}>{item.text}</Link>
        </li>
      );
    })}
  </ul>
);
