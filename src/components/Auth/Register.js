import React, { useState } from "react";
import { Form, Button, Col, InputGroup, Container } from 'react-bootstrap';
import axios from 'axios'

export default function Register(props) {
    const [validated, setValidated] = useState(false);

    const data = {};
    const error = {}
    const handleSubmit = event => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const entity = { email: data.email, realname: data.realname, password: data.password }
            axios.post(process.env.REACT_APP_HOST_API_REGISTER, entity).then(res => {
                console.log(res);
                props.history.push("/");
            }).catch((err) => { console.log(err) })
        }

        setValidated(true);

    };
    const handleChange = event => {
        const { name, value } = event.target
        setValidated(true);
        if(name==="passwordCf"){
            if(value!==data.password){
                error[name]="khong giong"
            }
        }
        data[name] = value
    }

    return (
        <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="validationCustom01">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="email"
                        name="email"
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{error.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Row>

                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="password"
                            name="password"
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                        <Form.Label>Password comfirm</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="password"
                                placeholder="comfirm password"
                                aria-describedby="inputGroupPrepend"
                                required
                                name="passwordCf"
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                không giống
              </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="validationCustom02">
                    <Form.Label>Real name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="real name"
                        name="realname"
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                    />
                </Form.Group>
                <Button type="submit">Submit form</Button>
            </Form>
        </Container>
    );
}
