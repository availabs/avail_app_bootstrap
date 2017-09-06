/**
 * @flow
 * @relayHash c6c67d55f57f4192545b65126c2ad070
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type StationInfoTestQueryResponse = {|
  +allDaysOfWeeks: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: {|
        +dayOfWeek: ?"SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
      |};
    |}>;
  |};
|};
*/

/*
query StationInfoTestQuery {
  allDaysOfWeeks {
    edges {
      node {
        dayOfWeek
      }
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  fragment: {
    argumentDefinitions: [],
    kind: 'Fragment',
    metadata: null,
    name: 'StationInfoTestQuery',
    selections: [
      {
        kind: 'LinkedField',
        alias: null,
        args: null,
        concreteType: 'DaysOfWeeksConnection',
        name: 'allDaysOfWeeks',
        plural: false,
        selections: [
          {
            kind: 'LinkedField',
            alias: null,
            args: null,
            concreteType: 'DaysOfWeeksEdge',
            name: 'edges',
            plural: true,
            selections: [
              {
                kind: 'LinkedField',
                alias: null,
                args: null,
                concreteType: 'DaysOfWeek',
                name: 'node',
                plural: false,
                selections: [
                  {
                    kind: 'ScalarField',
                    alias: null,
                    args: null,
                    name: 'dayOfWeek',
                    storageKey: null
                  }
                ],
                storageKey: null
              }
            ],
            storageKey: null
          }
        ],
        storageKey: null
      }
    ],
    type: 'Query'
  },
  id: null,
  kind: 'Batch',
  metadata: {},
  name: 'StationInfoTestQuery',
  query: {
    argumentDefinitions: [],
    kind: 'Root',
    name: 'StationInfoTestQuery',
    operation: 'query',
    selections: [
      {
        kind: 'LinkedField',
        alias: null,
        args: null,
        concreteType: 'DaysOfWeeksConnection',
        name: 'allDaysOfWeeks',
        plural: false,
        selections: [
          {
            kind: 'LinkedField',
            alias: null,
            args: null,
            concreteType: 'DaysOfWeeksEdge',
            name: 'edges',
            plural: true,
            selections: [
              {
                kind: 'LinkedField',
                alias: null,
                args: null,
                concreteType: 'DaysOfWeek',
                name: 'node',
                plural: false,
                selections: [
                  {
                    kind: 'ScalarField',
                    alias: null,
                    args: null,
                    name: 'dayOfWeek',
                    storageKey: null
                  }
                ],
                storageKey: null
              }
            ],
            storageKey: null
          }
        ],
        storageKey: null
      }
    ]
  },
  text:
    'query StationInfoTestQuery {\n  allDaysOfWeeks {\n    edges {\n      node {\n        dayOfWeek\n      }\n    }\n  }\n}\n'
};

module.exports = batch;
