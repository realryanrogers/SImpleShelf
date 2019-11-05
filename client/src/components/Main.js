import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Auth from "../modules/Auth";
import Media from "./Media";
import Topbar from "./Topbar";
import Results from "./Results";

class Main extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: Auth.isLoggedIn().toString(),
      user: {}
    };
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

  render() {
    return (
      <div className="app">
        <Topbar handleSearchSubmit={this.handleSearchSubmit} />
        <div className="container">
        <Switch>
          <Route
            exact
            path={"/"}
            render={props => (
              <Home {...props} loggedInStatus={Auth.isLoggedIn().toString()} />
            )}
          />
          <Route
            exact
            path={"/dashboard"}
            render={props => (
              <Dashboard
                {...props}
                loggedInStatus={Auth.isLoggedIn().toString()}
              />
            )}
          />
          <Route
            exact
            path={"/media/:type/:id"}
            render={props => (
              <Media {...props} loggedInStatus={Auth.isLoggedIn().toString()} />
            )}
          />
          <Route
            exact
            path={"/results"}
            render={props => (
              <Results
                {...props}
                loggedInStatus={Auth.isLoggedIn().toString()}
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
