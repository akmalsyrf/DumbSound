import React, { useState, useContext } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";

import { API } from "../config/API";
import { UserContext } from "../context/UserContext";

export default function RegisterModal(props) {
  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
  });

  const { fullname, email, password, gender, phone, address } = form;
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
      const response = await API.post("/register", body, config);
      console.log(response);

      if (response.data.status === "success") {
        const alert = <Alert variant="success">Success</Alert>;
        setMessage(alert);
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.data.user });

        setForm({
          fullname: "",
          email: "",
          password: "",
          gender: "",
          phone: "",
          address: "",
        });
        props.handleCloseRegister();
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
    <Modal show={props.showRegister} onHide={props.handleCloseRegister}>
      <Modal.Header closeButton className="bg-black text-light">
        <Modal.Title className="fw-bold">Register</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-black text-light">
        {message && message}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasictext">
            <input type="text" className="form-control bg-input" placeholder="Full Name" name="fullname" value={fullname} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <input type="email" className="form-control bg-input" placeholder="Email" name="email" value={email} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <input type="password" className="form-control bg-input" placeholder="Password" name="password" value={password} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasictext">
            <select className="form-control bg-input" aria-label="Default select example" name="gender" defaultValue={gender} onChange={handleChange}>
              <option value="" disabled>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasictext">
            <input type="number" className="form-control bg-input" placeholder="Phone" name="phone" value={phone} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasictext">
            <input type="text" className="form-control bg-input" placeholder="Address" name="address" value={address} onChange={handleChange} />
          </Form.Group>
          <Button type="submit" className="form-control col-12 bg-orange">
            Submit
          </Button>
          <p className="mt-3 text-center text-secondary">
            Already have an account ? Click{" "}
            <span
              onClick={() => {
                props.handleShowLogin();
                props.handleCloseRegister();
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
