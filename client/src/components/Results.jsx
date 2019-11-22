import React, { Component } from "react";

import BookInfo from "./BookInfo";
import BookAPI from "../modules/BookAPI";

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
    const response = await BookAPI.bookSearch(term);
    console.log(response);
    this.setState({
      results: response.data
    });
  };

  showResults = () => {
    const resultData = this.state.results.items;
    const sendBack = this.state.showFull
      ? this.state.results.items
      : resultData;
    return (
      <ul className="list-group">
        {sendBack.map((item, key) => (
          <BookInfo
            title={item.volumeInfo.title}
            cover={item.id}
            author={
              item.volumeInfo.authors ? item.volumeInfo.authors[0] : "Unknown"
            }
            isbn={
              item.volumeInfo.industryIdentifiers
                ? item.volumeInfo.industryIdentifiers[0].identifier
                : "Unknown"
            }
            key={key.toString()}
            handleBookClick={this.props.handleBookClick}
          />
        ))}
      </ul>
    );
  };

  render() {
    if (!this.state.results.items) {
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
