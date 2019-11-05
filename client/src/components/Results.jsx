import React, { Component } from "react";

import BookAPI from "../modules/BookAPI";

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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.props.location.state.searchText) {
      this.onTermSubmit(this.props.location.state.searchText);
    }
  }

  onTermSubmit = async term => {
    const response = await BookAPI.get(`${term}`);
    this.setState({
      results: response.data
    });
  };

  render() {
    if (!this.state.results.docs) {
      return <div>Loading...</div>;
    } else if (this.state.results.numFound === 0) {
      return <div>No results found</div>;
    }
    return <div>{this.state.results.docs[0].title} </div>;
  }
}

export default Results;
