import { connect } from 'react-redux';
import React from 'react';
import Map from '../components/Map';
const gltoken =
  'pk.eyJ1IjoiYW0zMDgxIiwiYSI6IkxzS0FpU0UifQ.rYv6mHCcNd7KKMs7yhY3rw';
const layers = [
  'tdv-shapefile-aadt-2015-drp21o',
  'tdv-shapefile-short-counts-20-4k5gbl'
];

export function Mapf(props) {
  return (
    <Map
      url={props.url}
      token={props.token}
      center={props.center}
      layers={props.layers}
    />
  );
}

const mapStateToProps = state => ({
  url: 'mapbox://styles/am3081/cj7gi4sn73oeu2sp169c5pcs8',
  token: gltoken,
  center: [-76.15448, 43.088947],
  value: state.map.stationid,
  layers: layers,
  height: '350px',
  zoom: 12,
  pitch: 40
});

const mapDispatchToProps = {};

const mergeProps = (props, disp, own) => {
  console.log('<MiniMap>', own);
  for (let k in own) {
    if (k === 'id') {
      props['highlightId'] = {
        layer: 'tdv-shapefile-short-counts-20-4k5gbl',
        id: own[k]
      };
    } else {
      props[k] = own[k] || props[k];
    }
  }
  console.log('<MiniMap>', props);
  return props;
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Map);
