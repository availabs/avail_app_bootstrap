import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import Routes from './Routes';
// import { authUser, signOutUser } from "./libs/awsLib";
import { connect } from 'react-redux';

import RouteNavItem from './components/RouteNavItem';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: props.user.token ? true : false
    };
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated
    };

    return (
      !this.state.isAuthenticating && (
        <div className="App container">
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">This junk has to go.</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                {this.state.isAuthenticated ? (
                  <NavItem onClick={this.handleLogout}>
                    {this.props.user.token}Logout
                  </NavItem>
                ) : (
                  [
                    <RouteNavItem key={1} href="/signup">
                      Signup
                    </RouteNavItem>,
                    <RouteNavItem key={2} href="/login">
                      Login
                    </RouteNavItem>
                  ]
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes childProps={childProps} />
        </div>
      )
    );
  }
}

const mapDispatchToProps = {};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
