import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, NavDropdown } from "react-bootstrap";

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
    console.log("submission handled");
    this.props.handleSearchSubmit(this.state.searchTerm);
  };

  render() {
    return (
      <Navbar bg="info" expand="md" variant="dark" sticky="top">
        <Navbar.Brand href="/">SimpleShelf</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline onSubmit={this.handleSubmit}>
            <FormControl
              type="text"
              placeholder="Search ISBN or Title"
              className="mr-sm-2"
              value={this.state.searchTerm}
              name="searchTerm"
              onChange={this.handleChange}
            />
          </Form>
          <Nav className="ml-auto">
            {/* <Nav.Link href="/">Profile</Nav.Link>
            <Nav.Link href="/">Logout</Nav.Link> */}
            <NavDropdown
              title={
                this.props.user && this.props.user.firstName
                  ? this.props.user.firstName
                  : "User"
              }
              id="basic-nav-dropdown"
              alignRight
            >
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Ratings</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Wishlist</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.props.handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
