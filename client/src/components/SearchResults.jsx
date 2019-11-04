import React, { Component } from 'react';

class SearchResults extends Component {
  constructor(props){
    super(props);

  }

  render() {
    return(
      <div>{this.props.term}</div>
    );
  }
}

export default SearchResults;
