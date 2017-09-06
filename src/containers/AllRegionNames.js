import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../relay.js';

// https://github.com/facebook/relay/issues/1851

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
    <div>
      <h1>All Region Names</h1>
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
