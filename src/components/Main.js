import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import SimpleLineModel from './SimpleLineModel';
import LinearModel from './LinearModel';
import ComplexModel from './ComplexModel';
import Info from './Info';

const Home = () => (
  <div>
    <h2>Machine Learning 100.9</h2>
    <img src='https://leonardoaraujosantos.gitbooks.io/artificial-inteligence/content/assets/neuralnetworks.png' />
  </div>
);

class Main extends Component {
  render() {
    return (
      <div className='main'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/simple-line-model' component={SimpleLineModel} />
          <Route exact path='/linear-model' component={LinearModel} />
          <Route exact path='/complex-model' component={ComplexModel} />
          <Route exact path='/info' component={Info} />
        </Switch>
      </div>
    );
  }
}

export default Main;
