import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../../relay.js';

// https://github.com/facebook/relay/issues/1851

const q = graphql`
  query AverageWeekdayVolumeForStationQuery(
    $condition: AverageWeekdayVolumeCondition!
  ) {
    allAverageWeekdayVolumes(condition: $condition) {
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
          vehicleAxleCode
          year
          month
          dayOfFirstData
          federalDirection
          fullCount
          avgWkdayInterval1
          avgWkdayInterval2
          avgWkdayInterval3
          avgWkdayInterval4
          avgWkdayInterval5
          avgWkdayInterval6
          avgWkdayInterval7
          avgWkdayInterval8
          avgWkdayInterval9
          avgWkdayInterval10
          avgWkdayInterval11
          avgWkdayInterval12
          avgWkdayInterval13
          avgWkdayInterval14
          avgWkdayInterval15
          avgWkdayInterval16
          avgWkdayInterval17
          avgWkdayInterval18
          avgWkdayInterval19
          avgWkdayInterval20
          avgWkdayInterval21
          avgWkdayInterval22
          avgWkdayInterval23
          avgWkdayInterval24
          avgWkdayDailyTraffic
          seasonalFactor
          axleFactor
          aadt
          highHourValue
          highHourInterval
          kFactor
          dFactor
          flagField
          batchId
        }
      }
    }
  }
`;

export default function AverageWeekdayVolumeForStation(props) {
  const { stationId: rcStation } = props.match.params;

  return (
    <div>
      <h1>rc_station: {rcStation}</h1>
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
