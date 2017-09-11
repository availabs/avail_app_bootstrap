import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../relay.js';

function parser(d) {
  const { searchNNearestShortCountStations: nNearestStationsResult } = d;

  const nNearestStations = nNearestStationsResult.edges.reduce(
    (acc, { node: n }) => {
      acc.push(n);
      return acc;
    },
    []
  );

  return { nNearestStations };
}

const q = graphql`
  query LocationNearestStationsQuery($qLon: Float, $qLat: Float) {
    searchNNearestShortCountStations(qLon: $qLon, qLat: $qLat) {
      edges {
        node
      }
    }
  }
`;

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

                  <QueryRenderer
                    environment={relay}
                    query={q}
                    variables={{
                      qLon: this.state.longitude,
                      qLat: this.state.latitude
                    }}
                    render={({ error, props }) => {
                      if (error) {
                        return <div>{error.message}</div>;
                      } else if (props) {
                        const { nNearestStations } = parser(props);

                        return (
                          <pre>{JSON.stringify(nNearestStations, null, 4)}</pre>
                        );
                      }
                      return <div>Loading</div>;
                    }}
                  />
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
