import React, { Component } from "react";

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    console.log("Event: ", e);
    e.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="identifier"
              className="form-control"
              id="identifier"
              aria-describedby="emailHelp"
              placeholder="ISBN"
              value={this.state.identifier}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default BookSearch;
