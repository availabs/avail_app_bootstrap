import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../../relay.js';

export default function AverageWeekdayVolumeTableDescription(props) {
  const q = graphql`
    query AverageWeekdayVolumeTableDescriptionQuery {
      __type(name: "AverageWeekdayVolume") {
        name
        description
        fields {
          name
          description
        }
      }
    }
  `;

  return (
    <div>
      <h1>Average Weekday Volume Table Description</h1>
      <QueryRenderer
        environment={relay}
        query={q}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return <pre>{JSON.stringify(props, null, 4)}</pre>;
          }
          return <div>Loading</div>;
        }}
      />
    </div>
  );
}
