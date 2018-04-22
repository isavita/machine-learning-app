import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class TopBar extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect staticTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='/'>AI</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem componentClass={Link} href='/linear-model' to='/linear-model' active={'location.pathname' === '/linear-model'}>
            Linear Model
          </NavItem>
          <NavItem componentClass={Link} href='/complex-model' to='/complex-model' active={'location.pathname' === '/complex-model'}>
            Complex Model
          </NavItem>
          <NavItem componentClass={Link} href='/digit-recognizer' to='/digit-recognizer' active={'location.pathname' === '/digit-recognizer'}>
            Digit Recognizer
          </NavItem>
          <NavItem componentClass={Link} href='/' to='/' active={'location.pathname' === '/'}>
            Links 
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default TopBar;
