import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, withRouter, Redirect } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: props.searchTerm
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.handleSearch(this.state.searchTerm);

  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  navLoggedIn() {}

  navLoggedOut() {}



  render() {
    console.log("props: ", this.props.searchTerm);
    return (
      <div>
          {this.props.searchTerm != "" &&
            <Redirect to='/results' push/>
          }
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <button
              className="navbar-toggler navbar-toggler-right"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo03"
              aria-controls="navbarTogglerDemo03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <Link className="navbar-brand" to="/">
              SimpleShelf
            </Link>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav mr-auto mt-2 mt-md-0">
                <li className="nav-item active">
                  <a className="nav-link" href="#!">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  {/* What goes here? */}
                  <Link className="nav-link" to="./">
                    Link
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="#!">
                    Disabled
                  </a>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
                <input
                  className="form-control mr-sm-2"
                  name="searchTerm"
                  type="text"
                  placeholder="Search"
                  value={this.state.searchTerm}
                  onChange={this.handleChange}
                />
              </form>
            </div>
          </nav>

      </div>
    );
  }
}

export default Navbar;
