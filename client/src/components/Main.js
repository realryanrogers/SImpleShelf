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
        console.log("TEST: ", response);
        this.setState({
          user: response
        });
      });
    }
  }

  async gettingUser() {
    const user = await User.getUserInfo(localStorage.getItem("jwt"));
    console.log("user: ", user);
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
    console.log("Search Input Main");
    if (term) {
      console.log("pushing");
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
    console.log(isbn);
    this.props.history.push(`/bookdetail/${isbn}`);
  };

  handleResetRequest = email => {
    console.log(email);
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
              exact
              path={"/"}
              render={props => (
                <Home
                  {...props}
                  loggedInStatus={Auth.isLoggedIn().toString()}
                />
              )}
            />
            <Route
              exact
              path={"/dashboard"}
              render={props => (
                <Dashboard
                  {...props}
                  loggedInStatus={Auth.isLoggedIn().toString()}
                  handleLogout={this.handleLogout}
                />
              )}
            />
            <Route
              exact
              path={"/media/:type/:id"}
              render={props => (
                <Media
                  {...props}
                  loggedInStatus={Auth.isLoggedIn().toString()}
                />
              )}
            />
            <Route
              exact
              path={"/results"}
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
              exact
              path={"/resetpassword"}
              render={props => (
                <ForgotPassword
                  {...props}
                  handleReset={this.handleResetRequest}
                />
              )}
            />
            <Route
              exact
              path={"/resetpassword/:id"}
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
