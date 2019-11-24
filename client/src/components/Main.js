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
import BookAPI from "../modules/BookAPI";
import Rating from "../modules/Rating";

class Main extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: Auth.isLoggedIn().toString(),
      user: {},
      ratings: {}
    };
  }

  componentDidMount() {
    if (Auth.isLoggedIn().toString() === "true") {
      this.gettingUser().then(response => {
        this.setState({
          user: response
        });
      });
      this.gettingRatings().then(res => {
        this.setState({
          ratings: res.data
        });
        const sortedRating = this.state.ratings.map((rating, key) =>
          this.getBookDetails(rating, key)
        );
        Promise.all(sortedRating).then(completed =>
          this.setState({
            ratings: completed
          })
        );
      });
    }
  }

  async gettingRatings() {
    const ratings = await User.getUserRatings(localStorage.getItem("jwt"));
    return ratings;
  }

  async gettingUser() {
    const user = await User.getUserInfo(localStorage.getItem("jwt"));
    return user;
  }

  getBookDetails = async (book, key) => {
    /* From here, seperate out the books, pass each book into
    the details page. Only do top 20 to start, to keep the column */
    // const response = await BookAPI.getBookDetails(isbn);
    // return response;
    if (book.google_id) {
      const bookInfo = await BookAPI.getBook(book.google_id);

      const detailBook = { ...book, bookInfo };
      console.log(detailBook);
      return detailBook;
    } else {
      return book;
    }
  };

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

  handleRatingClick = async data => {
    if (data.value === "review") {
      this.props.history.push({
        pathname: `/bookdetail/${data.google_id}`,
        state: {
          showReviewField: true
        }
      });
    } else {
      console.log("Rate Click: ", data);
      const rating = Rating.build(data);
      console.log("Built Rating: ", rating);
      const response = await Rating.addRating(rating);
      console.log(response);
    }
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
                  ratings={this.state.ratings}
                  handleRatingClick={this.handleRatingClick}
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
                  handleRatingClick={this.handleRatingClick}
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
                  handleRatingClick={this.handleRatingClick}
                  userRatings={this.state.ratings}
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
