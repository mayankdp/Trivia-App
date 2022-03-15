import React, { useState } from "react";
import { useNavigate } from "react-router";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthService from "../services/auth-service";

function Login() {
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [validated, setValidated] = useState(false);

    const validateForm = () => {
        let errors = {};

        if (!email) {
            errors.email = "An email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email format is invalid";
        }

        if (!password) {
            errors.password = "A password is required";
        }

        if (Object.keys(errors).length === 0) {
            setValidated(true);
            return true;
        } else {
            setFormErrors(errors);
            setValidated(false);
            return false;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return
        }

        AuthService.login(email, password)
            .then(() => {
                console.log("login success")
                history("/")
            })
            .catch((error) => {
                console.log("login failed: " + error)
            })
    }

    return (
        <div id="login_page">
            <Container>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            isInvalid={!!formErrors.email}
                            type="email"
                            placeholder="user@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {formErrors.email && (
                            <Form.Control.Feedback type="invalid">
                                {formErrors.email}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            isInvalid={!!formErrors.password}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {formErrors.password && (
                            <Form.Control.Feedback type="invalid">
                                {formErrors.password}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Button type="submit">Login</Button>

                </Form>
            </Container>
        </div>
    );
}

export default Login;