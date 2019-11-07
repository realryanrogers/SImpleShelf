import React, { Component } from "react";

class BookInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", isbn: "", author: "" };
  }
  render() {
    return (
      <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div className="flex-column">
          {this.props.title}
          <p>
            <small>by {this.props.author}</small>
          </p>
        </div>
        <div className="image-parent">
          <img
            src={`https://covers.openlibrary.org/b/olid/${this.props.coverKey}-M.jpg`}
            className="img-fluid"
            alt="quixote"
          />
        </div>
      </div>
    );
  }
}

export default BookInfo;
