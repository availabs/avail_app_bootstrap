import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../relay.js';

// https://github.com/facebook/relay/issues/1851

export default function StationInfo(props) {
  const q = graphql`
    query StationInfoShortCountSpeedQuery(
      $condition: AverageWeekdaySpeedCondition!
    ) {
      allAverageWeekdaySpeeds(condition: $condition) {
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
            dayOfFirstData
            federalDirection
            fullCount
            avgWkdayBin1
            avgWkdayBin2
            avgWkdayBin3
            avgWkdayBin4
            avgWkdayBin5
            avgWkdayBin6
            avgWkdayBin7
            avgWkdayBin8
            avgWkdayBin9
            avgWkdayBin10
            avgWkdayBin11
            avgWkdayBin12
            avgWkdayBin13
            avgWkdayBin14
            avgWkdayBin15
            avgWkdayUnclassified
            avgWkdayTotals
            avgSpeed
            fiftythPercentileSpeed
            eightyfivethPercentileSpeed
            percentileExceeding55
            percentileExceeding65
            flagField
            batchId
          }
        }
      }
    }
  `;

  const { rcStation } = props.match.params;

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
                {JSON.stringify(props, null, 4)}
              </div>
            );
          }
          return <div>Loading</div>;
        }}
      />
    </div>
  );
}
