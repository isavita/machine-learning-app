import React, { Component } from 'react';
import SimpleLinearRegression from '../SimpleLinearRegression';
import LinearRegression from '../LinearRegression';
import { ScatterplotChart, LineChart } from 'react-easy-chart';
import HousePriceChart from './HousePriceChart';
import LossChart from './LossChart';
import RandomLineChart from './RandomLineChart';

let housesData = require('../data/houses.json');

const TrainingButtonToggle = (props) => {
  const data = props.data;
  if (data) {
    return (
      <LossChart data={data} />
    );
  } else {
    return (
      <div>
        <h3>Train the model</h3>
        <button onClick={props.handleTrainButtonClick}>
          Train
        </button>
      </div>
    );
  }
};

class LinearModel extends Component {
  linearRegression = new LinearRegression();

  state = {
    prices: housesData.price.slice(0, 5000),
    sqft: housesData.sqft.slice(0, 5000),
    trainingCompleted: false,
    lossData: null,
  };

  handleTrainButtonClick = (ev) => {
    ev.preventDefault();
    this.linearRegression.train(this.state.sqft, this.state.prices, this.handleTrainingCompleted);
  }

  handleTrainingCompleted = (lossData) => {
    this.setState({
      lossData: lossData.map((loss, i) => ({x: (i+1), y: loss})),
      trainingCompleted: true,
    });
  }

  render() {
    return (
      <div>
        <h1>Liner Model</h1>
        <HousePriceChart sqft={this.state.sqft} prices={this.state.prices} />
        <TrainingButtonToggle
          data={this.state.lossData}
          handleTrainButtonClick={this.handleTrainButtonClick}
        />
      </div>
    );
  }
}

export default LinearModel;
