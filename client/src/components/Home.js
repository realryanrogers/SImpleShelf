import React, { Component } from 'react';
import Registraion from './auth/registration'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }


  handleSuccessfulAuth(data){
    localStorage.setItem("jwt", data.jwt);
    console.log(this.props);
    this.props.history.push('/dashboard');
  }

  render () {
    return(
      <div>
        <h1>Home</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <Registraion handleSuccessfulAuth={this.handleSuccessfulAuth}/>
      </div>
    );
  }
}
