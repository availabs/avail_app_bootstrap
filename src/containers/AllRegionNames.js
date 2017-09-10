import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { Link } from 'react-router-dom';
import BreadcrumbBar from '../components/layout/BreadcrumbBar';
import relay from '../relay.js';

export default function AllRegionNames(props) {
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
    }
  `;

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
                      const list = props.allNysdotRegionNames.edges
                        .reduce((acc, { node: n }) => {
                          console.log(n.name);
                          acc[n.region] = n.name;
                          return acc;
                        }, [])
                        .map((r, i) => (
                          <div className="project-box">
                            <div className="project-head">
                              <div className="project-title">
                                <Link to={`/region/${i}`}>
                                  <h5>{r}</h5>
                                </Link>
                              </div>
                            </div>
                            <div className="project-info">
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
