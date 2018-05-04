import * as tf from '@tensorflow/tfjs';

class MultidimensionalLinearRegression {
  constructor(learningRate = 0.01, epoches = 200) {
    this.learningRate = learningRate;
    this.epoches = epoches;
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({
      units: 256, inputShape: [4], kernelInitializer: 'randomUniform', activation: 'relu'
    }));
    this.model.add(tf.layers.dense({
      units: 128, kernelInitializer: 'randomUniform', activation: 'relu'
    }));
    this.model.add(tf.layers.dense({units: 1}));

    this.maxX1 = null;
    this.maxX2 = null;
    this.maxX3 = null;
    this.maxX4 = null;
    this.maxY = null;
  }

  train(x1s, x2s, x3s, x4s, yys, handleTrainingCompleted) {
    // Define loss function and optimizer
    const optimizer = tf.train.adam(this.learningRate);
    this.model.compile({loss: 'meanSquaredError', optimizer: optimizer});

    // Training data
    const normX1s = this.normalize(x1s);
    const normX2s = this.normalize(x2s);
    const normX3s = this.normalize(x3s);
    const normX4s = this.normalize(x4s);

    const inputData = [];
    for (let i = 0; i < x1s.length; i++) {
      inputData.push([normX1s[i], normX2s[i], normX3s[i], normX4s[i]]);
    }

    const xs = tf.tensor2d(inputData);
    const ys = tf.tensor2d(this.normalize(yys));

    // Set normalize values
    this.maxX1 = Math.max(...x1s);
    this.maxX2 = Math.max(...x2s);
    this.maxX3 = Math.max(...x3s);
    this.maxX4 = Math.max(...x4s);
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
    const normX1 = x[0] / this.maxX1;
    const normX2 = x[1] / this.maxX2;
    const normX3 = x[2] / this.maxX3;
    const normX4 = x[3] / this.maxX4;
    const result = this.model.predict(tf.tensor2d([normX1, normX2, normX3, normX4], [1, 4]));
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
