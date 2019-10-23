
import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { isNull } from "util";
import { handleRegister } from '../../actions/Auth.action';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errors: {}
    }
  }

  isValid = (name, value) => {
    const { data, errors } = this.state
    switch (name) {
      case "email":
        if (true) {
          errors.email = "wanning"
          return false;
        }
        delete errors.email
        return true;
      case "password":
        if (!isNull(value)) {
          errors.password = "wanning"
          return false;
        }
        delete errors.password
        return true
      case "password-cf":
        if (value === data.password) {
          errors.passwordCf = "wanning"
          return false
        }
        delete errors.passwordCf
        return true

      default:
        return true
    }
  }

  handleChange = (e) => {
    const { data } = this.state;
    const { name, value } = e.target;


    if (this.isValid(name, value)) {
      this.setState({
        data: { ...data, [name]: value }
      })
    }
    else {
      console.log(`${name} error`)
    }

  }

  handleSubmit = (e) => {
    e.preventDefault()


    const { register, history } = this.props
    const { data, errors } = this.state

    if (Object.keys(errors).length)

      register(data).then(res => {
        history.push('/')
        console.log(res)
      }, err => {
        console.log(err)
      })




  }


  render() {

    return (
      <Container>
        <Card>
          <Card.Header>Register</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange} name="email" />
                {/* <Form.Error> lỗi</Form.Error> */}

              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.handleChange} name="password" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicPasswordCf">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password-confirm" onChange={this.handleChange} name="password-cf" />
                  </Form.Group>
                </Col>
              </Row>


              <Form.Group controlId="formBasicRealname">
                <Form.Label>Real name</Form.Label>
                <Form.Control type="text" placeholder="Realname" onChange={this.handleChange} name="realname" />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
        </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>);



  }
}

const mapStateToProps = state => state.Auth
const mapDispatchToProps = { register: handleRegister }

export default connect(mapStateToProps, mapDispatchToProps)(Register);