import React, { Component } from 'react';
import Routes from './Routes';
import { login, logout } from './store/modules/user';
import SideNav from './components/SideNav/SideNav';
import { connect } from 'react-redux';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticating: true
    };
  }

  //https://stackoverflow.com/a/38563897/3970755
  componentDidMount() {
    if (typeof Storage !== 'undefined' && localStorage.getItem('user')) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log('===== App sent auth user request =====');
        this.setState({ isAuthenticating: true });
        this.props.login(user);
      } catch (err) {
        this.setState({ isAuthenticating: false });
        localStorage.removeItem('user');
        console.error(err);
      }
    }

    this.setState({ isAuthenticating: false });
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

    const childProps = { isAuthenticated: this.props.isAuthenticated };
    console.log(childProps);
    console.log('<rootProps>', this.props);
    if (this.props.routing.location.pathname === '/map') {
      return (
        <div>
          <SideNav />
          <div className="Map">
            <Routes childProps={childProps} />
          </div>
        </div>
      );
    }

    if (this.props.isAuthenticated) {
      return (
        <div>
          <SideNav />
          <div className="App App-Auth">
            <Routes childProps={childProps} />
          </div>
        </div>
      );
    }
    return (
      <div className="App ">
        <div className="row">
          <Routes childProps={childProps} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.user.authed,
    authAttempts: state.user.attempts,
    routing: state.routing
  };
};

const mapDispatchToProps = { login, logout };

export default connect(mapStateToProps, mapDispatchToProps)(App);
