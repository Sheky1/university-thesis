import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorModal = (props) => {
    return (
        <>
            <Modal
                isOpen={props.modal}
                toggle={() => props.toggle()}
                backdrop="static"
                scrollable={true}
                size="lg"
            >
                <ModalHeader toggle={() => props.toggle()}>Greška </ModalHeader>
                <ModalBody style={{ textAlign: "center" }}>
                    <span
                        style={{
                            color: "red",
                            margin: "auto",
                            fontSize: "2rem",
                            display: "block",
                        }}
                    >
                        <FaExclamationTriangle />
                    </span>
                    {props.text}
                </ModalBody>
                <ModalFooter className="modal-footer">
                    <Button
                        className="btn-primary btn-small btn-red"
                        onClick={() => props.toggle()}
                        color="danger"
                    >
                        Ok
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ErrorModal;
