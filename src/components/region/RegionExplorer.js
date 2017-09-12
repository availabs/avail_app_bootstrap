import React from 'react';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';

class RegionExplorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCounty: Object.keys(props.data)[0]
    };
    this.changeCounty = this.changeCounty.bind(this);
  }

  changeCounty(e) {
    e.preventDefault();
    // console.log('changeCounty', )
    this.setState({ activeCounty: e.target.getAttribute('href') });
  }

  render() {
    const stationData = this.props.data;
    const decoder = this.props.decoder;

    const countiesNav = Object.keys(stationData).map(countyCode => {
      return {
        text: decoder.countyCode[countyCode],
        link: countyCode,
        active: countyCode === this.state.activeCounty
      };
    });

    const functionClasses = Object.keys(
      stationData[this.state.activeCounty]
    ).map(fClassCode => {
      const stations = Object.keys(
        stationData[this.state.activeCounty][fClassCode]
      ).reduce((prev, factorCode) => {
        Object.keys(
          stationData[this.state.activeCounty][fClassCode][factorCode]
        ).forEach(stationId => {
          prev.push({
            stationId,
            description:
              stationData[this.state.activeCounty][fClassCode][factorCode][
                stationId
              ]
          });
        });
        return prev;
      }, []);
      return (
        <div>
          <div className="element-info">
            <h5 className="element-inner-header">
              {decoder.functionalClass[fClassCode].split(':')[1]}
            </h5>
            <div className="element-inner-desc">
              {decoder.functionalClass[fClassCode].split(':')[0]}
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-lightborder">
              {stations.map(station => {
                return (
                  <tr>
                    <td>
                      <Link to={`/station-info/${station.stationId}`}>
                        {station.stationId}
                      </Link>
                    </td>
                    <td>{station.description}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      );
    });
    return (
      <div className="element-wrapper">
        <Navbar items={countiesNav} onNav={this.changeCounty} />
        <div className="element-box">{functionClasses}</div>
      </div>
    );
  }
}

export default RegionExplorer;
