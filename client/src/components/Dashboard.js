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
          user_email: response.email,
          user_firstName: response.firstName,
          user_lastName: response.lastName
        });
      });
    }
  }

  render() {
    return (
      <div>
        <div>
          <div className="row">
            <h2>
              {this.state.user_firstName
                ? `${this.state.user_firstName} ${this.state.user_lastName}`
                : ""}
            </h2>
          </div>
          <div className="row"></div>
        </div>
      </div>
    );
  }
}
