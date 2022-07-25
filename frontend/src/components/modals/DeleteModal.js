import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";

const DeleteModal = (props) => {
    return (
        <>
            <Modal
                isOpen={props.modal}
                toggle={() => props.toggle()}
                backdrop="static"
                scrollable={true}
                size="lg"
            >
                <ModalHeader toggle={() => props.toggle()}>
                    Brisanje!
                </ModalHeader>
                <ModalBody>
                    Da li ste sigurni da zelite da obrisete {props.text}?
                </ModalBody>
                <ModalFooter className="modal-footer">
                    <Button
                        className="btn-primary btn-small btn-green"
                        onClick={() => {
                            props.toggle();
                            props.deleteItem(props.id);
                        }}
                        color="success"
                    >
                        Siguran sam
                    </Button>{" "}
                    <Button
                        className="btn-primary btn-small btn-red"
                        onClick={() => props.toggle()}
                        color="danger"
                    >
                        Nisam siguran
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default DeleteModal;
