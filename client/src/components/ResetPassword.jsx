import React, { Component } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      password: "",
      password_conf: "",
      resetErrors: ""
    };
    this.handleSuccesfulReset = this.props.handleSuccesfulReset.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    this.setState({
      token: this.props.match.params.id
    });
  }

  handleSubmit = e => {
    axios
      .patch(`/password_resets/${this.props.match.params.id}`, {
        password: this.state.password,
        password_confirmation: this.state.password_conf,
        token: this.state.token
      })
      .then(response => {
        if (response.data.status === "Password Reset") {
          this.setState({
            resetErrors: ""
          });
          this.props.handleSuccesfulReset(response.data);
        } else {
          this.setState({
            resetErrors: response.data.error
          });
        }
      })
      .catch(error => {
        this.setState({
          resetErrors: "Error!"
        });
      });
    e.preventDefault();
  };

  displayError = error => {
    if (error) {
      return <Alert variant="danger">{this.state.resetErrors}</Alert>;
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8 col-md-offset-4">
          <div className="panel panel-default">
            <div className="panel-body mt-4">
              <div className="text-center">
                <h2 className="text-center">Reset Password</h2>
                <p>Enter New Password</p>
                <div className="panel-body">
                  {this.displayError(this.state.resetErrors)}
                  <form
                    id="register-form"
                    autoComplete="off"
                    className="form"
                    method="post"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        name="token"
                        className="form-control"
                        id="token"
                        aria-describedby="tokenHelp"
                        placeholder="Reset Code"
                        value={this.state.token}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        aria-describedby="passwordHelp"
                        placeholder="Enter New Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="password_conf"
                        className="form-control"
                        id="password_conf"
                        placeholder="Confirm Password"
                        value={this.state.password_conf}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        name="recover-submit"
                        className="btn btn-lg btn-primary btn-block"
                        value="Reset Password"
                        type="submit"
                      />
                    </div>

                    <input
                      type="hidden"
                      className="hide"
                      name="token"
                      id="token"
                      value=""
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
