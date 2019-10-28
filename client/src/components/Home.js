import React, { Component } from 'react';
import Registraion from './auth/registration'
import Login from './auth/login'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    if (props.loggedInStatus === "true"){

      props.history.push('/dashboard');
    }
  }


  handleSuccessfulAuth(data){
    localStorage.setItem("jwt", data.jwt);
    console.log(this.props);
    this.props.history.push('/dashboard');
  }

  render () {
    return(
      <div className="container">
        <div className="row">
          <h1>Logged In: {this.props.loggedInStatus}</h1>
        </div>
        <div className="row">
          <div className="col-1" >
          </div>
          <div className="col-md">
            <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
          </div>
          <div className="col-md">
            <Registraion handleSuccessfulAuth={this.handleSuccessfulAuth}/>
          </div>
          <div className="col-1" >
          </div>
        </div>
      </div>
    );
  }
}
