import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LinearModel from './LinearModel';
import ComplexModel from './ComplexModel';
import Info from './Info';

const Home = () => (
  <h2>Home page</h2>
);

class Main extends Component {
  render() {
    return (
      <div className='main'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/linear-model' component={LinearModel} /> 
          <Route path='/complex-model' component={ComplexModel} />
          <Route path='/info' component={Info} />
        </Switch>
      </div>
    );
  }
}

export default Main;
