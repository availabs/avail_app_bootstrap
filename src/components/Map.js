import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import ReactResizeDetector from 'react-resize-detector';
import * as d3 from 'd3';
var Loader = require('halogen/BounceLoader');
var mapboxgl = require('mapbox-gl/dist/mapbox-gl');

let point_sort = (a, b) => {
  if (a.geometry.type === 'Point' && b.geometry.type !== 'Point') return -1;
  else if (a.geometry.type !== 'Point' && b.geometry.type === 'Point') return 1;
  else return 0;
};

var legend = require('d3-svg-legend');

// let canvasshim = (map) => {
//   let canvas = document.getElementsByClassName('mapboxgl-canvas')
//   let canv = canvas[0]
// //  canv.style.width = '100%'
// //  canv.style.height = '100%'
//   let container = document.getElementsByClassName('mapboxgl-map')[0]
//   container.addEventListener('webkitTransitionEnd', () => {
//     map.resize()
//   })
// }

let popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});

export class TmcMap extends React.Component {
  /**
   * Builds the Map React Component
   */
  constructor() {
    super();
    this.state = {
      map: null,
      needsResize: false,
      slider: '0'
    };

    this.onResize = this.onResize.bind(this);
    this.loadingOverlay = this.loadingOverlay.bind(this);
    this.onMapLoad = this.onMapLoad.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseClick = this.onMouseClick.bind(this);
    this.updateGeoms = this.updateGeoms.bind(this);
    this.highlight = this.highlight.bind(this);
    this.setHighlights = this.setHighlights.bind(this);
    this.buildLegend = this.buildLegend.bind(this);
    this.buildSlider = this.buildSlider.bind(this);
    this.onSlide = this.onSlide.bind(this);
    this.updateLegend = this.updateLegend.bind(this);
  }

  /**
   * Resizes the map to fit its container
   * Used when the parent components change size
   */
  onResize() {
    let map = this.state.map;
    if (map) {
      map.resize();
    }
  }

  /**
   * Renders an Icon fixed over the map
   * This is done when the isloading flag is set
   */
  loadingOverlay() {
    if (!this.props.isloading) {
      return '';
    } else {
      return (
        <div
          style={{
            position: 'fixed',
            height: '100%',
            width: '100%',
            zIndex: 1000,
            backgroundColor: 'rgba(120,120,120,0.7)'
          }}
        >
          <div className="loader">
            <Loader color="#00FF00" size="50px" margin="4px" />
          </div>
        </div>
      );
    }
  }
  /**
   * Setup listeners after map initialized
   * @param {mapboxgl map} map
   * @return {undefined}
   */
  onMapLoad(map) {
    //canvasshim(map)
    map.on('mousemove', this.onMouseMove.bind(this, map));
    map.on('click', this.onMouseClick.bind(this, map));
    this.updateGeoms(map);
    map.resize();

    this.props.layers.forEach(layer => {
      map.on('mouseenter', layer, e => {
        popup
          .setLngLat(e.features[0].geometry.coordinates)
          .setHTML(`<strong>${e.features[0].properties.RC_ID}</strong>`)
          .addTo(map);
      });
      map.on('mouseleave', layer, e => {
        popup.remove();
      });
    });
    this.setState({ map: map });
  }
  /**
   * Creates a callback for the onClick action
   * @return {function}
   */
  onMouseMove(map, e) {
    let features = map.queryRenderedFeatures(e.point, {
      layers: this.props.layers
    });
    let feat = features.length ? features.sort(point_sort)[0] : null;
    if (feat) {
      map.getCanvas().style.cursor = 'pointer';
      let id = 'hover';
      //let key = this.props.layerKey
      let newData = {
        type: 'Feature',
        properties: feat.properties,
        geometry: feat.geometry
      };
      if (!map.getSource(id)) {
        map.addSource(id, {
          type: 'geojson',
          data: newData
        });
      } else if (map.getSource(id)._data.geometry.type === feat.geometry.type) {
        //map.removeSource(id)
        map.getSource(id).setData(newData);
      } else {
        map.removeSource(id);
        map.addSource(id, {
          type: 'geojson',
          data: newData
        });
      }

      let layerType = null;
      let layerPaint = {};
      let layout = {
        visibility: 'visible'
      };
      if (feat.geometry.type === 'Point') {
        layerType = 'circle';
      } else {
        layerPaint = {
          'line-width': 5
        };
        layerType = 'line';
      }

      map.addLayer({
        id: id,
        type: layerType,
        source: id,
        layout: layout,
        paint: layerPaint
      });
    }
  }
  onMouseClick(map, e) {
    let features = [];
    if (map.getLayer('hover')) {
      features = map.queryRenderedFeatures(e.point, { layers: ['hover'] });
    } else {
      features = map.queryRenderedFeatures(e.point, {
        layers: this.props.layers
      });
    }

    let feat = features.length ? features.sort(point_sort)[0] : null;
    if (feat) {
      console.log(feat);
      this.props.reset();
      this.props.get(feat);
    }
  }
  /**
   * Enact updateds for the geometries in current props
   */
  updateGeoms(map) {
    if (!map) {
      return;
    }
    this.props.geoms.forEach(geo => {
      this.setGeom(geo, map);
    });
    this.setHighlights();
  }
  highlight(hlt, map) {
    if (!map || !map.getLayer(hlt.id)) {
      return;
    }
    let lastprop = {};
    if (hlt.reset) {
      let geom = this.props.geoms.find(x => x.id === hlt.id);
      if (geom) {
        lastprop = geom.paint[hlt.prop];
      } else {
        return;
      }
    } else {
      lastprop = map.getPaintProperty(hlt.id, hlt.prop);
    }
    let newprop = Object.assign({}, lastprop);
    let stopmap = hlt.stops.reduce((acc, c) => {
      acc[c[0]] = c[1];
      return acc;
    }, {});
    newprop.stops = newprop.stops.map(colmap => {
      if (stopmap[colmap[0]]) {
        return [colmap[0], stopmap[colmap[0]]];
      }
      return colmap;
    });
    map.setPaintProperty(hlt.id, hlt.prop, newprop);
  }
  setHighlights(hlts, map) {
    map = map || this.state.map;
    hlts = hlts || this.props.highlight;
    if (!map) {
      return;
    }
    hlts.map(hlt => {
      return this.highlight(hlt, map);
    });
  }
  /**
   * Set the geometry data if any
   */
  setGeom(geomObj, map) {
    let layerType = geomObj.type;
    let layerid = geomObj.id;
    let paint = geomObj.paint;
    let layout = geomObj.layout;
    let geom = geomObj.geom;
    if (!geom || !paint) return;

    if (map.getLayer(layerid)) {
      map.removeLayer(layerid);
    }
    if (!map.getSource(layerid)) {
      map.addSource(layerid, {
        type: 'geojson',
        data: geom
      });
    } else {
      map.getSource(layerid).setData(geom);
    }
    map.addLayer({
      id: layerid,
      type: layerType,
      source: layerid,
      layout: layout,
      paint: paint
    });
    // if (geom.features[0]) {
    //   let firstcoors = geom.features[0].geometry.coordinates[0][0]
    //   let bound = new mapboxgl.LngLatBounds(firstcoors, firstcoors)
    //   geom.features.forEach(feat => {
    //     feat.geometry.coordinates.forEach(lstring => {
    //       lstring.forEach(coor => {
    //         bound.extend(coor)
    //       })
    //     })
    //   })
    //   map.fitBounds(bound)
    // }
  }
  /**
   * Returns whether or not to rerender the map
   */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  /**
   * Actions to perform after the react component has cycled
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.updateCheck) {
      let rerender = this.props.updateCheck(this.props, prevProps);
      if (!rerender) {
        this.setHighlights(this.props.highlight, this.state.map);
        return;
      }
    }
    this.onResize();
    this.updateGeoms(this.state.map);
    this.updateLegend();
  }
  /**
   * Actions to perform on first render
   * In this case inital loading of map tiles
   * and the setting of actions/events
   */
  componentDidMount() {
    mapboxgl.accessToken = this.props.token;
    let map = new mapboxgl.Map({
      container: this.props.mapid,
      style: this.props.url,
      center: this.props.center,
      zoom: this.props.zoom
    });
    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');

    if (this.props.dragging) {
      map.dragPan.enable();
    } else {
      map.dragPan.disable();
    }
    if (this.props.scrollZoom) {
      map.scrollZoom.enable();
    } else {
      map.scrollZoom.disable();
    }

    map.on('load', this.onMapLoad.bind(this, map));
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.map && nextProps.scrollZoom) {
      this.state.map.scrollZoom.enable();
    } else if (this.state.map) {
      this.state.map.scrollZoom.disable();
    }
    if (this.state.map && nextProps.dragging) {
      this.state.map.dragPan.enable();
    } else if (this.state.map) {
      this.state.map.dragPan.disable();
    }
  }
  onSlide(val) {
    console.log('<MAP>', val);
    this.props.sliderAction(val);
  }
  buildSlider() {
    if (this.props.hasSlider) {
      let min = +this.props.sliderRange[0];
      let max = +this.props.sliderRange[1];
      console.log('Time Range', min, max);
      return (
        <div
          className="map-overlay map-overly-inner slider"
          style={{
            zIndex: 1000,
            width: '100%',
            height: '15%'
          }}
        >
          <Slider
            min={min}
            max={max}
            value={this.props.slider}
            onChange={this.onSlide}
            format={this.props.sliderFormat}
          />
        </div>
      );
    }
  }
  buildLegend() {
    if (this.props.hasLegend) {
      return (
        <div
          id="legend"
          className="legend map-overlay map-overlay-inner"
          style={{ zIndex: 1000 }}
        />
      );
    } else {
      return <span />;
    }
  }
  updateLegend() {
    if (
      !this.props.hasLegend ||
      !this.props.colorScale ||
      !this.props.colorScale.domain
    ) {
      return;
    }
    let div = d3.select('#legend');
    let svg = div.select('svg');
    if (!svg.node()) {
      svg = div.append('svg').attr('class', 'legend-container');
      svg
        .append('g')
        .attr('class', 'legend-key')
        .attr('transform', 'translate(20,20)');
    }

    let colorLegend = legend
      .color()
      .labelFormat(d3.format('.0f'))
      .scale(this.props.colorScale);
    svg.select('.legend-key').call(colorLegend);
  }
  render() {
    let bubbleStopper = e => (this.props.dragging ? e.stopPropagation() : e);
    return (
      <div
        id={this.props.mapid}
        className={'mapboxgl-map'}
        style={{ height: '100%', top: '0' }}
        onClick={bubbleStopper}
        onContextMenu={bubbleStopper}
        onDoubleClick={bubbleStopper}
        onDrag={bubbleStopper}
        onDragEnd={bubbleStopper}
        onDragEnter={bubbleStopper}
        onDragExit={bubbleStopper}
        onDragLeave={bubbleStopper}
        onDragOver={bubbleStopper}
        onDragStart={bubbleStopper}
        onDrop={bubbleStopper}
        onMouseDown={bubbleStopper}
        onMouseEnter={bubbleStopper}
        onMouseLeave={bubbleStopper}
        onMouseMove={bubbleStopper}
        onMouseOut={bubbleStopper}
        onMouseOver={bubbleStopper}
        onMouseUp={bubbleStopper}
      >
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.onResize}
        />
      </div>
    );
  }
}

TmcMap.propTypes = {
  dragging: PropTypes.bool,
  isloading: PropTypes.bool,
  edit: PropTypes.bool,
  token: PropTypes.string.isRequired,
  mapid: PropTypes.string.isRequired,
  url: PropTypes.string,
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
  scrollZoom: PropTypes.bool,
  layers: PropTypes.array.isRequired,
  layerKey: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
  get: PropTypes.func.isRequired,
  geoms: PropTypes.array.isRequired,
  updateCheck: PropTypes.func,
  highlight: PropTypes.array,
  hasLegend: PropTypes.bool,
  hasSlider: PropTypes.bool,
  sliderComp: PropTypes.object,
  colorScale: PropTypes.func,
  sliderRange: PropTypes.array
};

TmcMap.defaultProps = {
  dragging: true,
  isloading: false,
  edit: false,
  center: [-73.756232, 42.652579],
  zoom: 7,
  scrollZoom: true,
  sliderRange: ['0', '1'],
  geoms: [],
  highlight: [],
  layerKey: '',
  mapid: 'map',
  reset: () => {},
  token: '',
  layers: [],
  get: () => {}
};
export default TmcMap;
