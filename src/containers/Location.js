import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../relay.js';

const q = graphql`
  query LocationNearestStationsQuery($qLon: Float, $qLat: Float) {
    searchNNearestShortCountStations(qLon: $qLon, qLat: $qLat) {
      edges {
        node
      }
    }
    searchContainingCounty(qLon: $qLon, qLat: $qLat) {
      edges {
        node {
          name
          region
          fips
        }
      }
    }
    searchContainingCityTown(qLon: $qLon, qLat: $qLat) {
      edges {
        node {
          name
          county
          muniType
        }
      }
    }
    searchContainingVillage(qLon: $qLon, qLat: $qLat) {
      edges {
        node {
          name
          county
        }
      }
    }
  }
`;

function parser(d) {
  const {
    searchNNearestShortCountStations: nNearestStationsResult,
    searchContainingCounty: containingCounty,
    searchContainingCityTown: containingCityTown,
    searchContainingVillage: containingVillage
  } = d;

  const county =
    containingCounty &&
    containingCounty.edges &&
    containingCounty.edges.length &&
    containingCounty.edges[0].node;

  const cityTown =
    containingCityTown &&
    containingCityTown.edges &&
    containingCityTown.edges.length &&
    containingCityTown.edges[0].node;

  const village =
    containingVillage &&
    containingVillage.edges &&
    containingVillage.edges.length &&
    Object.assign({}, containingVillage.edges[0].node, {
      muniType: 'village'
    });

  const nNearestStations =
    nNearestStationsResult &&
    nNearestStationsResult.edges &&
    nNearestStationsResult.edges.length &&
    nNearestStationsResult.edges.reduce((acc, { node: n }) => {
      acc.push(n);
      return acc;
    }, []);

  return { nNearestStations, county, cityTown, village };
}

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
                        const {
                          nNearestStations,
                          county,
                          village,
                          cityTown
                        } = parser(props);

                        return (
                          <div>
                            {county ? (
                              <pre>{JSON.stringify(county, null, 4)}</pre>
                            ) : (
                              ''
                            )}
                            {cityTown ? (
                              <pre>{JSON.stringify(cityTown, null, 4)}</pre>
                            ) : (
                              ''
                            )}
                            {village ? (
                              <pre>{JSON.stringify(village, null, 4)}</pre>
                            ) : (
                              ''
                            )}
                            {nNearestStations ? (
                              <pre>
                                {JSON.stringify(nNearestStations, null, 4)}
                              </pre>
                            ) : (
                              ''
                            )}
                          </div>
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
