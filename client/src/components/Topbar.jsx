import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  NavDropdown,
  Button
} from "react-bootstrap";

export default class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSearchSubmit(this.state.searchTerm);
  };

  render() {
    return (
      <Navbar bg="info" expand="md" variant="dark" sticky="top">
        <Navbar.Brand href="/" className="px-2 border-right">
          <img
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="logo"
          />{" "}
          SimpleShelf
        </Navbar.Brand>
        <div className="navbar-nav ml">
          {this.props.user && this.props.user.firstName
            ? this.props.user.firstName
            : "User"}
        </div>
        <Form inline onSubmit={this.handleSubmit}>
          <FormControl
            type="text"
            placeholder="Search ISBN or Title"
            className="ml-md-3"
            value={this.state.searchTerm}
            name="searchTerm"
            onChange={this.handleChange}
          />
        </Form>
        <Button variant="info" type="submit">
          Search
        </Button>
      </Navbar>
    );
  }
}
