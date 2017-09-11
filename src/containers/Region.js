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
    $regCond: RegionMetadatumCondition!
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
    allRegionMetadata(condition: $regCond) {
      edges {
        node {
          stationCount
          countType
          countyCode
          functionalClass
          factorGroup
          minDate
          maxDate
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
    allStationMetadata: stationMetadata,
    allRegionMetadata: regionMetadata
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

  const regionData = regionMetadata.edges.reduce((acc, { node: n }) => {
    const [primary, secondary, tertiary] = [
      n[nestingOrder[0]],
      n[nestingOrder[1]],
      n[nestingOrder[2]]
    ];

    const c = acc[n.countType] || (acc[n.countType] = {});
    const p = c[primary] || (c[primary] = {});
    const s = p[secondary] || (p[secondary] = {});

    s[tertiary] = {
      stationCount: n.stationCount,
      minDate: n.minDate,
      maxDate: n.maxDate
    };

    return acc;
  }, {});

  console.log(stationData);

  return { decoder, stationData, regionData };
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
          ctyCond: cond,
          regCond: cond
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            const { decoder, stationData, regionData } = parser(
              props,
              nestingOrder
            );

            // Ummm... yeah... I know.
            return (
              <div>
                <h2>Region Metadata</h2>
                <ul>
                  {Object.keys(regionData)
                    .sort()
                    .reduce((accT, countType) => {
                      const primaryLevel = regionData[countType];
                      accT.push(
                        <li>
                          <h3>{countType}</h3>
                          <ul>
                            {Object.keys(primaryLevel)
                              .sort()
                              .reduce((accP, primaryKey) => {
                                const secondaryLevel = primaryLevel[primaryKey];
                                accP.push(
                                  <li>
                                    <h4>{decoder[primary][primaryKey]}</h4>
                                    <ul>
                                      {Object.keys(secondaryLevel)
                                        .sort(sorters[secondary])
                                        .reduce((accS, secondaryKey) => {
                                          const tertiaryLevel =
                                            secondaryLevel[secondaryKey];
                                          accS.push(
                                            <li>
                                              <h5>
                                                {
                                                  decoder[secondary][
                                                    secondaryKey
                                                  ]
                                                }
                                              </h5>
                                              <ul>
                                                {Object.keys(tertiaryLevel)
                                                  .sort(sorters[tertiary])
                                                  .reduce(
                                                    (accT, tertiaryKey) => {
                                                      const stationsInfo =
                                                        tertiaryLevel[
                                                          tertiaryKey
                                                        ];
                                                      accT.push(
                                                        <li>
                                                          <h6>
                                                            {
                                                              decoder[tertiary][
                                                                tertiaryKey
                                                              ]
                                                            }
                                                          </h6>
                                                          <table>
                                                            <tr>
                                                              <th>
                                                                Station Count
                                                              </th>
                                                              <td>
                                                                {
                                                                  stationsInfo.stationCount
                                                                }
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <th>Min Date</th>
                                                              <td>
                                                                {
                                                                  stationsInfo.minDate
                                                                }
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <th>Max Date</th>
                                                              <td>
                                                                {
                                                                  stationsInfo.maxDate
                                                                }
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </li>
                                                      );
                                                      return accT;
                                                    },
                                                    []
                                                  )}
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
                        </li>
                      );
                      return accT;
                    }, [])}
                </ul>

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
              </div>
            );
          }
          return <div>Loading</div>;
        }}
      />
    </div>
  );
}
