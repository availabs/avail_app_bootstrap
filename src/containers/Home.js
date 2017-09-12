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
                <div className="feature-icon">
                  <i className="icon-map" />
                </div>
                <h6 className="feature-title" />
                <div className="feature-text">
                  Gone studies to titles have audiences of and concepts was
                  motivator, the this more picture a to we ever the taken have
                  brilliant. Explain on woman concept readiness way.
                </div>
              </div>
              <div className="col-xl-4 col-sm-6 b-r b-l b-t feature-cell">
                <div className="feature-icon">
                  <i className="os-icon os-icon-fingerprint" />
                </div>
                <h6 className="feature-title">Unique Design</h6>
                <div className="feature-text">
                  Gone studies to titles have audiences of and concepts was
                  motivator, the this more picture a to we ever the taken have
                  brilliant. Explain on woman concept readiness way.
                </div>
              </div>
              <div className="col-xl-4 col-sm-6 b-r b-l feature-cell">
                <div className="feature-icon">
                  <i className="os-icon os-icon-fingerprint" />
                </div>
                <h6 className="feature-title">Unique Design</h6>
                <div className="feature-text">
                  Gone studies to titles have audiences of and concepts was
                  motivator, the this more picture a to we ever the taken have
                  brilliant. Explain on woman concept readiness way.
                </div>
              </div>
              <div className="col-xl-4 col-sm-6 b-r feature-cell">
                <div className="feature-icon">
                  <i className="os-icon os-icon-mail-14" />
                </div>
                <h6 className="feature-title">Mail and Chat Layouts</h6>
                <div className="feature-text">
                  Gone studies to titles have audiences of and concepts was
                  motivator, the this more picture a to we ever the taken have
                  brilliant. Explain on woman concept readiness way.
                </div>
              </div>
              <div className="col-xl-4 col-sm-6 b-l feature-cell">
                <div className="feature-icon">
                  <i className="os-icon os-icon-ui-44" />
                </div>
                <h6 className="feature-title">All in one solution</h6>
                <div className="feature-text">
                  Gone studies to titles have audiences of and concepts was
                  motivator, the this more picture a to we ever the taken have
                  brilliant. Explain on woman concept readiness way.
                </div>
              </div>
              <div className="col-xl-4 col-sm-6 b-r b-l feature-cell">
                <div className="feature-icon">
                  <i className="os-icon os-icon-cv-2" />
                </div>
                <h6 className="feature-title">Gorgeous User Profiles</h6>
                <div className="feature-text">
                  Gone studies to titles have audiences of and concepts was
                  motivator, the this more picture a to we ever the taken have
                  brilliant. Explain on woman concept readiness way.
                </div>
              </div>
              <div className="col-xl-4 col-sm-6 b-r feature-cell">
                <div className="feature-icon">
                  <i className="os-icon os-icon-crown" />
                </div>
                <h6 className="feature-title">Elite Author</h6>
                <div className="feature-text">
                  Gone studies to titles have audiences of and concepts was
                  motivator, the this more picture a to we ever the taken have
                  brilliant. Explain on woman concept readiness way.{' '}
                </div>
              </div>
              <div className="col-xl-4 col-sm-6 b-r feature-cell">
                <div className="feature-icon">
                  <i className="os-icon os-icon-crown" />
                </div>
                <h6 className="feature-title">Elite Author</h6>
                <div className="feature-text">
                  Gone studies to titles have audiences of and concepts was
                  motivator, the this more picture a to we ever the taken have
                  brilliant. Explain on woman concept readiness way.{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
