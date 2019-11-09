import React, { Component } from "react";

import BookInfo from "./BookInfo";
import BookAPI from "../modules/BookAPI";
import { Card, Button } from "react-bootstrap";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.location.state.searchText,
      results: []
    };
    if (props.loggedInStatus !== "true") {
      props.history.push("/");
    }
  }
  componentDidMount() {
    this.onTermSubmit(this.props.location.state.searchText);
    console.log(process.env.ISBNDB_SECRET);
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
    const response = await BookAPI.bookSearch(`${term}`);
    console.log("respoine: ", response);
    this.setState({
      results: response.data
    });
  };

  showResults = () => {
    console.log("results: ", this.state.results);
    const resultData = this.state.results.books;

    return (
      <ul className="list-group">
        {resultData.map((books, key) => (
          <BookInfo
            title={books.title}
            cover={books.image}
            author={books.authors ? books.authors[0] : "Unknown"}
            isbn={books.isbn13 ? books.isbn13 : books.isbn10}
            key={key.toString()}
            handleBookClick={this.props.handleBookClick}
          />
        ))}
      </ul>
    );
  };

  render() {
    if (!this.state.results.books) {
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
