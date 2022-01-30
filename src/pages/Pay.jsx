import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";

import { API } from "../config/API";

import Attache from "../assets/img/attache.png";

export default function Pay() {
  const title = "Add Payment";
  document.title = title + " | DumbSound";
  const [attache, setAttache] = useState(null);
  const handleChange = (e) => {
    setAttache(e.target.files);
  };
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("attache", attache[0], attache[0].name);

      // // //check formData entries
      // for (let key of formData.entries()) {
      //   console.log(key[0] + ", " + typeof key[1]);
      // }

      const response = await API.post("/payment", formData, config);

      if (response.data.status === "success") {
        setMessage(
          <Alert variant="success" className="w-50 offset-3">
            Your payment has been successfully added
          </Alert>
        );
        setAttache(null);
      } else if (response.data.status === "error") {
        const alert = (
          <Alert variant="danger" className="w-50 offset-3">
            {response.data.message}
          </Alert>
        );
        setMessage(alert);
        setAttache(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-white vh-100 container text-center pt-5">
      <h3 className="mt-5 mb-3">Premium</h3>
      <p>
        Bayar sekarang dan nikmati streaming music yang kekinian dari <span className="text-orange">DUMB</span>SOUND{" "}
      </p>
      <p>
        <span className="text-orange">DUMB</span>SOUND : 0981312323
      </p>
      {message}
      <Form className="w-50 offset-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control type="text" placeholder="Input your account number" className="bg-input" disabled />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <label disabled htmlFor="upload" className="form-control bg-input text-start">
            Attache proof of transfer
            <img src={Attache} alt="atc" className="ms-3" />
          </label>
          <input type="file" id="upload" name="thumbnail" hidden onChange={handleChange} />
        </Form.Group>
        <Button type="submit" className="bg-orange w-100 mt-4 text-white">
          Send
        </Button>
      </Form>
    </div>
  );
}
