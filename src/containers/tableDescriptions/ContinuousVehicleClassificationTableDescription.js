import React from 'react';
import './ContinuousVehicleClassificationTableDescription.css';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../../relay.js';

// https://github.com/facebook/relay/issues/1851

export default function ContinuousVehicleClassificationTableDescription(props) {
  const q = graphql`
    query ContinuousVehicleClassificationTableDescriptionQuery {
      __type(name: "ContinuousVehicleClassification") {
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
      <h1>Continuous Vehicle Classifications Table Description</h1>
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
