import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import AverageWeekdayVolumeForStation from './stationData/AverageWeekdayVolumeForStation';
import ShortCountVolumeForStation from './stationData/ShortCountVolumeForStation';
import BreadcrumbBar from '../components/layout/BreadcrumbBar';
import relay from '../relay.js';
import MiniMap from './MiniMap';

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

//https://stackoverflow.com/a/5786281/3970755
// function ConvertDDToDMS(D, lng) {
//   return {
//     dir: D < 0 ? (lng ? 'W' : 'S') : lng ? 'E' : 'N',
//     deg: 0 | (D < 0 ? (D = -D) : D),
//     min: 0 | ((D % 1) * 60),
//     sec: (0 | (((D * 60) % 1) * 6000)) / 100
//   };
// }

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

  const { stationId, countType, countSubtype } = props.match.params;
  const match = props.match;
  const noRight = props.noRight;
  console.log('noRight', noRight);
  return (
    <QueryRenderer
      environment={relay}
      query={q}
      variables={{ metaCond: { stationId }, locCond: { stationId } }}
      render={({ error, props }) => {
        if (error) {
          return <div>{error.message}</div>;
        } else if (props) {
          let count_types = [
            {
              text: 'AVERAGE WEEKDAY',
              active: !countType || countType === 'avg_weekday',
              disabled: true,
              link: `/station-info/${stationId}/avg_weekday/`
            },
            {
              text: 'SHORT COUNT',
              active: countType === 'short_count',
              disabled: true,
              link: `/station-info/${stationId}/short_count/`
            }
          ];
          let count_subTypes = [
            {
              text: 'VOLUME',
              active: !countSubtype || countSubtype === 'volume',
              disabled: true,
              link: `/station-info/${stationId}/${countType || 'short_count'}/`
            },
            {
              text: 'SPEED',
              active: countSubtype === 'speed',
              disabled: true,
              link: `/station-info/${stationId}/${countType ||
                'short_count'}/speed`
            },
            {
              text: 'CLASS',
              active: countSubtype === 'class',
              disabled: true,
              link: `/station-info/${stationId}/${countType ||
                'short_count'}/class`
            }
          ];
          let dataView = null;
          switch (countType) {
            case 'short_count':
              dataView = <ShortCountVolumeForStation match={match} />;
              break;
            case 'average_weekday':
              dataView = <AverageWeekdayVolumeForStation match={match} />;
              break;
            default:
              dataView = <AverageWeekdayVolumeForStation match={match} />;
          }
          const info = props.allStationMetadata.edges.reduce(
            (acc, { node: n }) => {
              const { tableName, count, minDate, maxDate } = n;

              const d = acc[tableName] || (acc[tableName] = {});

              (d.minDates || (d.minDates = [])).push(minDate);

              (d.maxDates || (d.maxDates = [])).push(maxDate);

              d.count = (d.count || 0) | count;
              console.log(
                'got data',
                tableName,
                tableName.indexOf('average_weekday')
              );
              if (
                count_types[1].disabled &&
                tableName.indexOf('short_count') !== -1
              ) {
                count_types[1].disabled = false;
              }
              if (
                count_types[0].disabled &&
                tableName.indexOf('average_weekday') !== -1
              ) {
                count_types[0].disabled = false;
              }
              return acc;
            },
            {}
          );
          const typeNav = <Navbar items={count_types} />;
          const subTypeNav = (
            <div className="element-box">
              <Navbar items={count_subTypes} />
            </div>
          );

          const locData = props.allStationLocationData.edges[0].node;

          const locDataDL = locDataCols.map(col => (
            <tr>
              <th>{col}</th>
              <td>{locData[col]}</td>
            </tr>
          ));
          let center = null;
          if (locData.latitude) {
            center = [locData.longitude, locData.latitude];
          }
          const summary = Object.entries(info).reduce((acc, [tableName, d]) => {
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
              <table key={tableName}>
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
          const rightPane = () => {
            if (noRight) return <span />;
            else {
              return (
                <div id="right-pane" className="col-lg-4">
                  <div className="element-wrapper">
                    <h6 className="element-header">Station Location Data</h6>
                    <div className="element-box">
                      <table>{locDataDL}</table>
                    </div>
                    <div id="mini-map" className="element-box">
                      <MiniMap center={center} id={stationId} />
                    </div>
                    <div className="element-box">{tablesInfo}</div>
                  </div>
                </div>
              );
            }
          };
          return (
            <div className="content-w">
              <BreadcrumbBar
                items={[
                  { text: 'Regions', link: '/' },
                  {
                    text: locData.region,
                    link: `/region/${locData.regionCode}`
                  },
                  {
                    text: `Station ${stationId}`,
                    link: `/region/${locData.regionCode}`
                  }
                ]}
              />
              <div className="content-i">
                <div className="content-box">
                  <div className="row">
                    <div className={noRight ? 'col-lg-12' : 'col-lg-8'}>
                      <div className="element-wrapper">
                        <h6 className="element-header">
                          Station {stationId}&nbsp;
                          <span style={{ fontWeight: 200 }}>
                            /&nbsp;{locData.muni}: {locData.tdvRoute} from{' '}
                            {locData.begindesc} to {locData.enddesc}
                          </span>
                        </h6>
                        {typeNav}
                        {dataView}
                      </div>
                    </div>
                    {rightPane()}
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return <div>Loading</div>;
      }}
    />
  );
}
