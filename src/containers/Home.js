import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: []
    };
  }

  render() {
    return (
      <div className="Home">
        <li>
          <Link to="/all-station-ids">"/all-station-ids"</Link>
        </li>
        <li>
          <Link to="/all-region-names/">"/all-region-names/"</Link>
        </li>
        <li>
          <Link to="/avg-weekday-speed-table/">
            "/avg-weekday-speed-table/"
          </Link>
        </li>
        <li>
          <Link to="/avg-weekday-vehicle-classification-table/">
            "/avg-weekday-vehicle-classification-table/"
          </Link>
        </li>
        <li>
          <Link to="/avg-weekday-volume-table/">
            "/avg-weekday-volume-table/"
          </Link>
        </li>
        <li>
          <Link to="/short-count-speed-table/">
            "/short-count-speed-table/"
          </Link>
        </li>
        <li>
          <Link to="/short-count-vehicle-classification-table/">
            "/short-count-vehicle-classification-table/"
          </Link>
        </li>
        <li>
          <Link to="/short-count-volume-table/">
            "/short-count-volume-table/"
          </Link>
        </li>
        <li>
          <Link to="/continuous-vehicle-classification-table/">
            "/continuous-vehicle-classification-table/"
          </Link>
        </li>
        <li>
          <Link to="/continuous-volume-table/">
            "/continuous-volume-table/"
          </Link>
        </li>
        <li>
          <Link to="/station-info/:rcStation">"/station-info/:rcStation"</Link>
        </li>
      </div>
    );
  }
}
