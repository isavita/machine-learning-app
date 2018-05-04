import React, { Component } from 'react';
import LinearRegression from '../MultidimensionalLinearRegression';
import LossChart from './LossChart';

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

const PricePredictionForm = (props) => {
  if (props.trainingCompleted) {
    return (
      <div className='price-prediction-form'>
        <form onSubmit={props.handleSubmit}>
          <label htmlFor='sqft'>Sqft</label>
          <input id='sqft' type='text' required />

          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  } else {
    return null;
  }
};

class LinearModel extends Component {
  multidimensionalLinearRegression = new LinearRegression();

  state = {
    prices: housesData.price.slice(0, 1000),
    sqft: housesData.sqft.slice(0, 1000),
    trainingCompleted: false,
    lossData: null,
    predictedPrice: null,
  };

  handleTrainButtonClick = (ev) => {
    ev.preventDefault();
    this.multidimensionalLinearRegression.train(
      this.state.sqft,
      this.state.prices,
      this.handleTrainingCompleted
    );
  }

  handleTrainingCompleted = (lossData) => {
    this.setState({
      lossData: lossData.map((loss, i) => ({x: (i+1), y: loss})),
      trainingCompleted: true,
    });
  }

  handlePredictionSubmit = (ev) => {
    ev.preventDefault();
    const squareFeet = parseFloat(ev.target['sqft'].value);
    const predictedPrice = Math.ceil(this.multidimensionalLinearRegression.predict(squareFeet));
    
    this.setState({predictedPrice: predictedPrice});
  }

  render() {
    const housePrice = this.state.predictedPrice ? (<p>House price: {this.state.predictedPrice}</p>) : null;
    return (
      <div>
        <h1>Complex Model With Neural Network</h1>
        <TrainingButtonToggle
          data={this.state.lossData}
          handleTrainButtonClick={this.handleTrainButtonClick}
        />
        <PricePredictionForm 
          trainingCompleted={this.state.trainingCompleted}
          handleSubmit={this.handlePredictionSubmit}
        />
        {housePrice}
      </div>
    );
  }
}

export default LinearModel;
