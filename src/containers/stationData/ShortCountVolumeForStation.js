import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import relay from '../../relay.js';

// https://github.com/facebook/relay/issues/1851

const q = graphql`
  query ShortCountVolumeForStationQuery(
    $condition: ShortCountVolumeCondition!
  ) {
    allShortCountVolumes(first: 10, condition: $condition) {
      edges {
        node {
          rcStation
          countId
          rg
          regionCode
          countyCode
          stat
          rcsta
          functionalClass
          factorGroup
          latitude
          longitude
          specificRecorderPlacement
          channelNotes
          dataType
          vehicleAxleCode
          year
          month
          day
          dayOfWeek
          federalDirection
          laneCode
          lanesInDirection
          collectionInterval
          interval11
          interval12
          interval13
          interval14
          interval21
          interval22
          interval23
          interval24
          interval31
          interval32
          interval33
          interval34
          interval41
          interval42
          interval43
          interval44
          interval51
          interval52
          interval53
          interval54
          interval61
          interval62
          interval63
          interval64
          interval71
          interval72
          interval73
          interval74
          interval81
          interval82
          interval83
          interval84
          interval91
          interval92
          interval93
          interval94
          interval101
          interval102
          interval103
          interval104
          interval111
          interval112
          interval113
          interval114
          interval121
          interval122
          interval123
          interval124
          interval131
          interval132
          interval133
          interval134
          interval141
          interval142
          interval143
          interval144
          interval151
          interval152
          interval153
          interval154
          interval161
          interval162
          interval163
          interval164
          interval171
          interval172
          interval173
          interval174
          interval181
          interval182
          interval183
          interval184
          interval191
          interval192
          interval193
          interval194
          interval201
          interval202
          interval203
          interval204
          interval211
          interval212
          interval213
          interval214
          interval221
          interval222
          interval223
          interval224
          interval231
          interval232
          interval233
          interval234
          interval241
          interval242
          interval243
          interval244
          total
          flagField
          batchId
        }
      }
    }
  }
`;

export default function ShortCountVolumeForStation(props) {
  let { stationId: rcStation } = props.match.params;

  return (
    <div>
      <h1>rcStation: {rcStation}</h1>
      <QueryRenderer
        environment={relay}
        query={q}
        variables={{ condition: { rcStation } }}
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
