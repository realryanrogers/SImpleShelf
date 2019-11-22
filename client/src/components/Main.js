import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Auth from "../modules/Auth";
import Media from "./Media";
import Topbar from "./Topbar";
import Results from "./Results";
import User from "../modules/User";
import BookDetail from "./BookDetail";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

class Main extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: Auth.isLoggedIn().toString(),
      user: {}
    };
  }

  componentDidMount() {
    if (Auth.isLoggedIn().toString() === "true") {
      this.gettingUser().then(response => {
        this.setState({
          user: response
        });
      });
    }
  }

  async gettingUser() {
    const user = await User.getUserInfo(localStorage.getItem("jwt"));
    return user;
  }

  handleRoute = route => () => {
    this.props.history.push({ pathname: route });
  };

  handleSearchInput = event => {
    this.setState({
      searchText: event.target.value
    });
  };

  handleSearchSubmit = term => {
    if (term) {
      this.props.history.push({
        pathname: "/results",
        state: {
          searchText: term
        }
      });
    }
  };
  handleLogout = () => {
    localStorage.removeItem("jwt");
    this.props.history.push("/");
  };

  handleBookClick = isbn => {
    /* this.props.history.push(`/bookdetail/${isbn}`); */
    this.props.history.push(`/bookdetail/${isbn}`);
  };

  handleResetRequest = email => {
    Auth.sendRecoveryEmail(email);
  };

  handleSuccesfulReset = data => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="app">
        <Topbar
          handleSearchSubmit={this.handleSearchSubmit}
          loggedInStatus={Auth.isLoggedIn().toString()}
          user={this.state.user}
          handleLogout={this.handleLogout}
        />
        <div className="container">
          <Switch>
            <Route
              path={"/"}
              exact
              render={props => (
                <Home
                  {...props}
                  loggedInStatus={Auth.isLoggedIn().toString()}
                />
              )}
            />
            <Route
              path={"/dashboard"}
              exact
              render={props => (
                <Dashboard
                  {...props}
                  loggedInStatus={Auth.isLoggedIn().toString()}
                  handleLogout={this.handleLogout}
                  handleBookClick={this.handleBookClick}
                />
              )}
            />
            <Route
              path={"/media/:type/:id"}
              exact
              render={props => (
                <Media
                  {...props}
                  loggedInStatus={Auth.isLoggedIn().toString()}
                />
              )}
            />
            <Route
              path={"/results"}
              exact
              render={props => (
                <Results
                  {...props}
                  loggedInStatus={Auth.isLoggedIn().toString()}
                  handleBookClick={this.handleBookClick}
                />
              )}
            />
            <Route
              exact
              path={"/bookdetail/:id"}
              render={props => (
                <BookDetail
                  {...props}
                  loggedInStatus={Auth.isLoggedIn().toString()}
                />
              )}
            />
            <Route
              path={"/resetpassword"}
              exact
              render={props => (
                <ForgotPassword
                  {...props}
                  handleReset={this.handleResetRequest}
                />
              )}
            />
            <Route
              path={"/resetpassword/:id"}
              exact
              render={props => (
                <ResetPassword
                  {...props}
                  handleSuccesfulReset={this.handleSuccesfulReset}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
export default withRouter(Main);
