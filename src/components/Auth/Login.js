
import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { handleLogin } from '../../actions/Auth.action';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      error: null
    }
  }

  handleChange = (e) => {
    const { data } = this.state;
    const { name, value } = e.target;

    this.setState({
      data: { ...data, [name]: value }, error: null
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { login, history } = this.props
    const { data, error } = this.state

    login(data).then(() => {
      history.push('/')

    }).catch(err => {
      this.setState({ error: err.response.data.message })
      console.log(error)
    })

  }


  render() {
    const { error } = this.state
    return (
      <Container>
        <Card>
          <Card.Header>Login</Card.Header>
          <Card.Body>
            {error && (<Alert variant="danger">ERROR: {error}</Alert>)}
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange} name="email" required />
                <Form.Text className="text-muted">
                  We will never share your email with anyone else.
          </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={this.handleChange} name="password" required />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
        </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>);



  }
}

const mapStateToProps = state => state.Auth
const mapDispatchToProps = { login: handleLogin }

export default connect(mapStateToProps, mapDispatchToProps)(Login);