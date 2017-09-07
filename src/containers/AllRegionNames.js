import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { Link } from 'react-router-dom';
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
    <div>
      <h1>All Region Names</h1>
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
                <li>
                  <Link to={`/region/${i}`}>{r} </Link>
                </li>
              ));
            return <ol>{list}</ol>;
          }
          return <div>Loading</div>;
        }}
      />
    </div>
  );
}
