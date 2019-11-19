import React, { Component } from "react";

import { Dropdown, Button, ButtonGroup } from "react-bootstrap";

class BookInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", isbn: "", author: "" };

    this.divClick = this.divClick.bind(this);
  }

  divClick(e) {
    if (e.target.dataset.space !== "button") {
      this.props.handleBookClick(this.props.isbn);
    }
  }

  handleClick = e => {
    console.log(e.target.name);
  };

  render() {
    return (
      <div
        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        onClick={e => this.divClick(e)}
      >
        <div className="flex-column">
          {this.props.title}
          <p>
            <small>by {this.props.author}</small>
          </p>

          <ButtonGroup>
            <Button
              name="upButton"
              variant="info border-right"
              onClick={e => this.handleClick(e)}
              data-space="button"
            >
              Up
            </Button>
            <Button
              name="reviewButton"
              variant="info border-left border-right"
              onClick={e => this.handleClick(e)}
              data-space="button"
            >
              Review It!
            </Button>
            <Button
              name="downButton"
              variant="info border-left"
              onClick={e => this.handleClick(e)}
              data-space="button"
            >
              Down
            </Button>
          </ButtonGroup>
        </div>

        <div className="image-parent">
          <img
            src={`https://covers.openlibrary.org/b/id/${this.props.cover}-M.jpg`}
            height="150"
            width="100"
            alt={this.props.title}
          />
        </div>
      </div>
    );
  }
}

export default BookInfo;
