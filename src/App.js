import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import Routes from './Routes';
import { login, logout } from './store/modules/user';
import { connect } from 'react-redux';

import RouteNavItem from './components/RouteNavItem';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticating: false
    };
  }

  //https://stackoverflow.com/a/38563897/3970755
  componentDidMount() {
    console.log('===== App componentDidMount	 =====');
    if (typeof Storage !== 'undefined' && localStorage.getItem('user')) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log('===== App sent auth user request =====');
        this.setState({ isAuthenticating: true });
        this.props.login(user);
      } catch (err) {
        localStorage.removeItem('user');
        console.error(err);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authAttempts) {
      this.setState({ isAuthenticating: false });
    }
  }

  render() {
    if (this.state.isAuthenticating) {
      return <div>Authenticating user</div>;
    }

    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">AVAIL</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.props.isAuthenticated ? (
                <NavItem onClick={this.props.logout}>Logout</NavItem>
              ) : (
                [
                  <RouteNavItem key={1} href="/signup/">
                    Signup
                  </RouteNavItem>,
                  <RouteNavItem key={2} href="/login/">
                    Login
                  </RouteNavItem>
                ]
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={{ isAuthenticated: this.props.isAuthenticated }} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('App mapStateToProps', !!state.user.authed);
  return {
    isAuthenticated: !!state.user.authed,
    authAttempts: state.user.attempts
  };
};

const mapDispatchToProps = { login, logout };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
