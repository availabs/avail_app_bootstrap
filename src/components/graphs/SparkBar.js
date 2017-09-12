import React from 'react';
import {
  VictoryChart,
  // VictoryLegend,
  VictoryAxis,
  // VictoryGroup,
  // VictoryStack,
  VictoryLabel,
  VictoryBar
} from 'victory';

class SparkBar extends React.Component {
  render() {
    return (
      <div>
        <VictoryChart padding={{ bottom: 70, top: 0, left: 30, right: 30 }}>
          <VictoryBar
            style={{
              labels: { fill: '#efefef', fontSize: 20 },
              data: {
                fill: this.props.color || '#047bf8',
                padding: 0,
                width: 70
              }
            }}
            data={this.props.data}
            labels={d => d.y}
            labelComponent={<VictoryLabel dy={30} />}
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' },
              tickLabels: { display: 'none' }
            }}
          />
          <VictoryAxis
            label={this.props.label}
            tickFormat={t => (+t % 5 === 0 ? t : '')}
            style={{
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' },
              tickLabels: { fontSize: 20, stroke: '#dedede' },
              axisLabel: { fontSize: 18, padding: 35, stroke: '#dedede' }
            }}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default SparkBar;
