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

  render() {
    console.log(this.props);
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </form>
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
