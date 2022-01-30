import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import { API } from "../config/API";

export default function AddArtist() {
  const title = "Add Artist";
  document.title = title + " | DumbSound";
  const [form, setForm] = useState({
    name: "",
    old: "",
    type: "Solo",
    startCareer: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);
      await API.post("/artist", body, config);
      setMessage(<Alert variant="success">Artist has been successfully added</Alert>);
      setForm({
        name: "",
        old: "",
        type: "Solo",
        startCareer: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="vh-100 py-5 container">
      <h3 className="my-5 text-white">Add Artist</h3>
      {message}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <input type="text" className="form-control bg-input" placeholder="Name" name="name" value={form.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <input type="number" className="form-control bg-input" placeholder="Old" name="old" value={form.old} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Select aria-label="Default select example" className="bg-input" name="type" value={form.type} onChange={handleChange}>
            <option value="Solo">Solo</option>
            <option value="Band">Band</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <input type="text" className="form-control bg-input" placeholder="Start a Career" name="startCareer" value={form.startCareer} onChange={handleChange} />
        </Form.Group>
        <Button type="submit" className=" bg-orange offset-3 w-50 mt-4 text-white">
          Send
        </Button>
      </Form>
    </div>
  );
}
