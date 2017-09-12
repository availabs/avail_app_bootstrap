import React from 'react';
import BreadcrumbBar from '../components/layout/BreadcrumbBar';
import RegionExplorer from '../components/region/RegionExplorer';
import { QueryRenderer, graphql } from 'react-relay';

import relay from '../relay.js';

const defaultNestingOrder = ['countyCode', 'functionalClass', 'factorGroup']; //allow hierarchy by factorGroup via toggle

// const sorters = {
//   functionalClass: (a, b) => +a - +b,
//   countyCode: null,
//   factorGroup: null
// };

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

  return { decoder, stationData };
}

export default function Region(props) {
  const { region } = props.match.params;
  const cond = { region };

  // Later offer a UI component that allows user to control nesting order.
  const nestingOrder = defaultNestingOrder;

  // const [primary, secondary, tertiary] = nestingOrder;

  return (
    <div className="content-w">
      <BreadcrumbBar
        items={[
          { text: 'Regions', link: '/' },
          { text: region, link: `/region/${region}` }
        ]}
      />
      <div className="content-i">
        <div className="content-box">
          <div className="row">
            <div className="col-lg-12">
              <div className="element-wrapper">
                <h1>Region {region}</h1>
                <QueryRenderer
                  environment={relay}
                  query={q}
                  variables={{
                    locCond: cond,
                    metaCond: cond,
                    ctyCond: cond,
                    regCond: cond,
                    countsCond: cond
                  }}
                  render={({ error, props }) => {
                    if (error) {
                      return <div>{error.message}</div>;
                    } else if (props) {
                      const { decoder, stationData } = parser(
                        props,
                        nestingOrder
                      );
                      return (
                        <div>
                          <RegionExplorer
                            data={stationData}
                            decoder={decoder}
                          />
                          <pre>{JSON.stringify(stationData, null, 4)}</pre>
                        </div>
                      );
                    }
                    return <div>Loading</div>;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
