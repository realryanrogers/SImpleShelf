import React, { Component } from 'react';
import User from '../modules/User'

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    if (props.loggedInStatus === "false"){
      props.history.push('/');
    }
    this.state = {
      user_id: "",
      user_email: ""
    }

  }

  async gettingState(){
    await User.getUserInfo(localStorage.getItem("jwt")).then(response => {
      console.log("state return: ", response);
  }
);
  }

  componentDidMount(){

    this.gettingState();
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
