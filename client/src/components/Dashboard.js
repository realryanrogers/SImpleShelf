import React, { Component } from "react";
import User from "../modules/User";
import { Dropdown } from "react-bootstrap";
import Rating from "../modules/Rating";
import BookInfo from "./BookInfo";
import BookAPI from "../modules/BookAPI";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    if (props.loggedInStatus !== "true") {
      props.history.push("/");
    }
    this.state = {
      user_id: "",
      user_email: "",
      ratings: {}
    };
  }

  async gettingState() {
    const user = await User.getUserInfo(localStorage.getItem("jwt"));
    return user;
  }

  async gettingRatings() {
    const ratings = await User.getUserRatings(localStorage.getItem("jwt"));
    return ratings;
  }

  getBookDetails = async book => {
    /* From here, seperate out the books, pass each book into
    the details page. Only do top 20 to start, to keep the column */
    // const response = await BookAPI.getBookDetails(isbn);
    // return response;
    if (book.type_id) {
      const bookAPIObject = await BookAPI.getBook(book.type_id);
      console.log(bookAPIObject);
    }

    const detailBook = { ...book, header: "3" };
    return detailBook;
  };

  showReviews = () => {
    if (!this.state.ratings[0]) {
      return "Loading";
    } else {
      return (
        <ul className="list-group">
          {this.state.ratings.map((docs, key) => (
            <BookInfo
              title={"Title"}
              cover={"cover"}
              author={"Unknown"}
              isbn={"Unknown"}
              key={key.toString()}
              handleBookClick={this.props.handleBookClick}
            />
          ))}
        </ul>
      );
    }
  };

  componentDidMount() {
    if (this.props.loggedInStatus === "true") {
      this.gettingRatings().then(res => {
        this.setState({
          ratings: res.data
        });
        const sortedRating = this.state.ratings.map((rating, key) =>
          this.getBookDetails(rating)
        );
        console.log(sortedRating);
      });
      this.gettingState().then(response => {
        this.setState({
          user_id: response.id,
          user_email: response.email,
          user_firstName: response.firstName,
          user_lastName: response.lastName
        });
      });
    }
  }

  componentDidUpdate() {
    if (this.props.loggedInStatus === "true") {
    }
  }

  render() {
    return (
      <div>
        <div>
          <div className="row">
            <h2>
              {this.state.user_firstName
                ? `${this.state.user_firstName} ${this.state.user_lastName}`
                : ""}
            </h2>
          </div>
          <div className="row">{this.showReviews()}</div>
        </div>
      </div>
    );
  }
}
