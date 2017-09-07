import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../../relay.js';

// https://github.com/facebook/relay/issues/1851

const q = graphql`
  query ShortCountVehicleClassificationForStationQuery(
    $condition: ShortCountVehicleClassificationCondition!
  ) {
    allShortCountVehicleClassifications(condition: $condition) {
      edges {
        node {
          rcStation
          countId
          rg
          regionCode
          countyCode
          stat
          rcsta
          functionalClass
          factorGroup
          latitude
          longitude
          specificRecorderPlacement
          channelNotes
          dataType
          blank
          year
          month
          day
          dayOfWeek
          federalDirection
          laneCode
          lanesInDirection
          collectionInterval
          dataInterval
          classF1
          classF2
          classF3
          classF4
          classF5
          classF6
          classF7
          classF8
          classF9
          classF10
          classF11
          classF12
          classF13
          unclassified
          total
          flagField
          batchId
        }
      }
    }
  }
`;

export default function ShortCountVehicleClassificationForStation(props) {
  let { stationId: rcStation } = props.match.params;

  return (
    <div>
      <h1>rcStation: {rcStation}</h1>
      <QueryRenderer
        environment={relay}
        query={q}
        variables={{ condition: { rcStation } }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return (
              <div>
                <h1>{Object.keys(props)}</h1>
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
