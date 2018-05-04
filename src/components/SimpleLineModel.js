import React, { Component } from 'react';
import SimpleLinearRegression from '../SimpleLinearRegression';
import HousePriceChart from './HousePriceChart';
import LossChart from './LossChart';
import SingleLineChart from './SingleLineChart';

let housesData = require('../data/houses.json');

const TrainingButtonToggle = (props) => {
  const data = props.data;
  const lineData = props.lineData;
  if (data) {
    return (
      <div>
        <LossChart data={data} />
        <SingleLineChart data={lineData} />
      </div>
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

class SimpleLineModel extends Component {
  simpleLinearRegression = new SimpleLinearRegression();

  state = {
    prices: housesData.price.slice(0, 500),
    sqft: housesData.sqft.slice(0, 500),
    trainingCompleted: false,
    lossData: null,
    lineData: null,
  };

  handleTrainButtonClick = (ev) => {
    ev.preventDefault();
    this.simpleLinearRegression.train(this.state.sqft, this.state.prices, this.handleTrainingCompleted);
  }

  handleTrainingCompleted = (lossData) => {
    const x1 = 500;
    const y1 = this.simpleLinearRegression.normPredict(x1);
    const x2 = 6000;
    const y2 = this.simpleLinearRegression.normPredict(x2);
    const lineData = [{x: x1, y: y1}, {x: x2, y: y2}];

    this.setState({
      lossData: lossData.map((loss, i) => ({x: (i+1), y: loss})),
      lineData: lineData,
      trainingCompleted: true,
    });
  }

  render() {
    return (
      <div>
        <h1>Simple Linear Model</h1>
        <HousePriceChart sqft={this.state.sqft} prices={this.state.prices} />
        <TrainingButtonToggle
          data={this.state.lossData}
          lineData={this.state.lineData}
          handleTrainButtonClick={this.handleTrainButtonClick}
        />
      </div>
    );
  }
}

export default SimpleLineModel;
