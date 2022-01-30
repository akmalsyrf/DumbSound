import React from "react";
import { Image, Modal, Button } from "react-bootstrap";

export default function ProofModal({ show, handleClose, proofImg }) {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="bg-dark text-light">
          <Modal.Title>Bukti Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <Image src={process.env.REACT_APP_PATH_PROOF + proofImg} alt="img" />
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light">
          <Button className="bg-orange" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
