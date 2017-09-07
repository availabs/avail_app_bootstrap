import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../relay.js';

// https://github.com/facebook/relay/issues/1851

export default function Region(props) {
  const q = graphql`
    query RegionStationsQuery($condition: RegionsToStationCondition!) {
      allRegionsToStations(condition: $condition) {
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
        variables={{ condition: { region } }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            // const d = props.allRegionsToStations.edges;
            const d = props.allRegionsToStations.edges.reduce(
              (acc, { node: n }) => {
                (acc[n.stationId] || (acc[n.stationId] = [])).push(n.tableName);
                return acc;
              },
              {}
            );

            const list = Object.keys(d)
              .sort()
              .map(stationId =>
                Array.prototype.concat(
                  <dt>{stationId}</dt>,
                  d[stationId].sort().map(table => <dd>{table}</dd>)
                )
              );
            return (
              <div>
                <h1>{Object.keys(props)}</h1>
                <dl>{list}</dl>
              </div>
            );
          }
          return <div>Loading</div>;
        }}
      />
    </div>
  );
}
