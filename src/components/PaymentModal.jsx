import React, { useContext, useEffect } from "react";
import { Image, Modal, Button } from "react-bootstrap";

import { useHistory } from "react-router";
import { UserContext } from "../context/UserContext";

import { API } from "../config/API";

import MakePay from "../assets/img/make-pay.png";

export default function PaymentModal() {
  const [state] = useContext(UserContext);

  const [show, setShow] = React.useState(Number(state.user.subscribe) !== 1 ? true : false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [paymentStatus, setPaymentStatus] = React.useState(false);
  const getPaymentStatus = async () => {
    const response = await API.get("/paymentStatus");
    if (response.data.data !== null) {
      setPaymentStatus(response.data.data);
    }
  };
  useEffect(() => {
    getPaymentStatus();
  }, []);

  const history = useHistory();
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="bg-dark text-light">
          <Modal.Title>DumbSound</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light text-center">
          <Image src={MakePay} style={{ width: "20rem" }} alt="img" />
        </Modal.Body>
        <Modal.Body className="bg-dark text-light">
          <h4>{paymentStatus === "Pending" ? "Kami sedang memverifikasi pembayaran anda" : "Dapatkan premium dan jelajahi dunia musik di DumbSound !"}</h4>
        </Modal.Body>
        {paymentStatus !== "Pending" ? (
          <Modal.Body className="bg-dark text-success">
            <h5 onClick={() => history.push("/pay")} style={{ cursor: "pointer" }}>
              Lets go to payment
            </h5>
          </Modal.Body>
        ) : (
          ""
        )}
        <Modal.Footer className="bg-dark text-light">
          <Button className="bg-orange" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
