import React, { Component } from "react";
import axios from 'axios';

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: "",
      callTime: Date.now(),
      callQueue: [],
      searchResults: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleQueue = this.handleQueue.bind(this);
    this.addToQueue = this.addToQueue.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.handleQueue(), 1500);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleQueue() {

  }

  addToQueue(value) {
    let tempQueue = this.state.callQueue;
    tempQueue.push(value);
    this.setState({callQueue: tempQueue})
  }



  handleSubmit(e) {
    console.log("Event: ", e);
    e.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.addToQueue(event.target.value)
    if (this.state.callTime < Date.now() - 300) {
      this.searchParam(event.target.value);
      this.setState({callTime: Date.now()})
    }
  }

  async searchParam(param) {
    const query = param.replace(/\s/g, "+");
    console.log("query: ", query);
    if (!query) {
      return null;
    }
    if (query.length > 3) {
      console.log("Searching: ", query)
      await axios.get(
      `https://openlibrary.org/search.json?q=${query}`
    ).then(response => {
      this.setState({searchResults: response});
    }).catch(error => {
      console.log("Unable to fetch error", error);
    });
  }

  }
  showList(){
    if (this.state.searchResults.length > 0) {
      console.log("Shouwing: ", this.state.searchResults);
      return (
        <div>
          <ul>
            {this.state.searchResults.docs.map = result => (
              <li key={result.key}>{result.title}</li>
            )}
          </ul>
        </div>
      );
    } else {
      return
    }
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
          <hr />
          Found {this.state.searchResults.length}
        </form>
      </div>
    );
  }
}

export default BookSearch;
