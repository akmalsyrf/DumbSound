import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import Attache from "../assets/img/attache.png";

import { API } from "../config/API";

export default function AddMusic() {
  const title = "Add Music";
  document.title = title + " | DumbSound";

  //list artist
  const [listArtist, setListArtist] = useState([]);
  const getAllArtist = async () => {
    try {
      const response = await API.get("/artists");
      setListArtist(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllArtist();
  }, []);

  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    year: "",
    idArtist: "",
    attache: "",
  });

  const [previewThumbnail, setPreviewThumbnail] = useState(null);
  const [previewAudio, setPreviewAudio] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image and audio url for preview
    if (e.target.type === "file") {
      if (e.target.files[0].type === "image/jpeg") {
        let url = URL.createObjectURL(e.target.files[0]);
        setPreviewThumbnail(url);
      } else if (e.target.files[0].type === "audio/mpeg") {
        let url = URL.createObjectURL(e.target.files[0]);
        setPreviewAudio(url);
      }
    }
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
      formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name);
      formData.set("attache", form.attache[0], form.attache[0].name);
      formData.set("title", form.title);
      formData.set("year", Number(form.year));
      formData.set("idArtist", Number(form.idArtist));

      // //check formData entries
      // for (let key of formData.entries()) {
      //   console.log(key[0] + ", " + typeof key[1]);
      // }

      await API.post("/music", formData, config);
      setMessage(<Alert variant="success">Music has been successfully added</Alert>);
      setForm({
        title: "",
        thumbnail: "",
        year: "",
        idArtist: "",
        attache: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${previewThumbnail || previewAudio ? "" : "vh-100"} py-5 container`}>
      <h3 className="my-5 text-white">Add Music</h3>
      {message}
      {previewThumbnail && (
        <div>
          <img
            src={previewThumbnail}
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              objectFit: "cover",
            }}
            className="mb-3"
            alt="preview"
          />
        </div>
      )}
      {previewAudio && (
        <audio controls className="mb-3">
          <source src={previewAudio} type="audio/mpeg" />
        </audio>
      )}
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <Form.Group className="mb-3 col-8" controlId="exampleForm.ControlInput1">
            <input type="text" className="form-control bg-input" placeholder="Title" name="title" value={form.title} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3 col-4" controlId="exampleForm.ControlInput1">
            <label disabled htmlFor="uploadImg" className="form-control bg-input">
              Attache Thumbnail
              <img src={Attache} alt="atc" className="ms-3" />
            </label>
            <input type="file" id="uploadImg" name="thumbnail" hidden onChange={handleChange} />
          </Form.Group>
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <input type="text" className="form-control bg-input" placeholder="Year" name="year" value={form.year} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <select className="form-control bg-input" aria-label="Default select example" name="idArtist" defaultValue={form.idArtist} onChange={handleChange}>
            <option value="" disabled hidden>
              Singer
            </option>
            {listArtist.map((artist) => {
              return <option value={artist.id}>{artist.name}</option>;
            })}
          </select>
        </Form.Group>
        <Form.Group className="mb-3 col-2" controlId="exampleForm.ControlInput1">
          <label disabled htmlFor="uploadMsc" className="form-control bg-input">
            Attache Music
            <img src={Attache} alt="atc" className="ms-3" />
          </label>
          <input type="file" id="uploadMsc" name="attache" hidden onChange={handleChange} />
        </Form.Group>
        <Button type="submit" className="offset-3 w-50 mt-4 text-white bg-orange">
          Send
        </Button>
      </Form>
    </div>
  );
}
