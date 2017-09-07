import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../../relay.js';

// https://github.com/facebook/relay/issues/1851

const q = graphql`
  query AverageWeekdayVehicleClassificationForStationQuery(
    $condition: AverageWeekdayVehicleClassificationCondition!
  ) {
    allAverageWeekdayVehicleClassifications(condition: $condition) {
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
          dayOfFirstData
          federalDirection
          fullCount
          avgWkdayF1s
          avgWkdayF2s
          avgWkdayF3s
          avgWkdayF4s
          avgWkdayF5s
          avgWkdayF6s
          avgWkdayF7s
          avgWkdayF8s
          avgWkdayF9s
          avgWkdayF10s
          avgWkdayF11s
          avgWkdayF12s
          avgWkdayF13s
          avgWkdayUnclassified
          avgWkdayTotals
          avgWkdayPercF313
          avgWkdayPercF413
          avgWkdayPercF47
          avgWkdayPercF813
          avgWkdayPercF1
          avgWkdayPercF2
          avgWkdayPercF3
          avgWkdayPercF4
          avgWkdayPercF57
          axleCorrectionFactor
          suPeak
          cuPeak
          suAadt
          cuAadt
          flagField
          batchId
        }
      }
    }
  }
`;

export default function AverageWeekdayVehicleClassificationForStation(props) {
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
