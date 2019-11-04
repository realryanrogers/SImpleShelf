import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navLoggedIn() {}

  navLoggedOut() {}

  render() {
    return (
      <div>
        <Router>
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

            <Link className="navbar-brand" to="./">
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
              <form className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Search"
                />
              </form>
            </div>
          </nav>
        </Router>
      </div>
    );
  }
}

export default Navbar;
