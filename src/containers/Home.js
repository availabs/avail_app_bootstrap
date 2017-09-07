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
          <Link to="/average-weekday-speed-table-description/">
            "/average-weekday-speed-table-description/"
          </Link>
        </li>
        <li>
          <Link to="/average-weekday-vehicle-classification-table-description/">
            "/average-weekday-vehicle-classification-table-description/"
          </Link>
        </li>
        <li>
          <Link to="/average-weekday-volume-table-description/">
            "/average-weekday-volume-table-description/"
          </Link>
        </li>
        <li>
          <Link to="/short-count-speed-table-description/">
            "/short-count-speed-table-description/"
          </Link>
        </li>
        <li>
          <Link to="/short-count-vehicle-classification-table-description/">
            "/short-count-vehicle-classification-table-description/"
          </Link>
        </li>
        <li>
          <Link to="/short-count-volume-table-description/">
            "/short-count-volume-table-description/"
          </Link>
        </li>
        <li>
          <Link to="/continuous-vehicle-classification-table-description/">
            "/continuous-vehicle-classification-table-description/"
          </Link>
        </li>
        <li>
          <Link to="/continuous-volume-table-description/">
            "/continuous-volume-table-description/"
          </Link>
        </li>
        <li>
          <Link to="/station-info/:rcStation">"/station-info/:rcStation"</Link>
        </li>
      </div>
    );
  }
}
