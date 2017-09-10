import React from 'react';
import BreadcrumbBar from '../components/layout/BreadcrumbBar';
import { QueryRenderer, graphql } from 'react-relay';
import { Link } from 'react-router-dom';
import relay from '../relay.js';

// https://github.com/facebook/relay/issues/1851

export default function Region(props) {
  const q = graphql`
    query RegionStationsQuery($condition: RegionsToStationCondition!) {
      allRegionsToStations(condition: $condition) {
        edges {
          node {
            stationId
            tableName
          }
        }
      }
    }
  `;

  const { region } = props.match.params;

  return (
    <div className="content-w">
      <BreadcrumbBar
        items={[
          { text: 'Regions', link: '/' },
          { text: region, link: `/region/${region}` }
        ]}
      />
      <div className="content-i">
        <div className="content-box">
          <div className="row">
            <div className="col-lg-12">
              <div className="element-wrapper">
                <h6 className="element-header">Region: {region}</h6>
                <QueryRenderer
                  environment={relay}
                  query={q}
                  variables={{ condition: { region } }}
                  render={({ error, props }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    } else if (props) {
                      // const d = props.allRegionsToStations.edges;
                      const d = props.allRegionsToStations.edges.reduce(
                        (acc, { node: n }) => {
                          (acc[n.stationId] || (acc[n.stationId] = []))
                            .push(n.tableName);
                          return acc;
                        },
                        {}
                      );

                      const list = Object.keys(d)
                        .sort()
                        .map(stationId =>
                          Array.prototype.concat(
                            <dt>{stationId}</dt>,
                            d[stationId].sort().map(table => (
                              <dd>
                                <Link
                                  to={`/${table.replace(
                                    /_/g,
                                    '-'
                                  )}-for-station/${stationId}`}
                                >
                                  {table}
                                </Link>
                              </dd>
                            ))
                          )
                        );
                      return (
                        <div>
                          <h1>{Object.keys(props)}</h1>
                          <dl>{list}</dl>
                        </div>
                      );
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
