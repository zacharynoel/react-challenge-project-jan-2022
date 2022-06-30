import React, { Component } from 'react';
import RegisterForm from './register-form/registerForm';
import './register.css';

class Register extends Component {
  
  render() {
    return (
      <div className="main-body">
        <h1 className="text-center">Registration Screen</h1>
        <div className="d-flex justify-content-center mt-5">
          <RegisterForm onRegister={() => {this.props.history.push('/login')}}/>
        </div>
        <div className="back-to-login-button">
          <button onClick={() => {this.props.history.push('/login')}} className="btn btn-primary">Back to Login</button>
        </div>
      </div>
    )
  }
}

export default Register;