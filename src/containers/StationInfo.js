import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { Link } from 'react-router-dom';
import relay from '../relay.js';

// https://github.com/facebook/relay/issues/1851
// http://ftp.dot.ny.gov/tdv/YR2010/Other/Class/R01/11_Albany/11_0009_ClassAverageReport.pdf

const locDataCols = [
  'stationId',
  'latitude',
  'longitude',
  'region',
  'regionCode',
  'countyCode',
  'muni',
  'tdvRoute',
  'begindesc',
  'enddesc'
];

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
            const locData = props.allStationLocationData.edges[0].node;

            const locDataDL = locDataCols.map(col => (
              <tr>
                <th>{col}</th>
                <td>{locData[col]}</td>
              </tr>
            ));

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

            const tablesInfo = Object.keys(summary)
              .sort()
              .map(tableName => (
                <table>
                  <tr>
                    <th>
                      <Link
                        to={`/${tableName.replace(
                          /_/g,
                          '-'
                        )}-for-station/${stationId}`}
                      >
                        {tableName}
                      </Link>
                    </th>
                  </tr>
                  <tr>
                    <th>Number of records</th>
                    <td>{summary[tableName].count}</td>
                  </tr>
                  <tr>
                    <th>Earliest Record</th>
                    <td>{summary[tableName].minDate}</td>
                  </tr>
                  <tr>
                    <th>Latest Record</th>
                    <td>{summary[tableName].maxDate}</td>
                  </tr>
                </table>
              ));

            return (
              <div>
                <h2>Station Location Data</h2>
                <table>{locDataDL}</table>
                <h2>Data</h2>
                {tablesInfo}
              </div>
            );
          }
          return <div>Loading</div>;
        }}
      />
    </div>
  );
}
