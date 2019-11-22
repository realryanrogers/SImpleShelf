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

  showReviews = () => {
    if (!this.props.ratings[0]) {
      return "Loading";
    } else {
      console.log("Review Ratings: ", this.props.ratings);
      return (
        <ul className="list-group">
          {this.props.ratings.map((docs, key) => (
            <BookInfo
              title={docs.bookInfo ? docs.bookInfo.volumeInfo.title : "Unknown"}
              cover={docs.google_id ? docs.google_id : "cover"}
              author={
                docs.bookInfo ? docs.bookInfo.volumeInfo.authors[0] : "Unknown"
              }
              google_id={docs.bookInfo ? docs.bookInfo.id : "Unknown"}
              key={key.toString()}
              handleBookClick={this.props.handleBookClick}
              rating={docs.value}
              handleRatingClick={this.props.handleRatingClick}
            />
          ))}
        </ul>
      );
    }
  };

  componentDidMount() {
    if (this.props.loggedInStatus === "true") {
    }
  }

  componentDidUpdate() {
    if (this.props.loggedInStatus === "true") {
      console.log("State: ", this.state);
    }
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <div>
          <h2>
            {this.state.user_firstName
              ? `${this.state.user_firstName} ${this.state.user_lastName}`
              : ""}
          </h2>
        </div>
        <div>{this.showReviews()}</div>
      </div>
    );
  }
}
