import React from 'react';
import { connect } from 'react-redux';
import { stationSelect } from '../modules/map';
import Map from '../components/Map';
import AWVSgraph from './stationData/AverageWeekdayVolumeForStation';
const gltoken =
  'pk.eyJ1IjoiYW0zMDgxIiwiYSI6IkxzS0FpU0UifQ.rYv6mHCcNd7KKMs7yhY3rw';
const layers = [
  'tdv-shapefile-aadt-2015-drp21o',
  'tdv-shapefile-short-counts-20-4k5gbl'
];
export function Mapf(props) {
  return (
    <div style={{ height: '100%' }}>
      <Sidepanel value={props.value} />
      <Map
        url={props.url}
        token={props.token}
        center={[-76.15448, 43.088947]}
        layers={props.layers}
        get={props.get}
      />
    </div>
  );
}

export function Sidepanel(props) {
  console.log('sidepanel', props.value);
  return !props.value ? (
    <span />
  ) : (
    <div className="Map-Overlay color-scheme-dark">
      <h4> {props.value} </h4>
      <AWVSgraph match={{ params: { stationId: props.value } }} />
    </div>
  );
}

const mapStateToProps = state => ({
  url: 'mapbox://styles/am3081/cj7gi4sn73oeu2sp169c5pcs8',
  token: gltoken,
  center: [-76.15448, 43.088947],
  value: state.map.stationid,
  layers: layers
});
const mapDispatchToProps = {
  stationSelect
};

const mergeProps = (props, disp) => {
  console.log('value', props.value);
  props.get = o => {
    disp.stationSelect(o.properties.RC_ID);
  };
  return props;
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Mapf);
