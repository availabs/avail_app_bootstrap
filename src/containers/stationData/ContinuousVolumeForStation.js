import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../../relay.js';

// https://github.com/facebook/relay/issues/1851

const q = graphql`
  query ContinuousVolumeForStationQuery(
    $condition: ContinuousVolumeCondition!
  ) {
    allContinuousVolumes(first: 10, condition: $condition) {
      edges {
        node {
          rc
          station
          region
          dotid
          ccid
          fc
          route
          roadname
          county
          countyFips
          beginDesc
          endDesc
          stationId
          road
          oneWay
          year
          month
          day
          dow
          i1
          i2
          i3
          i4
          i5
          i6
          i7
          i8
          i9
          i10
          i11
          i12
          i13
          i14
          i15
          i16
          i17
          i18
          i19
          i20
          i21
          i22
          i23
          i24
        }
      }
    }
  }
`;

export default function ContinuousVolumeForStation(props) {
  let { stationId } = props.match.params;

  stationId = stationId.replace(/_/, '');

  return (
    <div>
      <h1>stationId: {stationId}</h1>
      <QueryRenderer
        environment={relay}
        query={q}
        variables={{ condition: { stationId } }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return (
              <div>
                <h1>First 10 {Object.keys(props)}</h1>
                <pre>{JSON.stringify(props, null, 4)}</pre>
              </div>
            );
          }
          return <div>Loading</div>;
        }}
      />
    </div>
  );
}
