import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { registerUser } from '../../../redux/actions/authActions';

const mapActionsToProps = dispatch => ({
  commenceRegister(email, password) {
    return dispatch(registerUser(email, password))
  }
})

class RegisterForm extends Component {
  state = {
    email: "",
    password: "",
  }

  async register(e) {
    e.preventDefault();
    const response = await this.props.commenceRegister(this.state.email, this.state.password);

    if (!response.success) {
      alert('Registration failed: ' + response.error);
      return;
    }

    this.props.onRegister();
  }

  onChange(key, val) {
    this.setState({ [key]: val });
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="inputEmail">Email</label>
          <input type="text" className="form-control" id="inputEmail" placeholder="test@test.com" value={this.state.email} onChange={e => this.onChange('email', e.target.value)}></input>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input type="password" className="form-control" id="inputPassword" value={this.state.password} onChange={e => this.onChange('password', e.target.value)}></input>
        </div>
        <div className="d-flex justify-content-center">
            <button onClick={e => this.register(e)} type="submit" className="btn btn-primary">Register</button>
        </div>
      </form>
    );
  }
}

export default connect(null, mapActionsToProps)(RegisterForm);