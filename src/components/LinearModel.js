import React, { Component } from 'react';
import SimpleLinearRegression from '../SimpleLinearRegression';
import { ScatterplotChart, LineChart } from 'react-easy-chart';
import HousePriceChart from './HousePriceChart';
import RandomLineChart from './RandomLineChart';

let housesData = require('../data/houses.json');

class LinearModel extends Component {
  state = {
    prices: housesData.price.slice(0, 250),
    sqft: housesData.sqft.slice(0, 250),
    linearRegression: new SimpleLinearRegression(),
  };

  handleClick = (ev) => {
    ev.preventDefault();
    console.log(this.state.linearRegression);
    const a = this.state.linearRegression.train(this.state.sqft, this.state.prices);
    console.log(ev);
  }

  render() {
    return (
      <div>
        <h1>Liner Model</h1>
        <HousePriceChart sqft={this.state.sqft} prices={this.state.prices} />
        <h3>Train the model</h3>
        <button onClick={this.handleClick}>
          Train
        </button>
      </div>
    );
  }
}

export default LinearModel;
