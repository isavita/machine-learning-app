import React, { Component } from 'react';
import { LineChart } from 'react-easy-chart';

class SingleLineChart extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [props.data] };
  }

  render() {
    return (
      <div className='loss-chart'>
        <h3>Final Line Chart</h3>
        <LineChart
          data={this.state.data}
          lineColors={['red']}
          margin={{top: 10, right: 10, bottom: 50, left: 80}}
          axes
          xDomainRange={[0, 6500]}
          yDomainRange={[0, 3500000]}
          axisLabels={{x: 'House size in sqft', y: 'Price in US dollars'}}
          style={{ '.label': { fill: 'black' } }}
          width={960}
          height={540}
          verticalGrid
          grid
        />
      </div>
    );
  }
}

export default SingleLineChart;
