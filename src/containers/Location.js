import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../relay.js';

const N = 5;

const q = graphql`
  query LocationNearestStationsQuery($qLon: Float, $qLat: Float, $n: Int) {
    searchNearestNShortCountStations(qLon: $qLon, qLat: $qLat, n: $n) {
      edges {
        node {
          stationId
          region
          regionCode
          countyCode
          latitude
          longitude
          muni
          tdvRoute
          begindesc
          enddesc
          functionalClass
          factorGroup
          distanceFromLocationMeters
        }
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
    searchNearestNShortCountStations: nearestStations,
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

  let stations =
    nearestStations &&
    nearestStations.edges &&
    nearestStations.edges.length &&
    nearestStations.edges.reduce((acc, { node: n }) => {
      const distanceFromLocationMeters = Math.round(
        +n.distanceFromLocationMeters
      );
      acc.push(Object.assign({}, n, { distanceFromLocationMeters }));
      return acc;
    }, []);

  const seenIds = {};
  stations = stations
    .filter(s => {
      const seen = seenIds[s.stationId];
      if (seen) return false;
      return (seenIds[s.stationId] = true);
    })
    .sort(
      (s1, s2) => s1.distanceFromLocationMeters - s2.distanceFromLocationMeters
    );

  return { stations, county, cityTown, village };
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
    return (
      <div className="content-w">
        <div className="content-i">
          <div className="content-box">
            <div className="row">
              <div className="col-lg-12">
                <div className="element-wrapper">
                  <h6 className="element-header">Location</h6>
                  <QueryRenderer
                    environment={relay}
                    query={q}
                    variables={{
                      qLon: this.state.longitude,
                      qLat: this.state.latitude,
                      n: N
                    }}
                    render={({ error, props }) => {
                      if (error) {
                        return <div>{error.message}</div>;
                      } else if (props) {
                        const { stations, county, village, cityTown } = parser(
                          props
                        );

                        return (
                          <div className="element-wrapper">
                            <div className="element-box">
                              <div>
                                <div className="element-info">
                                  <h3 className="element-inner-header">
                                    Your Location Information
                                  </h3>
                                  <table className="table table-lightborder">
                                    <tr>
                                      <th>Latitude</th>
                                      <td>{this.state.latitude}</td>
                                    </tr>
                                    <tr>
                                      <th>Longitude</th>
                                      <td>{this.state.longitude}</td>
                                    </tr>
                                    <tr>
                                      <th>Region</th>
                                      <td>{county ? county.region : ''}</td>
                                    </tr>
                                    <tr>
                                      <th>County</th>
                                      <td>{county ? county.name : ''}</td>
                                    </tr>
                                    <tr>
                                      <th>County FIPS</th>
                                      <td>{county ? county.fips : ''}</td>
                                    </tr>
                                    <tr>
                                      <th>Municipality</th>
                                      <td>
                                        {village ? (
                                          `Village of ${village.name}`
                                        ) : cityTown ? (
                                          `${cityTown.muniType
                                            .split('')
                                            .map(
                                              (c, i) =>
                                                i === 0 ? c.toUpperCase() : c
                                            )
                                            .join('')} of ${cityTown.name}`
                                        ) : (
                                          ''
                                        )}
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                              <div>
                                <div className="element-info">
                                  <h3 className="element-inner-header">
                                    Nearest 5 Short Count Stations
                                  </h3>
                                  {
                                    // "muni": "TOWN OF NASSAU",
                                    // "stationId": "14_0001",
                                    // "regionCode": 1,
                                    // "countyCode": 4,
                                    // "latitude": 42.48866,
                                    // "longitude": -73.55701,
                                    // "region": 1,
                                    // "tdvRoute": "NY-66",
                                    // "begindesc": "Col/Rens Co Line",
                                    // "enddesc": "START 20/66 OLAP",
                                    // "functionalClass": 7,
                                    // "factorGroup": 40,
                                    // "distanceFromLocationMeters": 2049.08822572
                                  }
                                  {stations.map(stationInfo => (
                                    <div>
                                      <h4>{stationInfo.stationId}</h4>
                                      <table className="table table-lightborder">
                                        <tr>
                                          <th>Municipality</th>
                                          <td>{stationInfo.muni}</td>
                                        </tr>
                                        <tr>
                                          <th>Region Code</th>
                                          <td>{stationInfo.regionCode}</td>
                                        </tr>
                                        <tr>
                                          <th>County Code</th>
                                          <td>{stationInfo.countyCode}</td>
                                        </tr>
                                        <tr>
                                          <th>Latitude</th>
                                          <td>{stationInfo.latitude}</td>
                                        </tr>
                                        <tr>
                                          <th>Longitude</th>
                                          <td>{stationInfo.longitude}</td>
                                        </tr>
                                        <tr>
                                          <th>TDV Route</th>
                                          <td>{stationInfo.tdvRoute}</td>
                                        </tr>
                                        <tr>
                                          <th>Begin Description</th>
                                          <td>{stationInfo.begindesc}</td>
                                        </tr>
                                        <tr>
                                          <th>End Description</th>
                                          <td>{stationInfo.enddesc}</td>
                                        </tr>
                                        <tr>
                                          <th>Functional Class</th>
                                          <td>{stationInfo.functionalClass}</td>
                                        </tr>
                                        <tr>
                                          <th>Factor Group</th>
                                          <td>{stationInfo.factorGroup}</td>
                                        </tr>
                                        <tr>
                                          <th>Distance From Your Location</th>
                                          <td>
                                            {stationInfo.distanceFromLocationMeters}&nbsp;
                                            meters
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
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
