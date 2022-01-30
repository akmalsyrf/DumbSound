import React, { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { API } from "../../config/API";
import { UserContext } from "../../context/UserContext";

import LoginModal from "../LoginModal";
import PaymentModal from "../PaymentModal";
import RegisterModal from "../RegisterModal";
import Player from "./Player";

export default function Body() {
  const [musics, setMusics] = useState([]);
  const getAllMusic = async () => {
    try {
      const response = await API.get("/musics");
      setMusics(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllMusic();
  }, []);

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
      <h4 className="text-center text-orange">Dengarkan dan rasakan</h4>
      <div className="container-fluid d-flex justify-content-start flex-wrap ps-5">
        {/* card music */}
        {musics.map((msc, i) => {
          return (
            <Card onClick={() => selectMusic(i)} border="dark" className="rounded col-3 mt-3 ms-5" style={{ width: "12rem", backgroundColor: "#3A3A3A", cursor: "pointer" }}>
              <Card.Img variant="top" src={process.env.REACT_APP_PATH_MUSIC + msc.thumbnail} alt="img" />
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
        })}
      </div>
      {state.isLogin ? Number(state.user.subscribe) !== 0 ? <Player musics={musics} selectedMusicIndex={selectedMusic} /> : "" : ""}

      <LoginModal {...loginModalProps} />
      <RegisterModal {...registerModalProps} />
    </div>
  );
}
