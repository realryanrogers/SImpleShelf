import React, { Component } from "react";

class BookInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", isbn: "", author: "" };
  }
  render() {
    console.log("Props: ", this.props);
    return (
      <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div className="flex-column">
          {this.props.title}
          <p>
            <small>by {this.props.author}</small>
          </p>
        </div>
        <div className="image-parent">
          <img src={this.props.cover} alt="quixote" height="200px" />
        </div>
      </div>
    );
  }
}

export default BookInfo;
