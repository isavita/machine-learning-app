import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';
import { ScatterplotChart, LineChart } from 'react-easy-chart';

let housesData = require('../data/houses.json');

class LinearModel extends Component {
  state = {
    prices: housesData.price.slice(0, 100),
    sqft: housesData.sqft.slice(0, 100),
    linearRegression: tf.sequential(),
    predictedPrice: 0.0,
  };

  componentWillMount() {
    // Define model
    this.state.linearRegression.add(tf.layers.dense({units: 5, inputShape: 1}));
    this.state.linearRegression.add(tf.layers.dense({units: 1}));

    // Specify the loss function and the backpropagation algorithm
    const learningRate = 0.1;
    const optimizer = tf.train.adam(learningRate);
    this.state.linearRegression.compile({
      loss: 'meanSquaredError',
      optimizer: optimizer,
    });

    // Training data
    // House square footage
    const xs = tf.tensor1d(this.state.sqft);
    // House price in US dollars
    const ys = tf.tensor1d(this.state.prices);

    // Train
    const batchSize = 16;
    const numEpochs = 100;
    const callbacks = {
      onBatchEnd: (batch, logs) => {
        console.log(logs.loss.toFixed(5));
      }
    };
    this.state.linearRegression.fit(xs, ys, {batchSize, epochs: numEpochs, callbacks: callbacks});
  }

  predict = (value) => {
    // Prediction
    const price = this.state.linearRegression.predict(tf.tensor2d([value], [1, 1]));
    const formattedPrice = Array.from(price.dataSync())[0];

    return formattedPrice;
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const squareFeet = ev.target['sqft'].value;
    const predictedPrice = this.predict(squareFeet);
    
    this.setState({predictedPrice: predictedPrice});
  };

  render() {
      const data = this.state.sqft.map((sqft, i) => {
        return {
          x: sqft, y: this.state.prices[i]
        };
      });

      let predictions = this.state.sqft.map((sqft) => {
        return {
          x: sqft, y: this.predict(sqft) 
        };
      });
      return (
        <div>
        <h1>Liner Model</h1>
        <ScatterplotChart
          data={data}
          axes
          axisLabels={{x: 'My x', y: 'My y'}}
          dotRadius={2}
          width={960}
          height={540}
          verticalGrid
          grid
        />
        <LineChart
          data={[predictions]}
          axes
          interpolate={'cardinal'}
          axisLabels={{x: 'My x', y: 'My y'}}
          width={960}
          height={540}
        />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='sqft'>Sqft</label>
          <input id='sqft' type='text' required />

          <button type='submit'>Submit</button>
        </form>
        <p>House price: {this.state.predictedPrice}k$</p>
      </div>
    );
  }
}

export default LinearModel;
