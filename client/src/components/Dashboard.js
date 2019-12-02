import React, { Component } from "react";
import User from "../modules/User";
import BookInfo from "./BookInfo";
import BookAPI from "../modules/BookAPI";
import { Tab, Tabs, Pagination } from "react-bootstrap";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    if (props.loggedInStatus !== "true") {
      props.history.push("/");
    }
    this.state = {
      user_id: "",
      user_email: "",
      ratings: {},
      page: 1
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
    if (book.book_identifier) {
      const bookInfo = await BookAPI.getBook(book.book_identifier);
      const detailBook = { ...book, bookInfo };
      return detailBook;
    } else {
      return book;
    }
  };

  generateLists = shelf => {
    if (this.props[shelf].data.length === 0) {
      return;
    }
    console.log("Data: ", this.props[shelf].data);
    return (
      <ul className="list-group">
        {this.props[shelf].data.map((docs, key) => (
          <BookInfo
            title={docs.bookInfo ? docs.bookInfo.volumeInfo.title : "Unknown"}
            cover={docs.book_identifier ? docs.book_identifier : "cover"}
            author={
              docs.bookInfo ? docs.bookInfo.volumeInfo.authors[0] : "Unknown"
            }
            google_id={docs.bookInfo ? docs.bookInfo.id : "Unknown"}
            key={key.toString()}
            handleBookClick={this.props.handleBookClick}
            rating={docs.rating ? docs.rating.value : null}
            handleRatingClick={this.props.handleRatingClick}
          />
        ))}
      </ul>
    );
  };

  showReviews = () => {
    if (
      typeof this.props.ratings.count === "undefined" ||
      typeof this.props.wishlist.count === "undefined"
    ) {
      return "Loading";
    } else {
      return (
        <Tabs
          defaultActiveKey="ratings"
          id="uncontrolled-tab-example"
          className=""
        >
          <Tab eventKey="ratings" title="Read">
            <br />
            {this.generateLists("ratings")}
            {this.paginationBasic()}
          </Tab>
          <Tab eventKey="wishlist" title="Queue">
            <br />
            {this.generateLists("wishlist")}
          </Tab>
        </Tabs>
      );
    }
  };

  handlePage = (e, number) => {
    this.props.handlePageCall(number);
    this.setState({
      page: number
    });

    e.stopPropagation();
  };

  paginationBasic = () => {
    if (typeof this.props.ratings.count === "undefined") {
      return;
    } else {
      let items = [];
      for (
        let number = 1;
        number <= Math.ceil(this.props.ratings.count / 20);
        number++
      ) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === this.state.page}
            onClick={e => this.handlePage(e, number)}
          >
            {number}
          </Pagination.Item>
        );
      }
      return <Pagination size="sm">{items}</Pagination>;
    }
  };

  componentDidMount() {}

  componentDidUpdate() {}

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
