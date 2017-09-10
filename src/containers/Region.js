import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { Link } from 'react-router-dom';
import relay from '../relay.js';

const defaultNestingOrder = ['countyCode', 'functionalClass', 'factorGroup']; //allow hierarchy by factorGroup via toggle

const sorters = {
  functionalClass: (a, b) => +a - +b,
  countyCode: null,
  factorGroup: null
};

const q = graphql`
  query RegionStationsQuery(
    $ctyCond: NysCountyCondition!
    $metaCond: StationMetadatumCondition!
    $locCond: StationLocationDatumCondition!
  ) {
    allNysdotSeasonalAdjustmentFactorGroupDescriptions {
      edges {
        node {
          factorGroup
          shortDescription
          longDescription
        }
      }
    }
    allNysdotFunctionalClassificationCodeDescriptions {
      edges {
        node {
          code
          distinctor
          description
        }
      }
    }
    allNysCounties(condition: $ctyCond) {
      edges {
        node {
          rc
          name
        }
      }
    }
    allStationLocationData(condition: $locCond) {
      edges {
        node {
          stationId
          muni
          tdvRoute
          begindesc
          enddesc
        }
      }
    }
    allStationMetadata(condition: $metaCond) {
      edges {
        node {
          stationId
          countyCode
          functionalClass
          factorGroup
        }
      }
    }
  }
`;

function parser(d, nestingOrder = defaultNestingOrder) {
  const {
    allNysdotSeasonalAdjustmentFactorGroupDescriptions: adjustmentFactors,
    allNysdotFunctionalClassificationCodeDescriptions: functionalClassifications,
    allNysCounties: counties,
    allStationLocationData: stationLocationData,
    allStationMetadata: stationMetadata
  } = d;

  const decoder = {
    countyCode: counties.edges.reduce((acc, { node: n }) => {
      acc[n.rc] = `${n.name} County`;
      return acc;
    }, {}),

    functionalClass: functionalClassifications.edges.reduce(
      (acc, { node: n }) => {
        const { code, distinctor, description } = n;

        const prefix = distinctor
          .split('_')
          .pop()
          .split('')
          .map((c, i) => (i > 0 ? c.toLowerCase() : c))
          .join('');
        acc[code] = `Functional Class ${code}: ${prefix} ${description}`;
        return acc;
      },
      {}
    ),

    factorGroup: adjustmentFactors.edges.reduce((acc, { node: n }) => {
      // acc[n.factorGroup] = n.shortDescription;
      acc[n.factorGroup] = `Seasonal Factor Group ${n.factorGroup}`;
      return acc;
    }, {})
  };

  const stationLocations = stationLocationData.edges.reduce(
    (acc, { node: n }) => {
      const muni =
        n.muni &&
        n.muni
          .split(' ')
          .map(s =>
            s
              .split('')
              .map((c, i) => (i > 0 ? c.toLowerCase() : c))
              .join('')
          )
          .join(' ');
      acc[n.stationId] = n.tdvRoute
        ? `${muni}: ${n.tdvRoute} from ${n.begindesc} to ${n.enddesc}`
        : '';
      return acc;
    },
    {}
  );

  const stationData = stationMetadata.edges.reduce((acc, { node: n }) => {
    const [primary, secondary, tertiary] = [
      n[nestingOrder[0]],
      n[nestingOrder[1]],
      n[nestingOrder[2]]
    ];

    const p = acc[primary] || (acc[primary] = {});
    const s = p[secondary] || (p[secondary] = {});
    const t = s[tertiary] || (s[tertiary] = {});

    t[n.stationId] = stationLocations[n.stationId];

    return acc;
  }, {});

  console.log(stationData);

  return { decoder, stationData };
}

export default function Region(props) {
  const { region } = props.match.params;
  const cond = { region };

  // Later offer a UI component that allows user to control nesting order.
  const nestingOrder = defaultNestingOrder;

  const [primary, secondary, tertiary] = nestingOrder;

  return (
    <div>
      <h1>Region {region}</h1>
      <QueryRenderer
        environment={relay}
        query={q}
        variables={{
          locCond: cond,
          metaCond: cond,
          ctyCond: cond
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            const { decoder, stationData } = parser(props, nestingOrder);

            // Ummm... yeah... I know.
            return (
              <ul>
                {Object.keys(stationData)
                  .sort(sorters[primary])
                  .reduce((accP, primaryKey) => {
                    const secondaryLevel = stationData[primaryKey];
                    accP.push(
                      <li>
                        <h3>{decoder[primary][primaryKey]}</h3>
                        <ul>
                          {Object.keys(secondaryLevel)
                            .sort(sorters[secondary])
                            .reduce((accS, secondaryKey) => {
                              const tertiaryLevel =
                                secondaryLevel[secondaryKey];
                              accS.push(
                                <li>
                                  <h4>{decoder[secondary][secondaryKey]}</h4>
                                  <ul>
                                    {Object.keys(tertiaryLevel)
                                      .sort(sorters[tertiary])
                                      .reduce((accT, tertiaryKey) => {
                                        const stationsInfo =
                                          tertiaryLevel[tertiaryKey];
                                        accT.push(
                                          <li>
                                            <h5>
                                              {decoder[tertiary][tertiaryKey]}
                                            </h5>
                                            <table>
                                              {Object.keys(stationsInfo)
                                                .sort()
                                                .reduce((accL, stationId) => {
                                                  const location =
                                                    stationsInfo[stationId];
                                                  accL.push(
                                                    <tr>
                                                      <th>
                                                        <Link
                                                          to={`/station-info/${stationId}`}
                                                        >
                                                          &nbsp;{stationId}
                                                        </Link>
                                                      </th>
                                                      <td>{location}</td>
                                                    </tr>
                                                  );
                                                  return accL;
                                                }, [])}
                                            </table>
                                          </li>
                                        );
                                        return accT;
                                      }, [])}
                                  </ul>
                                </li>
                              );
                              return accS;
                            }, [])}
                        </ul>
                      </li>
                    );

                    return accP;
                  }, [])}
              </ul>
            );
          }
          return <div>Loading</div>;
        }}
      />
    </div>
  );
}
