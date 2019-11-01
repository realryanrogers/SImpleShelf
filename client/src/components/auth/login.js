import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }


  handleSuccessfulAuth(data){
    localStorage.setItem("jwt", data.jwt);
    console.log(this.props);
    this.props.history.push('/dashboard');
  }

  handleChange(event){
    console.log("event", event.target)
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event){
    axios.post(
    "http://localhost:3001/login",
    {
      user: {
        email: this.state.email,
        password: this.state.password
      }
    },
    { withCredentials: true }
  ).then(response => {
    if (response.data.status === 'Logged In') {
      this.props.handleSuccessfulAuth(response.data);
    }
  }).catch(error => {
    console.log("authentication error", error);
  });
    event.preventDefault();
  }

  render () {
    return(
      <div>
      <h2>Login</h2>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="email" name="email" className="form-control" id="loginInputEmail" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="password" name="password" className="form-control" id="loginInputPassword" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
    );
  }
}
