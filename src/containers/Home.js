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
      <div className="content-w">
        <div className="features-table">
          <div className="os-container">
            <div
              className="d-flex flex-column align-content-center flex-wrap flexContainer"
              style={{ height: 1092 }}
            >
              <div className="col-xl-4 col-sm-6 b-l b-t feature-cell">
                <Link to="/map">
                  <div className="feature-icon">
                    <i className="icon-map" />
                  </div>
                  <h6 className="feature-title">Interactive Map</h6>
                  <div className="feature-text">
                    Explore counts and completeness through an interactive map.
                    Visualize data and meta data coverage for all traffic
                    counts.
                  </div>
                </Link>
              </div>
              <div className="col-xl-4 col-sm-6 b-r b-l b-t feature-cell">
                <Link to="/regions">
                  <div className="feature-icon">
                    <i className="icon-graph" />
                  </div>
                  <h6 className="feature-title">Short Counts</h6>
                  <div className="feature-text">
                    View short counts data and collection meta data.
                  </div>
                </Link>
              </div>
              <div className="col-xl-4 col-sm-6 b-r b-l feature-cell">
                <div className="feature-icon">
                  <i className="icon-chart" />
                </div>
                <h6 className="feature-title">Continuous Counts</h6>
                <div className="feature-text">
                  Analyze continuous counts data and collection meta data
                </div>
              </div>
              <div className="col-xl-4 col-sm-6 b-r feature-cell">
                <div className="feature-icon">
                  <i className="icon-book-open" />
                </div>
                <h6 className="feature-title">Reporting Tools</h6>
                <div className="feature-text">
                  Generate and view report templates. Design and share new
                  reports.
                </div>
              </div>
              <div className="col-xl-4 col-sm-6 b-r b-l feature-cell">
                <div className="feature-icon">
                  <i className="os-icon os-icon-user-male-circle2" />
                </div>
                <h6 className="feature-title">User Management</h6>
                <div className="feature-text">
                  Easily invite and create users. Grant or restrict access to
                  data products.
                </div>
              </div>
              <div className="col-xl-4 col-sm-6 b-r feature-cell">
                <div className="feature-icon">
                  <i className="os-icon os-icon-tasks-checked" />
                </div>
                <h6 className="feature-title">Hand Held Field App</h6>
                <div className="feature-text">
                  {' '}
                  Upload counts with regulation field sheets, get location
                  coordinates from your mobile device, automatically look up and
                  fill in meta data fields and uplaod pictures from your mobile
                  camera.
                </div>
              </div>
              <div className="col-xl-4 col-sm-6 b-l feature-cell">
                <div className="feature-icon">
                  <i className="icon-event" />
                </div>
                <h6 className="feature-title">QA & Counts Management</h6>
                <div className="feature-text">
                  Manage counts submitted from vendors, municipalities and
                  MPO's. Automatically detect data quality flags. Edit and
                  approve data for counts system. Generate reports and invoices.{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
