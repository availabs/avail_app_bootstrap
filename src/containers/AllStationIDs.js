import React from 'react';
import './AllStationIDs.css';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../relay.js';

// https://github.com/facebook/relay/issues/1851

export default function AllStationIDs(props) {
  const q = graphql`
    query AllStationIDsQuery {
      allAverageWeekdaySpeeds {
        edges {
          node {
            rcStation
          }
        }
      }
    }
  `;

  return (
    <div>
      <h1>All Average Weekday Speeds Station IDs</h1>
      <QueryRenderer
        environment={relay}
        query={q}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return (
              <div>
                {JSON.stringify(
                  props.allAverageWeekdaySpeeds.edges
                    .map(e => e.node.rcStation)
                    .sort(),
                  null,
                  4
                )}
              </div>
            );
          }
          return <div>Loading</div>;
        }}
      />
    </div>
  );
}
