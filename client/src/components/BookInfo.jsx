import React, { Component } from "react";

import { Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

class BookInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", isbn: "", author: "" };

    this.divClick = this.divClick.bind(this);
  }

  divClick(e) {
    this.props.handleBookClick(this.props.google_id);
  }

  handleClick = (e, action) => {
    if (["up", "down"].includes(action)) {
    }
    this.props.handleRatingClick({
      google_id: this.props.google_id,
      value: action
    });
    e.stopPropagation();
  };

  render() {
    return (
      <div>
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
                variant={`${
                  this.props.rating === 5 ? "primary" : "info"
                } border-left hover-white`}
                onClick={e => this.handleClick(e, 5)}
                data-space="button"
              >
                <FontAwesomeIcon icon={faThumbsUp} data-space="button" />
              </Button>
              <Button
                name="reviewButton"
                variant="info border-left border-right"
                onClick={e => this.handleClick(e, "review")}
                data-space="button"
              >
                {`${this.props.review ? "See Review" : "Review It!"}`}
              </Button>
              <Button
                name="downButton"
                variant={`${
                  this.props.rating === 1 ? "primary" : "info"
                } border-left hover-white`}
                onClick={e => this.handleClick(e, 1)}
                data-space="button"
              >
                <FontAwesomeIcon
                  name="downIcon"
                  icon={faThumbsDown}
                  className="fa-flip-horizontal"
                  onClick={e => this.handleClick(e, 1)}
                />
              </Button>
            </ButtonGroup>
          </div>
          <div className="image-parent">
            <img
              src={`http://books.google.com/books/content?id=${this.props.cover}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
              height="150"
              width="100"
              alt={this.props.title}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BookInfo;
