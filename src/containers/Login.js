import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import deepEqual from 'deep-equal';
import queryString from 'query-string';
import LoaderButton from '../components/LoaderButton';
import { login } from '../store/modules/user';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: ''
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    this.props.login(this.state);
  };

  // https://stackoverflow.com/a/37144467/3970755
  shouldComponentUpdate(nextProps, nextState) {
    if (
      deepEqual(this.props, nextProps, true) &&
      deepEqual(this.state, nextState, true) &&
      !this.state.isLoading
    ) {
      console.log('do not update');
      return false;
    }
    console.log('update');
    return true;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isLoading: false });
    if (nextProps.isAuthenticated) {
      const { redirect: pathname, search } = queryString.parse(
        nextProps.location.search
      );
      push({ pathname, search });
    }
  }

  renderLoginForm = () => {
    return (
      <div className="Login">
        <div className="auth-box-w">
          <div className="logo-w">
            <a href="index.html">
              <img alt src="/img/logo-big.png" />
            </a>
          </div>
          <h4 className="auth-header">Login Form</h4>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor>Username</label>
              <input
                id="email"
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
                className="form-control login-form-control"
                placeholder="Enter your username"
              />
              <div className="pre-icon os-icon os-icon-user-male-circle" />
            </div>
            <div className="form-group">
              <label htmlFor>Password</label>
              <input
                value={this.state.password}
                onChange={this.handleChange}
                id="password"
                type="password"
                className="form-control login-form-control"
                placeholder="Enter your password"
                type="password"
              />
              <div className="pre-icon os-icon os-icon-fingerprint" />
            </div>
            <div className="buttons-w">
              <LoaderButton
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Login"
                loadingText="Logging in…"
              />
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" />Remember
                  Me
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="testimonials-w relative" id="sectionTestimonials">
        <div className="fade4" />
        <div className="testimonials-i">
          <div className="os-container">{this.renderLoginForm()}</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = { login };

const mapStateToProps = state => {
  console.log('Login mapStateToProps', !!state.user.authed);
  return {
    isAuthenticated: !!state.user.authed,
    attempts: state.user.attempts // so componentWillReceiveProps will get called.
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
