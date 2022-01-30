import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";

import { UserContext } from "../context/UserContext";

import Icon from "../assets/img/icon.png";
import IconText from "../assets/img/icon-text.png";

import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import ConditionalNavbar from "./ConditionalNavbar/ConditionalNavbar";

export default function NavBar() {
  const [state, dispatch] = useContext(UserContext);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT", payload: {} });
  };

  // modal register state
  const [showRegister, setShowRegister] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  //modal login state
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  //props
  const conditionalNavbarProps = {
    handleShowLogin,
    handleShowRegister,
    isLogin: state.isLogin,
    handleLogout,
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

  //on scroll navbar
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset <= 400 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <>
      <Navbar className={isScrolled ? "bg-black" : ""} fixed="top">
        <Container>
          <Link to={state.isLogin ? (Number(state.user.status) !== 0 ? "/list-transfer" : "/home") : "/home"}>
            <img src={Icon} alt="ico" className="me-3" />
            <img src={IconText} alt="text" />
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <ConditionalNavbar {...conditionalNavbarProps} />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal {...loginModalProps} />
      <RegisterModal {...registerModalProps} />
    </>
  );
}
