import React, { Component } from "react";
import User from "../modules/User";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    if (props.loggedInStatus !== "true") {
      props.history.push("/");
    }
    this.state = {
      user_id: "",
      user_email: ""
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  async gettingState() {
    const user = await User.getUserInfo(localStorage.getItem("jwt"));
    return user;
  }

  componentDidMount() {
    if (this.props.loggedInStatus === "true") {
      this.gettingState().then(response => {
        console.log("TEST: ", response);
        this.setState({
          user_id: response.id,
          user_email: response.email
        });
      });
    }
  }

  handleLogout() {
    localStorage.removeItem("jwt");
    this.props.history.push("/");
  }
  render() {
    return (
      <div>
        <div>
          <h2>Logged In: {this.props.loggedInStatus ? "Yes" : "No"}</h2>
          Email: {this.state.user_email}
          <p>
            <button onClick={this.handleLogout}>Logout</button>
          </p>
        </div>
      </div>
    );
  }
}
