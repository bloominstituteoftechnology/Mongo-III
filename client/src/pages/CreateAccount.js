import React, { Component } from 'react';
import axios from 'axios';
import { FormControl, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Login.css";

export default class CreateAccount extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
    this.handleSet = this.handleSet.bind(this);
    this.createUser = this.createUser.bind(this);
  }
  handleSet(e) {
    const { name, value } = e.target;
    this.setState({[name]: value});
  }
  createUser(e) {
    e.preventDefault();
    const { email, password, firstName, lastName } = this.state;
    const userToSave = { email, password, firstName, lastName};
    axios.post('http://localhost:3030/user/new', userToSave)
      .then((data) => {
        localStorage.setItem('uuID', data.data._id);
        setTimeout(() => {
          window.location = '/posts';
        }, 200);
      })
      .catch((err) => {
        console.log({'error': err.response.error});
      });
  }
  render() {
    return (
      <form className="Login-form">
        <FormGroup className="Login-group" controlId="formHorizontalEmail">
          User Name
          <FormControl 
            id="formHorizontalEmail"
            className="form-control"
            onChange={this.handleSet} 
            name="email"
            placeholder="Email"
            type="email" 
            value={this.state.email} 
          />
        
        </FormGroup>
        <FormGroup className="Login-group" controlId="formHorizontalPassword">
          Password
          <FormControl 
            id="formHorizontalPassword"
            className="form-control"
            onChange={this.handleSet}
            name="password"
            placeholder="Password"
            type="password" 
            value={this.state.password} 
          />
        </FormGroup>
        <FormGroup className="Login-group" controlId="formHorizontalFirstName">
          First Name
          <FormControl 
            id="formHorizontalFirstName"
            className="form-control"
            onChange={this.handleSet}
            name="firstName" 
            placeholder="First Name"
            type="text" 
            value={this.state.firstName} 
          />
        </FormGroup>
        <FormGroup className="Login-group" controlId="formHorizontalLastName">
          Last Name
          <FormControl 
            id="formHorizontalLastName"
            className="form-control"
            onChange={this.handleSet}
            name="lastName" 
            placeholder="Last Name"
            type="text" 
            value={this.state.lastName} 
          />
          <Link to="/">Already a member? Login here.</Link>
          <br/>
          <button className="btn btn-default" onClick={this.createUser}>Create Account</button>
        </FormGroup>
      </form>
    )
  }
}
