import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { Link } from 'react-router-dom';
import BreadcrumbBar from '../components/layout/BreadcrumbBar';
import relay from '../relay.js';

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
      <div className="content-i">
        <div className="content-box">
          <div className="row">
            <div className="col-lg-7">
              <div className="element-wrapper">
                <h6 className="element-header">Regions</h6>

                <QueryRenderer
                  environment={relay}
                  query={q}
                  render={({ error, props }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    } else if (props) {
                      const {
                        regionStationsCount,
                        regionYearlyCounts
                      } = parser(props);
                      console.log(regionStationsCount);
                      const list = props.allNysdotRegionNames.edges
                        .reduce((acc, { node: n }) => {
                          console.log(n.name);
                          acc.push(n);
                          return acc;
                        }, [])
                        .map(({ region, name }) => (
                          <div className="project-box">
                            <div className="project-head">
                              <div className="project-title">
                                <Link to={`/region/${region}`}>
                                  <h5>{name}</h5>
                                </Link>
                              </div>
                            </div>
                            <div className="project-info">
                              <pre>
                                {JSON.stringify(
                                  regionStationsCount[region],
                                  null,
                                  4
                                )}
                              </pre>
                              <pre>
                                {JSON.stringify(
                                  regionYearlyCounts[region],
                                  null,
                                  4
                                )}
                              </pre>

                              <div className="row align-items-center">
                                <div className="col-sm-5">
                                  <div className="row">
                                    <div className="col-6">
                                      <div className="el-tablo highlight">
                                        <div className="label">Open tasks</div>
                                        <div className="value">15</div>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="el-tablo highlight">
                                        <div className="label">
                                          Contributors
                                        </div>
                                        <div className="value">24</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ));
                      return <div className="projects-list">{list}</div>;
                    }
                    return <div>Loading</div>;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
