import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';
import { ScatterplotChart, LineChart } from 'react-easy-chart';
import HousePriceChart from './HousePriceChart';

let housesData = require('../data/houses.json');

class LinearModel extends Component {
  state = {
    prices: housesData.price.slice(0, 100),
    sqft: housesData.sqft.slice(0, 100),
    predictedPrice: 0.0,
    a: tf.variable(tf.scalar(Math.random())),
    b: tf.variable(tf.scalar(Math.random())),
    optimizer: tf.train.sgd(0.1),
    trained: false,
  };

  predict = (x) => (
    tf.tidy(() => { 
      return this.state.a.mul(x).add(this.state.b)
    })
  )

  loss = (prediction, actual) => {
    return prediction.sub(actual).square().mean();
  }

  train = (xs, ys, numIterations) => {
    for (let i = 0; i < numIterations; i++) {
      this.state.optimizer.minimize(() => {
        const yy = this.predict(xs);
        return this.loss(yy, ys);
      })
    }
  }

  dcomponentWillMount() {
    // Define model
    // y = a * x + b

    // Specify the loss function and the backpropagation algorithm
    const learningRate = 0.1;
    const optimizer = tf.train.sgd(learningRate);

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
        <HousePriceChart sqft={this.state.sqft} prices={this.state.prices} />
        /*<LineChart
          data={[predictions]}
          axes
          interpolate={'cardinal'}
          axisLabels={{x: 'My x', y: 'My y'}}
          width={960}
          height={540}
        />
        */
      </div>
    );
  }
}

export default LinearModel;
