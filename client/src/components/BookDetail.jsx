import React, { Component } from "react";
import BookAPI from "../modules/BookAPI";

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {}
    };
  }

  componentDidMount = () => {
    console.log(this.props);
    this.getBook(this.props.match.params.id);
  };

  getBook = async isbn => {
    const response = await BookAPI.getBook(isbn);
    console.log("detail response: ", response);
  };

  showResult = () => {
    return <div>{this.props.match.params.id}</div>;
  };

  render() {
    return <div>{this.showResult()}</div>;
  }
}

export default BookDetail;
