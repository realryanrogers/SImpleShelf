import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect, withRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Testpage from "./Testpage";
import Auth from "../modules/Auth";
import Media from "./Media";
import "../css/bootstrap-theme-BT.css";
import Navbar from "./Navbar";
import SearchResults from "./SearchResults"

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: Auth.isLoggedIn().toString(),
      user: {},
      searchTerm: ""
    };
  }



  render() {
    const handleSearch = (term) => {
      console.log(term);
      this.setState({
        searchTerm: term
      });

    }
    const removeTerm = () => {
      this.setState({
        searchTerm: ""
      })
    }

    return (

      <div className="app">
      <BrowserRouter>
       <Navbar {...this.props} loggedInStatus={Auth.isLoggedIn().toString()} handleSearch={handleSearch} searchTerm={this.state.searchTerm}/>

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
                <SearchResults
                  {...props}
                  loggedInStatus={Auth.isLoggedIn().toString()}
                  term={this.state.searchTerm}
                  removeTerm={this.removeTerm}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
