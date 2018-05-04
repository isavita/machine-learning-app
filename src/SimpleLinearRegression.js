import * as tf from '@tensorflow/tfjs';

class SimpleLinearRegression {
  constructor(learningRate = 0.01, numIterations = 400) {
    this.learningRate = learningRate;
    this.numIterations = numIterations;
    this.maxX = 1;
    this.minY = 1;
    // Variables that we want to learn from the data
    this.a = tf.variable(tf.scalar(1.0));
    this.b = tf.variable(tf.scalar(1.0));
    this.optimizer = tf.train.sgd(learningRate);
  }

  predict(x) {
    // Uses line model: y = a * x + b; a - slope, b - intercept;
    return tf.tidy(() => {
      return this.a.mul(x).add(this.b);
    });
  }

  normPredict(x) {
    return tf.tidy(() => {
      const xs = tf.tensor1d([x / this.maxX]);
      return this.predict(xs).dataSync()[0] * this.maxY;
    });
  }

  loss(prediction, actual) {
    // Mean squared error: Sum[(y'[i] - y[i])^2, {i, 0, n}] / n
    const error = prediction.sub(actual).square().mean();
    return error;
  }

  train(xxs, yys, handleTrainingCompleted) {
    const xs = tf.tensor1d(this.normalize(xxs));
    const ys = tf.tensor1d(this.normalize(yys));

    let lossData = [];

    for (let iter = 0; iter < this.numIterations; iter++) {
      this.optimizer.minimize(() => {
        const prediction = this.predict(xs);
        const cost = this.loss(prediction, ys);
        lossData.push(cost.dataSync()[0]);
        return cost;
      });

      tf.nextFrame();
    }

    // Normalized values
    this.maxX = Math.max(...xxs);
    this.maxY = Math.max(...yys);

    handleTrainingCompleted(lossData);
  }

  normalize(zs) {
    // zs' = (zs - min(zs)) / (max(zs) - min(zs))
    const max = Math.max(...zs);
    const min = Math.min(...zs);
    const normZs = zs.map((z) => (z - min) / (max - min + 1));
    return normZs;
  }
}

export default SimpleLinearRegression;
