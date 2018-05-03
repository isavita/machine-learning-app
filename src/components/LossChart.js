import React, { Component } from 'react';
import { LineChart } from 'react-easy-chart';

class LossChart extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [props.data] };
  }

  render() {
    return (
      <div className='loss-chart'>
        <h3>Loss Function Chart</h3>
        <LineChart
          data={this.state.data}
          margin={{top: 10, right: 10, bottom: 50, left: 50}}
          axes
          axisLabels={{x: 'Number of iterations', y: 'Loss'}}
          style={{ '.label': { fill: 'black' } }}
          width={960}
          height={540}
          interpolate={'cardinal'}
          verticalGrid
          grid
        />
      </div>
    );
  }
}

export default LossChart;
