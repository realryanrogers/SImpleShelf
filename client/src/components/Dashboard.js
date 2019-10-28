import React, { Component } from 'react';
import User from '../modules/User'

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    if (props.loggedInStatus === "false"){
      props.history.push('/');
    }
    var user = User.getUserInfo(localStorage.getItem("jwt"));
    console.log("User return: ", user)
    this.state = {
      user_id: user.id,
      user_email: user.email
    }
  }
  render() {
    return (
      <div>
        <div>
          <h1></h1>

          <h2>Logged In: {this.props.loggedInStatus ? "Yes" : "No"}</h2>
          Email: {this.state.user_email}
        </div>
      </div>
    );
  }
}
