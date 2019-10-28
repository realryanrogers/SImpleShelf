import React, { Component } from 'react';
import axios from 'axios';



export default class Registration extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event){

    axios.post(
      "http://localhost:3001/registrations",
      {
        user: {
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation
        }
      },
      { withCredentials: true }
    ).then(response => {
      if (response.data.status === 'created') {
        this.props.handleSuccessfulAuth(response.data);
      }
    }).catch(error => {
      console.log("registration error", error);
    });
    event.preventDefault();
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div>
      <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input className="form-control" type="email" name="email" placeholder="email" value = { this.state.email } onChange = {this.handleChange} required />
        </div>
        <div className="form-group">
          <input className="form-control" type="password" name="password" placeholder="password" value = { this.state.password } onChange = {this.handleChange} required />
        </div>
        <div className="form-group">
          <input className="form-control" type="password" name="password_confirmation" placeholder="password confirmation" value = { this.state.password_confirmation } onChange = {this.handleChange} required />
        </div>
          <button className="btn btn-primary" type="Submit">Register</button>
        </form>
      </div>
    );
  }
}
