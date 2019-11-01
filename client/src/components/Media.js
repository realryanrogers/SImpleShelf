import React, { Component } from "react";

class Media extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props.match.params["id"]);
    return <h1></h1>;
  }
}

export default Media;
