import React, { Component } from 'react';
import { ScatterplotChart } from 'react-easy-chart';

class HousePriceChart extends Component {
  constructor(props) {
    super(props);

    const data = props.sqft.map((sq, i) => ({ x: sq, y: props.prices[i] }));

    this.state = {
      data: data
    };
  }

  render() {
    return (
      <div className='house-price-chart'>
        <h3>House Price Data</h3>
        <ScatterplotChart
          data={this.state.data}
          margin={{top: 10, right: 10, bottom: 30, left: 80}}
          axes
          axisLabels={{x: 'House size in sqft', y: 'Price in US dollars'}}
          style={{ '.label': { fill: 'black' } }}
          dotRadius={3}
          width={960}
          height={540}
          verticalGrid
          grid
        />
      </div>
    );
  }
}

export default HousePriceChart;
