import React, { Component } from 'react';
class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasGeolocation: 'geolocation' in navigator,
      latitude: null,
      longitude: null
    };
  }

  componentDidMount() {
    if (this.state.hasGeolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    }
  }

  render() {
    console.log('state:', this.state);
    return (
      <div className="content-w">
        <div className="content-i">
          <div className="content-box">
            <div className="row">
              <div className="col-lg-12">
                <div className="element-wrapper">
                  <h6 className="element-header">Location</h6>
                  <h1>Location</h1>
                  <table>
                    <tr>
                      <th>Latitude</th>
                      <td>{this.state.latitude}</td>
                    </tr>
                    <tr>
                      <th>Longitude</th>
                      <td>{this.state.longitude}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Location;
