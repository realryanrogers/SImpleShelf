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
import Shelving from "../modules/Shelving";
import Profile from "./Profile";

class Main extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: Auth.isLoggedIn().toString(),
      user: {},
      ratings: {},
      wishlist: {}
    };
  }

  componentDidMount() {
    if (Auth.isLoggedIn().toString() === "true") {
      this.gettingUser().then(response => {
        this.setState({
          user: response
        });
      });

      this.gettingBooks("Rated").then(res => {
        this.setState({
          ratings: { data: res.data.books, count: res.data.totalCount }
        });
        const sortedRating = this.state.ratings.data.map((rating, key) =>
          this.getBookDetails(rating, key)
        );
        Promise.all(sortedRating).then(completed => {
          let totalratings = this.state.ratings.count;
          this.setState({
            ratings: { data: completed, count: totalratings }
          });
        });
      });
      this.gettingBooks("Wishlist").then(res => {
        const sortedWishlist = res.data.books.map((book, key) =>
          this.getBookDetails(book, key)
        );
        Promise.all(sortedWishlist).then(completed => {
          this.setState({
            wishlist: { data: completed, count: completed.length }
          });
        });
      });
    }
  }

  async gettingBooks(shelf, page = 1) {
    const books = await User.getUserBooks(
      localStorage.getItem("jwt"),
      shelf,
      page
    );
    return books;
  }

  async gettingUser() {
    const user = await User.getUserInfo(localStorage.getItem("jwt"));
    console.log("This is the user:", user);
    return user;
  }

  getBookDetails = async (book, key) => {
    /* From here, seperate out the books, pass each book into
    the details page. Only do top 20 to start, to keep the column */
    // const response = await BookAPI.getBookDetails(isbn);
    // return response;
    if (book.book_identifier) {
      const bookInfo = await BookAPI.getBook(book.book_identifier);
      const detailBook = { ...book, bookInfo };
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

  handlePageCall = page => {
    this.gettingBooks("Rated", page).then(res => {
      this.setState({
        ratings: { data: res.data.books, count: res.data.totalCount }
      });
      console.log("Ratings", this.state.ratings);
      let totalCount = this.state.ratings.count;
      const sortedRating = this.state.ratings.data.map((rating, key) =>
        this.getBookDetails(rating, key)
      );
      Promise.all(sortedRating).then(completed =>
        this.setState({
          ratings: { data: completed, count: totalCount }
        })
      );
    });
  };

  handleRatingClick = async data => {
    console.log("Rate Click: ", data);
    var rating;
    if (Number.isInteger(data.value)) {
      console.log("BUILDING RATED");
      // Add to rated shelf with the value
      rating = Shelving.build(data, "Rated");
    } else if (data.value === "seeReview") {
      console.log("Sending to review");
      this.props.history.push({
        pathname: `/bookdetail/${data.google_id}`,
        state: {
          showReviewField: true
        }
      });
    } else {
      // Build the rating with the shelf value that gets passed through
      console.log("Building ELSE");
      rating = Shelving.build(data, data.value);
    }
    console.log("RATING: ", rating);
    const response = await Shelving.addToShelf(rating);
    console.log(response);
    this.props.history.push({
      pathname: `/bookdetail/${data.google_id}`,
      state: {
        showReviewField: true
      }
    });
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
              path={"/profile"}
              exact
              render={props => (
                <Profile
                  {...props}
                  loggedInStatus={Auth.isLoggedIn().toString()}
                  user={this.state.user}
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
                  wishlist={this.state.wishlist}
                  handleRatingClick={this.handleRatingClick}
                  handlePageCall={this.handlePageCall}
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
