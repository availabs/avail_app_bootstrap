import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { Link } from 'react-router-dom';
import relay from '../relay.js';

export default function Region(props) {
  const q = graphql`
    query RegionStationsQuery(
      $locCond: StationLocationDatumCondition!
      $regCond: RegionsToStationCondition!
    ) {
      allStationLocationData(condition: $locCond) {
        edges {
          node {
            stationId
            muni
            tdvRoute
            begindesc
            enddesc
          }
        }
      }
      allRegionsToStations(condition: $regCond) {
        edges {
          node {
            stationId
            tableName
          }
        }
      }
    }
  `;

  const { region } = props.match.params;

  return (
    <div>
      <h1>region: {region}</h1>
      <QueryRenderer
        environment={relay}
        query={q}
        variables={{ locCond: { region }, regCond: { region } }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            const d = props.allRegionsToStations.edges.reduce(
              (acc, { node: n }) => {
                (acc[n.stationId] || (acc[n.stationId] = [])).push(n.tableName);
                return acc;
              },
              {}
            );

            const stationLocations = props.allStationLocationData.edges.reduce(
              (acc, { node: n }) => {
                acc[n.stationId] = n.tdvRoute
                  ? `${n.muni}: ${n.tdvRoute} from ${n.begindesc} to ${n.enddesc}`
                  : '';
                return acc;
              },
              {}
            );

            const list = Object.keys(d)
              .sort()
              .map(stationId => (
                <tr>
                  <th>
                    <Link to={`/station-info/${stationId}`}>{stationId}</Link>
                  </th>
                  <td>{stationLocations[stationId]}</td>
                </tr>
              ));
            return (
              <div>
                <h1>{Object.keys(props)}</h1>
                <table>{list}</table>
              </div>
            );
          }
          return <div>Loading</div>;
        }}
      />
    </div>
  );
}
