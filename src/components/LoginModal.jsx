import React, { useState, useContext } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

import { UserContext } from "../context/UserContext";
import { API } from "../config/API";

export default function LoginModal(props) {
  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);
      const response = await API.post("/login", body, config);
      // console.log(response);

      if (response.data.status === "success") {
        const alert = <Alert variant="success">Success</Alert>;
        setMessage(alert);

        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.data.user });

        setForm({
          email: "",
          password: "",
        });
        props.handleCloseLogin();
        setMessage(null);
      } else if (response.data.status === "error") {
        const alert = <Alert variant="danger">{response.data.message}</Alert>;
        setMessage(alert);
      }
    } catch (error) {
      const alert = <Alert variant="danger">Failed</Alert>;
      setMessage(alert);
      console.log(error);
    }
  };
  return (
    <Modal show={props.showLogin} onHide={props.handleCloseLogin}>
      <Modal.Header closeButton className="bg-black text-light">
        <Modal.Title className="fw-bold">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-black text-light">
        {message && message}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <input type="email" className="form-control bg-input" placeholder="Email" name="email" value={email} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <input type="password" className="form-control bg-input" placeholder="Password" name="password" value={password} onChange={handleChange} />
          </Form.Group>
          <Button type="submit" className="col-12 bg-orange">
            Submit
          </Button>
          <p className="mt-3 text-center text-secondary">
            Don't have an account ? Click{" "}
            <span
              onClick={() => {
                props.handleShowRegister();
                props.handleCloseLogin();
              }}
              role="button"
              className="fw-bold text-light text-decoration-none"
            >
              Here
            </span>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
