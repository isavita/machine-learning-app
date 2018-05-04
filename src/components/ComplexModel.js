import React, { Component } from 'react';
import MultidimensionalLinearRegression from '../MultidimensionalLinearRegression';
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
          <input id='sqft' type='text' required /><br />
          <label htmlFor='floors'>Floors</label>
          <input id='floors' type='text' required /><br />
          <label htmlFor='bedrooms'>Bedrooms</label>
          <input id='bedrooms' type='text' required /><br />
          <label htmlFor='bathrooms'>Bathrooms</label>
          <input id='bathrooms' type='text' required /><br />

          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  } else {
    return null;
  }
};

class ComplexModel extends Component {
  multidimensionalLinearRegression = new MultidimensionalLinearRegression();

  state = {
    prices: housesData.price.slice(0, 1000),
    sqft: housesData.sqft.slice(0, 1000),
    floors: housesData.floors.slice(0, 1000),
    bedrooms: housesData.bedrooms.slice(0, 1000),
    bathrooms: housesData.bathrooms.slice(0, 1000),
    trainingCompleted: false,
    lossData: null,
    predictedPrice: null,
  };

  handleTrainButtonClick = (ev) => {
    ev.preventDefault();
    this.multidimensionalLinearRegression.train(
      this.state.sqft,
      this.state.floors,
      this.state.bedrooms,
      this.state.bathrooms,
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
    const features = [
      parseFloat(ev.target['sqft'].value),
      parseFloat(ev.target['floors'].value),
      parseFloat(ev.target['bedrooms'].value),
      parseFloat(ev.target['bathrooms'].value)
    ];
    const predictedPrice = Math.ceil(this.multidimensionalLinearRegression.predict(features));

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

export default ComplexModel;
