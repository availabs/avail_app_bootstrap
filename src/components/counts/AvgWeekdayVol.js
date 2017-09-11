import React from 'react';
import StackedBarGraph from '../graphs/StackedBarGraph';
import directionCodes from '../utils/directionCodes';

class AvgWeekdayVol extends React.Component {
  render() {
    var data = this.props.data;
    var countDate = `${data.month}/${data.dayOfFirstData}/${data.year}`;
    var infoTable = (
      <table style={{ width: '100%' }}>
        <tr>
          <th>Count Id</th>
          <td>{data.countId}</td>
          <th>Date</th>
          <td>{countDate}</td>
        </tr>
        <tr>
          <th>Functional Class</th>
          <td>{data.functionalClass}</td>
          <th>Factor Group</th>
          <td>{data.factorGroup}</td>
        </tr>
        <tr>
          <th>Recorder Placement</th>
          <td colSpan={7}>{data.specificRecorderPlacement}</td>
        </tr>
      </table>
    );
    let totalAADT = data.federalDirection[0].aadt;
    var chartData = Object.keys(data.federalDirection)
      .filter(dir => dir !== '0' && dir !== '9')
      .map(dir => {
        return data.federalDirection[dir].count.map((value, index) => {
          return { name: dir, x: index + 1, y: value };
        });
      });

    let aadtData = Object.keys(data.federalDirection)
      .sort((a, b) => b - a)
      .map(dir => {
        return (
          <div className="col-4">
            <div className="el-tablo highlight">
              <div className="label">{directionCodes[dir]} AADT</div>
              <div className="value">
                {data.federalDirection[dir].aadt.toLocaleString()}
              </div>
            </div>
          </div>
        );
      });
    let legendData = Object.keys(data.federalDirection)
      .filter(dir => dir !== '0' && dir !== '9')
      .map(dir => {
        return { name: directionCodes[dir] };
      });

    return (
      <div>
        <div className="element-box">
          <div className="project-info">
            <div className="row align-items-center">
              <div className="col-sm-5">
                <div className="project-title">
                  <h5>
                    Average Weekday Volume<br />
                    {countDate}
                  </h5>
                </div>
              </div>
              <div className="col-sm-7">
                <div className="row">{aadtData}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-xl-12">
              <StackedBarGraph data={chartData} legendData={legendData} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-xl-12">
              <div className="padded b-l b-r">
                <div className="element-info-with-icon smaller">
                  <div className="element-info-icon">
                    <div className="os-icon os-icon-bar-chart-stats-up" />
                  </div>
                  <div className="element-info-text">
                    <h5 className="element-inner-header">Metadata</h5>
                    <div className="element-inner-desc" />
                  </div>
                </div>
                {infoTable}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AvgWeekdayVol;
