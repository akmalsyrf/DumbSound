import React from "react";
import { Container } from "react-bootstrap";
import ImgLandingPage from "../../assets/img/jumbotron.png";

export default function Jumbotron() {
  return (
    <Container fluid className="p-5" style={{ backgroundImage: `url(${ImgLandingPage})`, height: "512px" }}>
      <h1 className="text-center mt-5 pt-5" style={{ color: "#fff", textShadow: "2px 2px #1F1F1F" }}>
        Connect on DumbSound
      </h1>
      <p className="text-center text-break mx-auto" style={{ color: "#fff", textShadow: "1px 1px #1F1F1F", maxWidth: "680px", fontSize: "24px" }}>
        Discovery, Stream, and share a constantly expanding mix of music from emerging and major artists around the world
      </p>
    </Container>
  );
}
