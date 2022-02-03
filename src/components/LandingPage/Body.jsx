import React, { useState, useEffect, useContext } from "react";
import { Card, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { API } from "../../config/API";
import { UserContext } from "../../context/UserContext";

import LoginModal from "../LoginModal";
import PaymentModal from "../PaymentModal";
import RegisterModal from "../RegisterModal";
import Player from "./Player";

export default function Body() {
  const [musics, setMusics] = useState([]);

  //make state for query from search bar
  const [queryMusic, setQueryMusic] = useState("");

  //get musics from API
  const getAllMusic = async () => {
    try {
      //make a request to the server with the query
      const response = await API.get(`/musics?title=${queryMusic}`);
      setMusics(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllMusic();
  }, [queryMusic]); //when query changes, get all musics

  const [state] = useContext(UserContext);
  const [selectedMusic, setSelectedMusic] = useState(0);

  //modal state, if not login
  // modal register state
  const [showRegister, setShowRegister] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);
  //modal login state
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  //if user subscribe / not subscribe
  const history = useHistory();
  const selectMusic = (index) => {
    if (state.isLogin) {
      if (Number(state.user.subscribe) !== 0) {
        setSelectedMusic(index);
      } else {
        history.push("/pay");
      }
    } else {
      handleShowLogin();
    }
  };

  const loginModalProps = {
    showLogin,
    handleCloseLogin,
    handleShowRegister,
  };

  const registerModalProps = {
    showRegister,
    handleCloseRegister,
    handleShowLogin,
  };

  //cut title
  const cutTitle = (str) => {
    if (str.length > 17) {
      return (str = str.substring(0, 16) + "...");
    } else {
      return str;
    }
  };
  return (
    <div className="py-5">
      {state.isLogin && <PaymentModal />}
      <div className="row col-12">
        <h4 className="text-lg-end ms-lg-5 text-orange col-lg-7 text-sm-center col-sm-12">Dengarkan dan rasakan</h4>
        {/* search bar */}
        <Form className="offset-lg-1 col-lg-3 col-sm-12 text-sm-center row">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <input type="text" className="form-control bg-input" placeholder="Search Music" value={queryMusic} onChange={(e) => setQueryMusic(e.target.value)} />
          </Form.Group>
        </Form>
      </div>
      <div className="container-fluid d-flex justify-content-start flex-wrap ps-5">
        {/* card music */}
        {musics.length < 1 ? (
          <div className="row col-12">
            <h4 className="text-light text-center ms-1 mt-5">We can't find the data you mean</h4>
          </div>
        ) : (
          musics.map((msc, i) => {
            return (
              <Card onClick={() => selectMusic(msc.id - 1)} border="dark" className="rounded col-3 mt-3 ms-5" style={{ width: "12rem", backgroundColor: "#3A3A3A", cursor: "pointer" }}>
                <Card.Img variant="top" src={msc.thumbnail} alt="img" />
                <Card.Body className="text-white d-flex">
                  <div className="col-9">
                    <Card.Title>{cutTitle(msc.title)}</Card.Title>
                    <Card.Text>{msc.artist.name}</Card.Text>
                  </div>
                  <div className="ms-2">
                    <Card.Text>{msc.year}</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            );
          })
        )}
      </div>
      {state.isLogin ? Number(state.user.subscribe) !== 0 ? <Player musics={musics} selectedMusicIndex={selectedMusic} /> : "" : ""}

      <LoginModal {...loginModalProps} />
      <RegisterModal {...registerModalProps} />
    </div>
  );
}
