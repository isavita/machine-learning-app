import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import TopBar from './components/TopBar';
import Main from './components/Main';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <TopBar />
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
