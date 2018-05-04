import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class TopBar extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect staticTop>
        <Nav>
          <NavItem componentClass={Link} href='/simple-line-model' to='/simple-line-model' active={'location.pathname' === '/linear-model'}>
            Simple Line Model
          </NavItem>
          <NavItem componentClass={Link} href='/linear-model' to='/linear-model' active={'location.pathname' === '/linear-model'}>
            Linear Model
          </NavItem>
          <NavItem componentClass={Link} href='/complex-model' to='/complex-model' active={'location.pathname' === '/complex-model'}>
            Complex Model
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
