import React, { Component } from "react";
import BookAPI from "../modules/BookAPI";
import { Dropdown, Button, ButtonGroup } from "react-bootstrap";

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      author: "",
      publish_date: "",
      title: "",
      isbn: "",
      cover: ""
    };
  }

  componentDidMount = () => {
    console.log(this.props);
    this.getBook(this.props.match.params.id);
  };

  getBook = async isbn => {
    const response = await BookAPI.getBook(isbn);
    console.log("detail response: ", response);
    const isbnstr = `ISBN:${this.props.match.params.id}`;
    this.setState({
      author: response.data[isbnstr].authors
        ? response.data[isbnstr].authors[0].name
        : "Unknown",
      cover: response.data[isbnstr].cover
        ? response.data[isbnstr].cover.medium
        : "undefined",
      title: response.data[isbnstr].title,
      isbn: this.props.match.params.id
    });
    console.log(this.state);
  };

  showResult = () => {
    return (
      <div>
        <div className="row mb-2">
          <div className="col-md-3"></div>
          <div className="col-md-3 mb-3">
            {this.state.title}
            <p>
              <small>by {this.state.author}</small>
            </p>
            <Dropdown as={ButtonGroup}>
              <Button variant="info mb-2" data-space="button">
                Read It!
              </Button>

              <Dropdown.Toggle
                split
                variant="info mb-2 mr-1"
                id="dropdown-split-basic"
                data-space="button"
              />

              <Dropdown.Menu>
                <Dropdown.Item href="#" data-space="button">
                  Already Read!
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#" data-space="button">
                  Send to Friend
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button
              variant="info mb-2"
              data-space="button"
              href="https://www.google.com"
            >
              Buy It!
            </Button>
          </div>
          <div className="col-3">
            <img src={this.state.cover} />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-3"></div>
          <div className="col-md-2">
            <p className="small">Total ratings: 2334</p>
          </div>
          <div className="col-md-2">
            <p className="small">Avg Rating: 2334</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-md-6">
            <h3>Recent Reviews:</h3>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <br />
        {this.showResult()}
      </div>
    );
  }
}

export default BookDetail;
