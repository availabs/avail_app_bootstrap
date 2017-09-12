import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { Link } from 'react-router-dom';
import BreadcrumbBar from '../components/layout/BreadcrumbBar';
import SparkBar from '../components/graphs/SparkBar';
import relay from '../relay.js';

const colors = [
  '#4575b4',
  '#74add1',
  '#abd9e9',
  '#e0f3f8',
  '#fee090',
  '#fdae61',
  '#f46d43',
  '#d73027'
];
function parser(d) {
  const {
    allRegionStationsCounts: regionStationsCounts,
    allRegionCountsPerYears: regionCountsPerYear
  } = d;

  const regionStationsCount = regionStationsCounts.edges.reduce(
    (acc, { node: n }) => {
      const r = acc[n.region] || (acc[n.region] = {});
      r[n.countType] = n.stationsCount;
      return acc;
    },
    {}
  );

  const regionYearlyCounts = regionCountsPerYear.edges.reduce(
    (acc, { node: n }) => {
      const r = acc[n.region] || (acc[n.region] = {});
      (r[n.year] || (r[n.year] = {}))[n.countType] = n.totalCounts;

      return acc;
    },
    {}
  );

  return { regionStationsCount, regionYearlyCounts };
}

const q = graphql`
  query AllRegionNamesQuery {
    allNysdotRegionNames {
      edges {
        node {
          region
          name
        }
      }
    }
    allRegionStationsCounts {
      edges {
        node {
          region
          stationsCount
          countType
        }
      }
    }
    allRegionCountsPerYears {
      edges {
        node {
          region
          year
          countType
          totalCounts
        }
      }
    }
  }
`;

export default function AllRegionNames(props) {
  return (
    <div className="content-w">
      <BreadcrumbBar items={[{ text: 'Regions', link: '/' }]} />
      <QueryRenderer
        environment={relay}
        query={q}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            const { regionStationsCount, regionYearlyCounts } = parser(props);
            const regions = props.allNysdotRegionNames.edges.reduce(
              (acc, { node: n }) => {
                //console.log(n.name);
                acc.push(n);
                return acc;
              },
              []
            );

            const stateWideStations = Object.keys(
              regionStationsCount
            ).reduce((prev, region) => {
              Object.keys(regionStationsCount[region]).forEach(stationType => {
                if (!prev[stationType]) {
                  prev[stationType] = 0;
                }
                prev[stationType] += +regionStationsCount[region][stationType];
              });
              return prev;
            }, {});

            const stateWideYears = Object.keys(
              regionYearlyCounts
            ).reduce((prev, region) => {
              Object.keys(regionYearlyCounts[region]).forEach(year => {
                // if (!prev[year]) { prev[year] = {} }
                Object.keys(
                  regionYearlyCounts[region][year]
                ).forEach(countType => {
                  if (!prev[countType]) {
                    prev[countType] = {};
                  }
                  if (!prev[countType][year]) {
                    prev[countType][year] = 0;
                  }
                  prev[countType][year] += +regionYearlyCounts[region][year][
                    countType
                  ];
                });
              });
              return prev;
            }, {});

            // const stateWideChartData = Object.keys(stateWideYears)
            //   .reduce((prev, year) => {
            //     prev[year] = Object.keys(stateWideYears[year])
            //       .map(countType => {

            //       })
            //   },{})

            const list = regions.map(({ region, name }, i) => {
              var chartData = Object.keys(
                regionYearlyCounts[region]
              ).map(year => {
                return {
                  x: year,
                  y: +regionYearlyCounts[region][year].SHORT_COUNT_VOLUME
                };
              });
              return (
                <div className="project-box" key={i}>
                  <div className="project-head">
                    <div className="project-title">
                      <Link to={`/region/${region}`}>
                        <h5>{name}</h5>
                      </Link>
                    </div>
                  </div>
                  <div className="project-info">
                    <div className="row align-items-center">
                      <div className="col-sm-7">
                        <div className="row">
                          <div className="col-6">
                            <div className="el-tablo highlight">
                              <div className="label">Short Count Stations</div>
                              <div className="value">
                                {(+regionStationsCount[region]
                                  .AVERAGE_WEEKDAY).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="el-tablo highlight">
                              <div className="label">Cont. Count Stations</div>
                              <div className="value">
                                {regionStationsCount[
                                  region
                                ].CONTINUOUS.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-5">
                        <SparkBar
                          data={chartData}
                          label="SHORT COUNTS COLLECTED"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            }); // end map
            return (
              <div className="content-i">
                <div className="content-box">
                  <div className="row">
                    <div className="col-lg-7">
                      <div className="element-wrapper">
                        <h6 className="element-header">Regions</h6>
                        <div className="projects-list">{list}</div>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="projects-list">
                        <div className="project-box">
                          <div className="project-head">
                            <div className="project-title">
                              <h5>NEW YORK STATE OVERVIEW</h5>
                            </div>
                          </div>
                          <div className="project-info">
                            <div className="col-sm-12">
                              <div className="row">
                                <div className="col-6">
                                  <div className="el-tablo highlight">
                                    <div className="label">
                                      Short Count Stations
                                    </div>
                                    <div className="value">
                                      {stateWideStations.AVERAGE_WEEKDAY.toLocaleString()}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="el-tablo highlight">
                                    <div className="label">
                                      Cont. Count Stations
                                    </div>
                                    <div className="value">
                                      {stateWideStations.CONTINUOUS.toLocaleString()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="project-title">
                                <h5>COUNTS COLLECTED BY TYPE</h5>
                              </div>
                              {Object.keys(stateWideYears)
                                .filter(
                                  countType =>
                                    countType.indexOf('SHORT_COUNT') !== -1
                                )
                                .map((countType, i) => {
                                  const countChartData = Object.keys(
                                    stateWideYears[countType]
                                  ).map(year => {
                                    return {
                                      x: year,
                                      y: +stateWideYears[countType][year]
                                    };
                                  });
                                  return (
                                    <div className="row">
                                      <div className="col-12">
                                        <SparkBar
                                          color={colors[i]}
                                          data={countChartData}
                                          label={countType}
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div className="content-i">
              <div className="content-box">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="element-wrapper">
                      <h6 className="element-header">Regions</h6>
                      <div>Loading</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}

// <pre>
//   {JSON.stringify(
//     regionStationsCount[region],
//     null,
//     4
//   )}
// </pre>
// <pre>
//   {JSON.stringify(
//     regionYearlyCounts[region],
//     null,
//     4
//   )}
// </pre>
