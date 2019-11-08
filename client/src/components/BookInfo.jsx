import React, { Component } from "react";

import { Dropdown, Button, ButtonGroup } from "react-bootstrap"

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
          <Dropdown as={ButtonGroup}>
            <Button variant="info">Read It!</Button>

            <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Want to!</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-3">Send to Someone</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="image-parent">
          <img
            src={`https://covers.openlibrary.org/b/olid/${this.props.coverKey}-M.jpg`}
            height="150"
            width="90"
            alt={this.props.title}
          />
        </div>
      </div>
    );
  }
}

export default BookInfo;
