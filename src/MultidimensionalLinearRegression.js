import * as tf from '@tensorflow/tfjs';

class MultidimensionalLinearRegression {
  constructor(learningRate = 0.01, epoches = 200) {
    this.learningRate = learningRate;
    this.epoches = epoches;
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({
      units: 256, inputShape: [4], kernelInitializer: 'randomUniform'
    }));
    this.model.add(tf.layers.dense({
      units: 128, kernelInitializer: 'randomUniform'
    }));
    this.model.add(tf.layers.dense({units: 1}));
    this.maxX = null;
    this.maxY = null;
  }

  train(xxs, yys, handleTrainingCompleted) {
    // Define loss function and optimizer
    const optimizer = tf.train.adam(this.learningRate);
    this.model.compile({loss: 'meanSquaredError', optimizer: optimizer});

    // Training data
    const xs = tf.tensor1d(this.normalize(xxs));
    const ys = tf.tensor1d(this.normalize(yys));

    // Set normalize values
    this.maxX = Math.max(...xxs);
    this.maxY = Math.max(...yys);

    // Train
    let lossData = [];
    const callbacks = {
      onBatchEnd: (batch, logs) => {
        lossData.push(logs.loss);
      }
    };
    this.model.fit(xs, ys, { epoches: this.epoches, callbacks: callbacks})
      .then(() => {
        handleTrainingCompleted(lossData);
      });
  }

  predict(x) {
    const normX = x / this.maxX;
    const result = this.model.predict(tf.tensor2d([normX], [1, 4]));
    return Array.from(result.dataSync())[0] * this.maxY;
  }

  normalize(zs) {
    // zs' = (zs - min(zs)) / (max(zs) - min(zs))
    const max = Math.max(...zs);
    const min = Math.min(...zs);
    const normZs = zs.map((z) => (z - min) / (max - min + 1));
    return normZs;
  }
}

export default MultidimensionalLinearRegression;
