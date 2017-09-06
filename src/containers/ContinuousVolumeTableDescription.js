import React from 'react';
import './ContinuousVolumeTableDescription.css';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../relay.js';

// https://github.com/facebook/relay/issues/1851

export default function ContinuousVolumeTableDescription(props) {
  const q = graphql`
    query ContinuousVolumeTableDescriptionQuery {
      __type(name: "ContinuousVolume") {
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
      <h1>Continuous Volume Table Description</h1>
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