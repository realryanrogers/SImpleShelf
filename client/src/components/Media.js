import React, { Component } from "react";

class Media extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props.match.params["id"]);
    return <div></div>;
  }
}

export default Media;
