import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface ModalProps {
  data?: {
    imageUrl?: string;
    description?: string;
  };
  onClose: () => void;
}

const CustomModal: React.FC<ModalProps> = ({ data, onClose }) => {
  return (
    <Modal size="sm" show={!!data} onHide={onClose} animation={true}  aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title>Product Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={
            data?.imageUrl
              ? data?.imageUrl
              : "https://cdn.dribbble.com/users/1787505/screenshots/7300251/shot.gif"
          }
          alt="Product"
          style={{width:"100%",height:"250px"}}
        //   style={{ maxWidth: "100%" }}
        />
        <p>{data?.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
