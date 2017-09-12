import React from 'react';
import {
  VictoryChart,
  VictoryLegend,
  VictoryAxis,
  VictoryGroup,
  VictoryStack,
  VictoryBar
} from 'victory';

class StackedBarGraph extends React.Component {
  render() {
    return (
      <div>
        <VictoryChart
          padding={{ right: 0, top: 10, left: 40, bottom: 50 }}
          domainPadding={{ x: 8 }}
        >
          <VictoryLegend
            colorScale={'red'}
            x={40}
            y={20}
            gutter={0}
            data={this.props.legendData}
            style={{
              labels: { fontSize: 12 },
              parent: { border: '1px solid #ccc' }
            }}
          />
          <VictoryAxis
            label="Time (hrs)"
            tickCount={12}
            style={{
              axisLabel: { fontSize: 12, padding: 25 },
              ticks: { stroke: 'grey', size: 5 },
              tickLabels: { fontSize: 8, padding: 5 }
            }}
          />
          <VictoryAxis
            label="Vehicle Count"
            dependentAxis={true}
            style={{
              axisLabel: { fontSize: 12 },
              grid: { stroke: '#efefef' },
              ticks: { stroke: 'grey', size: 5 },
              tickLabels: { fontSize: 8, padding: 5 }
            }}
          />
          <VictoryGroup
            offset={0}
            style={{
              data: {
                width:
                  this.props.data[0] && this.props.data[0].length > 45 ? 5 : 15
              }
            }}
          >
            <VictoryStack colorScale={'red'}>
              {this.props.data.map((data, index) => {
                return <VictoryBar key={index} data={data} />;
              })}
            </VictoryStack>
          </VictoryGroup>
        </VictoryChart>
      </div>
    );
  }
}

export default StackedBarGraph;
