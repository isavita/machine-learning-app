import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LinearModel from './LinearModel';
import ComplexModel from './ComplexModel';
import Info from './Info';

const Home = () => (
  <h2>Home page</h2>
);

const DigitRecognizer = () => (
  <h2>Digit Recognizer</h2>
);

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/linear-model' component={LinearModel} /> 
          <Route path='/complex-model' component={ComplexModel} />
          <Route path='/digit-recognizer' component={DigitRecognizer} />
          <Route path='/info' component={Info} />
        </Switch>
      </div>
    );
  }
}

export default Main;
