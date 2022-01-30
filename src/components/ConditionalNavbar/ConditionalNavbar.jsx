import React, { useContext } from "react";
import { NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Polygon from "../../assets/img/Polygon.png";
import LogoutIcon from "../../assets/img/logout 1.png";
import PayIcon from "../../assets/img/bill 1.png";
import Vinyl from "../../assets/img/vinyl 1.png";
import Artist from "../../assets/img/artist.png";

import "./ConditionalNavbar.css";

import { UserContext } from "../../context/UserContext";

export default function ConditionalNavbar(props) {
  const [state] = useContext(UserContext);
  return (
    <div>
      {props.isLogin ? (
        Number(state.user.status) !== 1 ? (
          <>
            <NavDropdown
              align="end"
              title={
                <img
                  src={`
              https://avatars.dicebear.com/api/bottts/${state.user.fullname}.svg`}
                  width="50px"
                  height="50px"
                  alt="ava"
                  className="rounded-circle"
                />
              }
              id="dropdown-menu-align-end"
            >
              <img src={Polygon} alt="ico" className="position-absolute" style={{ top: "-20px", left: "80%", width: "30px" }} />
              <Link className="fw-bold my-2 dropdown-item" to="/pay">
                <img src={PayIcon} className="me-2" alt="ico" /> Pay
              </Link>
              <NavDropdown.Divider className="bg-light" />
              <Link className="fw-bold my-2 dropdown-item" to="/" onClick={props.handleLogout}>
                <img src={LogoutIcon} className="me-2" alt="ico" /> Logout
              </Link>
            </NavDropdown>
          </>
        ) : (
          <>
            <NavDropdown
              align="end"
              title={
                <img
                  src={`
              https://avatars.dicebear.com/api/bottts/${state.user.fullname}.svg`}
                  width="50px"
                  height="50px"
                  alt="ava"
                  className="rounded-circle"
                />
              }
              id="dropdown-menu-align-end"
            >
              <img src={Polygon} alt="ico" className="position-absolute" style={{ top: "-20px", left: "80%", width: "30px" }} />
              <Link className="fw-bold my-2 dropdown-item" to="/add-music">
                <img src={Vinyl} className="me-2" alt="ico" /> Add Music
              </Link>
              <Link className="fw-bold my-2 dropdown-item" to="/add-artist">
                <img src={Artist} className="me-2" alt="ico" /> Add Artist
              </Link>
              <NavDropdown.Divider className="bg-light" />
              <Link className="fw-bold my-2 dropdown-item" to="/" onClick={props.handleLogout}>
                <img src={LogoutIcon} className="me-2" alt="ico" /> Logout
              </Link>
            </NavDropdown>
          </>
        )
      ) : (
        <>
          <Button variant="outline-light" onClick={props.handleShowLogin} className="me-2 px-3">
            Login
          </Button>
          <Button variant="outline-light" onClick={props.handleShowRegister} className="me-2 bg-orange">
            Register
          </Button>
        </>
      )}
    </div>
  );
}
