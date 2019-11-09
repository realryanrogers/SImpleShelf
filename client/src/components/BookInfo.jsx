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
      console.log("clicked");
    }
  }

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
          <Dropdown as={ButtonGroup}>
            <Button variant="info" data-space="button">
              Read It!
            </Button>

            <Dropdown.Toggle
              split
              variant="info"
              id="dropdown-split-basic"
              data-space="button"
            />

            <Dropdown.Menu>
              <Dropdown.Item href="#" data-space="button">
                Want to!
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#" data-space="button">
                Send to Someone
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="image-parent">
          <img
            src={this.props.cover}
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
