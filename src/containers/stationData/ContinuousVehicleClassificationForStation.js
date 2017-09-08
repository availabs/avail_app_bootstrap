import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../../relay.js';

// https://github.com/facebook/relay/issues/1851

const q = graphql`
  query ContinuousVehicleClassificationForStationQuery(
    $condition: ContinuousVehicleClassificationCondition!
  ) {
    allContinuousVehicleClassifications(first: 10, condition: $condition) {
      edges {
        node {
          rc
          station
          region
          dotid
          ccid
          fc
          route
          roadname
          county
          countyFips
          beginDesc
          endDesc
          stationId
          road
          oneWay
          year
          month
          day
          dow
          hour
          f1
          f2
          f3
          f4
          f5
          f6
          f7
          f8
          f9
          f10
          f11
          f12
          f13
        }
      }
    }
  }
`;

export default function ContinuousVehicleClassificationForStation(props) {
  let { stationId } = props.match.params;

  stationId = stationId.replace(/_/, '');

  return (
    <div>
      <h1>stationId: {stationId}</h1>
      <QueryRenderer
        environment={relay}
        query={q}
        variables={{ condition: { stationId } }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return (
              <div>
                <h1>First 10 {Object.keys(props)}</h1>
                <pre>{JSON.stringify(props, null, 4)}</pre>
              </div>
            );
          }
          return <div>Loading</div>;
        }}
      />
    </div>
  );
}
