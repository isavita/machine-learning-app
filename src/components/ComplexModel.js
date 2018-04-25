import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Form, FormGroup, FormControl } from 'react-bootstrap';

let housesData = require('../data/houses.json');

class ComplexModel extends Component {
  state = {
    prices: housesData.price,
    sqft: housesData.sqft,
    floors: housesData.floors,
    bedrooms: housesData.bedrooms,
    bathrooms: housesData.bathrooms,
    linearRegression: tf.sequential(),
    predictedPrice: null,
  };

  componentWillMount() {
    // Define model
    this.state.linearRegression.add(tf.layers.dense({
      units: 20, inputShape: 4, kernelInitializer: 'randomUniform'
    }));
    this.state.linearRegression.add(tf.layers.dense({
      units: 20, kernelInitializer: 'randomUniform'
    }));
    this.state.linearRegression.add(tf.layers.dense({
      units: 1, kernelInitializer: 'randomUniform'
    }));

    // Specify the loss function and the backpropagation algorithm
    const learningRate = 0.1;
    const optimizer = tf.train.adam(learningRate);
    this.state.linearRegression.compile({
      loss: 'meanSquaredError',
      optimizer: 'adam',
    });

    // Training data
    // House features
    let features = [];
    for (let i = 0; i < this.state.prices.length; i++) {
      features.push([
        this.state.sqft[i], this.state.floors[i], this.state.bedrooms[i], this.state.bathrooms[i]
      ]);
    }
    const xs = tf.tensor2d(features);
    // House price in US dollars
    const ys = tf.tensor1d(this.state.prices);

    // Train
    const callbacks = {
      onBatchEnd: (batch, logs) => {
        console.log(logs.loss.toFixed(5));
      }
    };
    this.state.linearRegression.fit(xs, ys, {callbacks: callbacks});
  }

  predict = (value) => {
    // Prediction
    const price = this.state.linearRegression.predict(tf.tensor2d(value, [1, 4]));
    const formattedPrice = Array.from(price.dataSync())[0];

    return formattedPrice;
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const features = [
      ev.target['sqft'].value,
      ev.target['floors'].value,
      ev.target['bedrooms'].value,
      ev.target['bathrooms'].value
    ];

    const predictedPrice = this.predict(features);
    
    this.setState({predictedPrice: predictedPrice});
  };

  render() {
      
      return (
        <div>
          <h1>Complex Model</h1>
          <form onSubmit={this.handleSubmit}>
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
          <p>House price: {this.state.predictedPrice}k$</p>
        </div>
    );
  }
}

export default ComplexModel;
