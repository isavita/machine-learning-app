import * as tf from '@tensorflow/tfjs';

class LinearRegression {
  constructor(learningRate = 0.1) {
    this.learningRate = learningRate;
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({units: 1, inputShape: [1]}));
  }

  train(xxs, yys) {
    // Define loss function and optimizer
    const optimizer = tf.train.sgd(this.learningRate);
    this.model.compile({loss: 'meanSquaredError', optimizer: optimizer});

    // Training data
    const xs = tf.tensor1d(this.normalize(xxs));
    const ys = tf.tensor1d(this.normalize(yys));

    // Train
    this.model.fit(xs, ys);
  }

  predict(x) {
    const normX = x / 5000;
    const result = this.model.predict(tf.tensor2d([normX], [1, 1]));
    return Array.from(result.dataSync())[0] * 2000000;
  }

  normalize(zs) {
    // zs' = (zs - min(zs)) / (max(zs) - min(zs))
    const max = Math.max(...zs);
    const min = Math.min(...zs);
    const normZs = zs.map((z) => (z - min) / (max - min));
    return normZs;
  }
}

export default LinearRegression;
