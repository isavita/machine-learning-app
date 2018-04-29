import * as tf from '@tensorflow/tfjs';

class SimpleLinearRegression {
  constructor(learningRate = 0.1, numIterations = 100) {
    this.learningRate = learningRate;
    this.numIterations = numIterations;
    // Variables that we want to learn from the data
    this.a = tf.variable(tf.scalar(Math.random()));
    this.b = tf.variable(tf.scalar(Math.random()));
    this.optimizer = tf.train.sgd(learningRate);
  }

  predict(x) {
    // Uses line model: y = a * x + b
    return tf.tidy(() => (this.a.mul(tf.scalar(x)).add(this.b)));
  }

  loss(predictions, actuals) {
    // Mean squared error: Sum[(y'[i] - y[i])^2, {i, 0, n}] / n
    return predictions.sub(actuals).square().mean();
  }

  train(xxs, yys) {
    const xs = tf.tensor1d(xxs);
    const ys = tf.tensor1d(yys);
    for (let iter = 0; iter < this.numIterations; iter++) {
      this.optimizer.minimize(() => {
        const prediction = this.predict(xs);
        const cost = this.loss(prediction, ys);
        console.log(Array.from(cost.dataSync())[0]);
        return cost;
      });

      tf.nextFrame();
    }
  }
}

export default SimpleLinearRegression;
