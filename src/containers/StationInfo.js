import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../relay.js';

// https://github.com/facebook/relay/issues/1851
// http://ftp.dot.ny.gov/tdv/YR2010/Other/Class/R01/11_Albany/11_0009_ClassAverageReport.pdf

export default function StationInfo(props) {
  const q = graphql`
    query StationInfoQuery(
      $metaCond: StationMetadatumCondition!
      $locCond: StationLocationDatumCondition!
    ) {
      allStationLocationData(condition: $locCond) {
        edges {
          node {
            stationId
            latitude
            longitude
            region
            regionCode
            countyCode
            muni
            tdvRoute
            begindesc
            enddesc
          }
        }
      }
      allStationMetadata(condition: $metaCond) {
        edges {
          node {
            tableName
            functionalClass
            factorGroup
            count
            minDate
            maxDate
          }
        }
      }
    }
  `;

  const { stationId } = props.match.params;

  return (
    <div>
      <h1>Station ID: {stationId}</h1>
      <QueryRenderer
        environment={relay}
        query={q}
        variables={{ metaCond: { stationId }, locCond: { stationId } }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            const info = props.allStationMetadata.edges.reduce(
              (acc, { node: n }) => {
                const { tableName, count, minDate, maxDate } = n;

                const d = acc[tableName] || (acc[tableName] = {});

                (d.minDates || (d.minDates = [])).push(minDate);

                (d.maxDates || (d.maxDates = [])).push(maxDate);

                d.count = (d.count || 0) | count;

                return acc;
              },
              {}
            );

            const summary = Object.entries(
              info
            ).reduce((acc, [tableName, d]) => {
              acc[tableName] = {
                minDate: d.minDates.sort().pop(),
                maxDate: d.maxDates.sort().pop(),
                count: d.count
              };

              return acc;
            }, {});

            return (
              <div>
                <h1>allStationLocationData</h1>
                <pre>
                  {JSON.stringify(props.allStationLocationData.edges, null, 4)}
                </pre>
                <h1>allStationMetadata</h1>
                <pre>{JSON.stringify(summary, null, 4)}</pre>
              </div>
            );
          }
          return <div>Loading</div>;
        }}
      />
    </div>
  );
}
