import React, { Component } from "react";
import Registration from "./auth/registration";
import Login from "./auth/login";
import { Tabs, Tab, Alert } from "react-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    if (props.loggedInStatus === "true") {
      props.history.push("/dashboard");
    }
  }

  handleSuccessfulAuth(data) {
    localStorage.setItem("jwt", data.jwt);
    console.log(this.props);
    this.props.history.push("/dashboard");
  }

  handleError(shownError) {
    if (shownError === "login") {
      return <Alert variant="danger">Login Error! Please try again</Alert>;
    } else if (shownError === "registration") {
      return (
        <Alert variant="danger">Registration Error! Please try again</Alert>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
              <Tab eventKey="login" title="Login">
                <br />
                <Login
                  handleSuccessfulAuth={this.handleSuccessfulAuth}
                  handleError={this.handleError}
                />
              </Tab>
              <Tab eventKey="register" title="Register">
                <br />
                <Registration
                  handleSuccessfulAuth={this.handleSuccessfulAuth}
                  handleError={this.handleError}
                />
              </Tab>
            </Tabs>
          </div>
          <div className="col-md-3"></div>
        </div>

        {/*
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
          </div>
          
          <div className="col-md">
            <Registraion handleSuccessfulAuth={this.handleSuccessfulAuth} />
          </div> 
          
          <div className="col-3"></div>
        </div>
      
      */}
      </div>
    );
  }
}
