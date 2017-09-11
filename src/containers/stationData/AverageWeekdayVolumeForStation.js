import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import AvgWeekdayVol from '../../components/counts/AvgWeekdayVol';
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
      <QueryRenderer
        environment={relay}
        query={q}
        variables={{ condition: { rcStation } }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            let countObject = props.allAverageWeekdayVolumes.edges.reduce(
              (acc, { node: n }) => {
                let currentCount = acc[n.countId]
                  ? acc[n.countId]
                  : {
                      rcStation: n.rcStation,
                      rg: n.rg,
                      regionCode: n.regionCode,
                      countyCode: n.countyCode,
                      stat: n.stat,
                      rcsta: n.rcsta,
                      functionalClass: n.functionalClass,
                      factorGroup: n.factorGroup,
                      latitude: n.latitude,
                      longitude: n.longitude,
                      specificRecorderPlacement: n.specificRecorderPlacement,
                      channelNotes: n.channelNotes,
                      dataType: n.dataType,
                      vehicleAxleCode: n.vehicleAxleCode,
                      year: n.year,
                      month: n.month,
                      dayOfFirstData: n.dayOfFirstData,
                      federalDirection: {},
                      countId: n.countId,
                      batchId: n.batchId
                    };

                currentCount['federalDirection'][n.federalDirection] = {
                  federalDirection: n.federalDirection,
                  avgWkdayDailyTraffic: n.avgWkdayDailyTraffic,
                  seasonalFactor: n.seasonalFactor,
                  aadt: n.aadt,
                  count: Object.keys(n)
                    .filter(key => key.indexOf('avgWkdayInterval') !== -1)
                    .sort(
                      (a, b) =>
                        +a.split('avgWkdayInterval')[1] -
                        +b.split('avgWkdayInterval')[1]
                    )
                    .map(key => n[key])
                };

                acc[n.countId] = currentCount;
                return acc;
              },
              {}
            );

            var countsGraphs = Object.keys(countObject)
              .sort((a, b) => +countObject[b].year - +countObject[a].year)
              .map(countId => <AvgWeekdayVol data={countObject[countId]} />);

            return <div>{countsGraphs}</div>;
          }
          return <div>Loading</div>;
        }}
      />
    </div>
  );
}
