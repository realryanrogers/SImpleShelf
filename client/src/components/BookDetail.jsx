import React, { Component } from "react";
import BookAPI from "../modules/BookAPI";
import {
  Dropdown,
  Button,
  ButtonGroup,
  ProgressBar,
  Form,
  Jumbotron
} from "react-bootstrap";
import NavLink from "react-bootstrap/NavLink";

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      author: "",
      publish_date: "",
      title: "",
      isbn: "",
      cover: "",
      totalRatings: null,
      totalLikes: null,
      reviews: [],
      selfReview: "",
      isEditing: false
    };
  }

  handleChange = e => {
    if (e.target.name === "selfReview") {
      if (e.target.value.length < 1001) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  handleSubmit = e => {
    this.props.handleRatingClick({
      google_id: this.props.match.params.id,
      review: this.state.selfReview
    });
    this.setState({
      isEditing: false
    });
    e.preventDefault();
  };

  componentDidMount = () => {
    this.getBook(this.props.match.params.id);
    console.log(this.props);
    if (!this.state.selfReview) {
      this.setState({
        isEditing: true
      });
    }
  };

  getBook = async isbn => {
    const response = await BookAPI.getBook(isbn);
    const serverDetails = await BookAPI.getServerDetails(isbn);
    this.setState({});
    console.log("Server Deets: ", serverDetails);
    console.log("detail res", response.id);

    this.setState({
      author: response.volumeInfo ? response.volumeInfo.authors[0] : "Unknown",
      cover: response.id ? response.id : "undefined",
      title: response.volumeInfo.title,
      isbn: this.props.match.params.id,
      totalRatings: serverDetails.data.total,
      totalLikes: serverDetails.data.likes,
      reviews: serverDetails.data.text,
      selfReview: serverDetails.data.selfReview[0]
        ? serverDetails.data.selfReview[0].rating.review
        : "",
      isEditing: serverDetails.data.selfReview[0].rating.review ? false : true
    });
    console.log("State: ", this.state);
  };

  handleEdit = e => {
    this.setState({
      isEditing: true
    });
    e.preventDefault();
  };

  showReviewForm = () => {
    if (this.state.isEditing || !this.state.selfReview) {
      return (
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-md-6">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formReviewText">
                <Form.Label>
                  <b>Your Thoughts:</b>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  name="selfReview"
                  value={this.state.selfReview}
                  onChange={this.handleChange}
                />
                <h6
                  className={`pull-right ${
                    this.state.selfReview
                      ? this.state.selfReview.length > 950
                        ? "text-danger"
                        : "text-muted"
                      : "text-muted"
                  }`}
                >
                  {this.state.selfReview ? this.state.selfReview.length : 0}
                </h6>
              </Form.Group>
              <Button variant="info" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-md-6">
            <strong>Your Thoughts:</strong>

            <div className="border-left ml-2 px-2">
              {this.state.selfReview.split("\n").map((item, key) => {
                return (
                  <span key={key}>
                    {item}
                    <br />
                  </span>
                );
              })}
              <br />
              <br />
              <Button variant="info" onClick={this.handleEdit}>
                Edit
              </Button>
            </div>
          </div>
        </div>
      );
    }
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
            <img
              src={`http://books.google.com/books/content?id=${this.state.cover}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
              alt="cover"
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-3"></div>
          <div className="col-md-2">
            <p className="small">Total ratings: {this.state.totalLikes}</p>
          </div>
          <div className="col-md-2">
            <p className="small">Avg Rating:</p>{" "}
            <ProgressBar
              variant="info"
              now={(this.state.totalLikes / this.state.totalRatings) * 100}
            />
          </div>
        </div>
        {this.showReviewForm()}
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
