import React, { Component } from "react";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.location.state.searchText
    };
    console.log("Results");
  }
  render() {
    console.log(this.props);
    return <div>{this.props.location.state.searchText}</div>;
  }
}

export default Results;
