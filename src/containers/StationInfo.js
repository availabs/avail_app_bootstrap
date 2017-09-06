import React from 'react';
import './StationInfo.css';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../relay.js';

export default function StationInfo(props) {
  const q = graphql`
    query StationInfoTestQuery {
      allDaysOfWeeks {
        edges {
          node {
            dayOfWeek
          }
        }
      }
    }
  `;

  return (
    <QueryRenderer
      environment={relay}
      query={q}
      render={({ error, props }) => {
        if (error) {
          return <div>{error.message}</div>;
        } else if (props) {
          return <div>{JSON.stringify(props, null, 4)}</div>;
        }
        return <div>Loading</div>;
      }}
    />
  );
}
