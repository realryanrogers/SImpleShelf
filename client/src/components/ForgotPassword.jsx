import React, { Component } from "react";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      token_sent: false
    };
    console.log(this.props);
    this.handleReset = this.props.handleReset.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.handleReset(this.state.email);
    this.setState({
      token_sent: true
    });
  };

  showForm = () => {
    console.log(this.props);
    if (!this.state.token_sent) {
      return (
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-body mt-4">
                <div className="text-center">
                  <h2 className="text-center">Forgot Password?</h2>
                  <p>You can reset your password here.</p>
                  <div className="panel-body">
                    <form
                      id="register-form"
                      role="form"
                      autoComplete="off"
                      className="form"
                      method="post"
                      onSubmit={this.handleSubmit}
                    >
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="glyphicon glyphicon-envelope color-blue"></i>
                          </span>
                          <input
                            id="email"
                            name="email"
                            placeholder="email address"
                            className="form-control"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                          />
                        </div>
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
    } else {
      return (
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-body mt-4">
                <div className="text-center">
                  <h2 className="text-center">Reset Link Sent</h2>
                  <p>Please check your email!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    return <div>{this.showForm()}</div>;
  }
}

export default ForgotPassword;
