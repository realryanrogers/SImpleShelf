import React, { Component } from "react";
import { Form, Col, Button } from "react-bootstrap";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }
  componentDidMount() {
    console.log("props, ", this.props);
    this.setState({
      user: this.props.user
    });
    console.log(this.state);
  }

  profileForm() {
    return (
      <div>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={
                  this.props.user.email ? this.props.user.email : "Enter Email"
                }
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </Form.Row>
          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="Recieve emails about updates to SimpleShelf"
            />

            <Form.Check
              type="checkbox"
              label="Recieve occasional emails about our other products"
            />
          </Form.Group>

          <hr />
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Update Password</Form.Label>
            <Form.Control type="password" placeholder="New Password" />
          </Form.Group>

          <Form.Group controlId="formBasicPasswordConf">
            <Form.Control
              type="password"
              placeholder="New Password Confirmation"
            />
          </Form.Group>
        </Form>
        <Button variant="info" type="submit">
          Submit
        </Button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.profileForm()}
        <br />
      </div>
    );
  }
}

export default Profile;
