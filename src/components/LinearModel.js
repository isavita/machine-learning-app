import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';
import CSVReader from 'react-csv-reader';

class LinearModel extends Component {
  state = {
    linearRegression: tf.sequential(),
    predictedPrice: null,
  };

  componentWillMount() {
    // Define model
    this.state.linearRegression.add(tf.layers.dense({units: 10, inputShape: 1}));
    this.state.linearRegression.add(tf.layers.dense({units: 1}));

    // Specify the loss function and the backpropagation algorithm
    const learningRate = 0.3;
    const optimizer = tf.train.adam(learningRate);
    this.state.linearRegression.compile({loss: 'meanSquaredError', optimizer: optimizer});

    // Training data
    // House square footage
    const xs = tf.tensor1d([
      1180, 2570, 770, 1960, 1680, 5420, 1715, 1060, 1780, 1890, 3560, 1160,
      1430, 1370, 1810, 2950, 1890, 1600, 1200, 1250
    ]);
    // House price in US dollars
    const ys = tf.tensor1d([
      221900, 538000, 180000, 604000, 510000, 1225000, 257500, 291850, 229500, 323000, 662500,
      468000, 310000, 400000, 530000, 650000, 395000, 485000, 189000, 230000
    ]);

    // Train
    this.state.linearRegression.fit(xs, ys);
  }

  predict = (value) => {
    // Prediction
    const price = this.state.linearRegression.predict(tf.tensor2d([value], [1, 1]));
    const formattedPrice = Array.from(price.dataSync())[0];

    return formattedPrice;
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const squareFeet = ev.target['square-feet'].value;
    const predictedPrice = this.predict(squareFeet);
    
    this.setState({predictedPrice: predictedPrice});
  };

  render() {
      return (
      <div>
        <h1>Liner Model</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='square-feet'>Suare Feet</label>
          <input id='square-feet' type='text' required />

          <button type='submit'>Submit</button>
        </form>
        <p>Predicted house price: {this.state.predictedPrice}$</p>
      </div>
    );
  }
}

export default LinearModel;
