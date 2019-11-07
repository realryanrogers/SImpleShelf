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
    const response = await BookAPI.get(`${term}`);
    this.setState({
      results: response.data
    });
  };

  showResults = () => {
    console.log("results: ", this.state.results);

    const dataSlice = this.state.results.docs.slice(0, 25);

    return (
      <ul className="list-group">
        {dataSlice.map((docs, key) => (
          <BookInfo
            title={docs.title}
            coverKey={docs.cover_edition_key}
            author={docs.author_name ? docs.author_name[0] : "Unknown"}
            key={key.toString()}
          />
        ))}
      </ul>
    );
  };

  render() {
    if (!this.state.results.docs) {
      return <div>Loading...</div>;
    } else if (this.state.results.numFound === 0) {
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
