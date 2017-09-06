import React from 'react';
import './AvgWdyVolumeTableDescription.css';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../relay.js';

export default function AvgWdyVolumeTableDescription(props) {
  const q = graphql`
    query AvgWdyVolumeTableDescriptionQuery {
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
            return <div>{JSON.stringify(props, null, 4)}</div>;
          }
          return <div>Loading</div>;
        }}
      />
    </div>
  );
}
