import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../../relay.js';

// https://github.com/facebook/relay/issues/1851

const q = graphql`
  query ShortCountSpeedForStationQuery($condition: ShortCountSpeedCondition!) {
    allShortCountSpeeds(condition: $condition) {
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
          speedLimit
          year
          month
          day
          dayOfWeek
          federalDirection
          laneCode
          lanesInDirection
          collectionInterval
          dataInterval
          bin1
          bin2
          bin3
          bin4
          bin5
          bin6
          bin7
          bin8
          bin9
          bin10
          bin11
          bin12
          bin13
          bin14
          bin15
          unclassified
          total
          flagField
          batchId
        }
      }
    }
  }
`;

export default function ShortCountSpeedForStation(props) {
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
