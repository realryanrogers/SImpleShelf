import React, { Component } from "react";

import BookInfo from "./BookInfo";
import BookAPI from "../modules/BookAPI";
import { Card, Button } from "react-bootstrap";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.location.state.searchText,
      results: [],
      showFull: false
    };
    if (props.loggedInStatus !== "true") {
      props.history.push("/");
    }
  }
  componentDidMount() {
    this.onTermSubmit(this.props.location.state.searchText);
  }

  componentDidUpdate = prevProps => {
    if (
      prevProps.location.state.searchText !==
      this.props.location.state.searchText
    ) {
      this.setState({ results: [] });
      this.onTermSubmit(this.props.location.state.searchText);
    }
  };

  onTermSubmit = async term => {
    const response = await BookAPI.openLibSearch(term);
    this.setState({
      results: response.data
    });
  };

  showResults = () => {
    const resultData = this.state.results.docs.slice(0, 19);
    const sendBack = this.state.showFull ? this.state.results.docs : resultData;
    return (
      <ul className="list-group">
        {sendBack.map((docs, key) => (
          <BookInfo
            title={docs.title}
            cover={docs.cover_i}
            author={docs.author_name ? docs.author_name[0] : "Unknown"}
            isbn={docs.isbn ? docs.isbn[docs.isbn.length - 1] : "Unknown"}
            key={key.toString()}
            handleBookClick={this.props.handleBookClick}
          />
        ))}
      </ul>
    );
  };

  render() {
    if (!this.state.results.docs) {
      return <div>Loading...</div>;
    } else if (this.state.results.total === 0) {
      return <div>No results found</div>;
    }
    return (
      <div>
        <br />
        {this.showResults()}
      </div>
    );
  }
}

export default Results;
