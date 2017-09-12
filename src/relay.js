import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import fetch from 'isomorphic-fetch';

function fetchQuery(operation, variables) {
  console.log(operation);
  return fetch('https://trafficdata.availabs.org/api/traffic_data/graphql', {
    method: 'POST',
    headers: {
      // Add authentication and other headers here
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables
    })
  }).then(response => response.json());
}

export default new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource())
});
