import React from 'react';
import './AvgWdyVehicleClassificationTableDescription.css';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../../relay.js';

// https://github.com/facebook/relay/issues/1851

export default function AvgWdyVehicleClassificationTableDescription(props) {
  const q = graphql`
    query AvgWdyVehicleClassificationTableDescriptionQuery {
      __type(name: "AverageWeekdayVehicleClassification") {
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
      <h1>Average Weekday Vehicle Classification Table Description</h1>
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
