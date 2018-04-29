import React, { Component } from 'react';
import { 
  ComposedChart, ScatterChart, Scatter, Tooltip, Label,
  LineChart, Line, CartesianGrid, XAxis, YAxis
} from 'recharts';

class RandomLineChart extends Component {
  constructor(props) {
    super(props);

    const data = props.sqft.map((sq, i) => ({ sqft: sq, price: props.prices[i], r: 3 }));

    this.state = {
      data: data
    };
  }

  render() {
    return (
      <div className='random-line-chart'>
        <h2>Line Model</h2>
        <ComposedChart width={960} height={540} margin={{top: 10, right: 10, bottom: 30, left: 80}}>
          <CartesianGrid />
          <XAxis type='number' dataKey='sqft'> 
            <Label value='House size in sqft' position='insideBottom' offset={-10} /> 
          </XAxis>
          <YAxis type='number' dataKey='price'>
            <Label value='Price in US dollars' position='insideLeft' angle={-90} offset={-25} /> 
          </YAxis>
          <Scatter data={this.state.data} fill='#8884d8' strokeWidth={2} />
          <Line type='monotone' dataKey='sqft' dot={{ stroke: 'red', strokeWidth: 2 }} />
        </ComposedChart>
        /*<LineChart data={this.state.data} width={960} height={540}>
          <Line type='monotone' stroke='#8884d8' />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>*/
      </div>
    );
  }
}

export default RandomLineChart;
