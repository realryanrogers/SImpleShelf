import React, { Component } from 'react';
import Registraion from './auth/registration'

export default class Home extends Component {
  render () {
    return(
      <div>
        <h1>Home</h1>
        <Registraion />
      </div>
    );
  }
}
