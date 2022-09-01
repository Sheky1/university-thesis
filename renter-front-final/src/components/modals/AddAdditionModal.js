import React from "react";
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";

import { connect } from "react-redux";
import ErrorModal from "./ErrorModal";

const AddAdditionModal = (props) => {
    return (
        <>
            <ErrorModal
                modal={props.errorModal}
                toggle={props.toggleError}
                text={props.errorText}
            />
            <Modal
                isOpen={props.modal}
                toggle={() => props.toggle()}
                backdrop="static"
                scrollable={true}
                size="lg"
            >
                <ModalHeader toggle={() => props.toggle()}>
                    Dodavanje dodatka
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup row style={{ width: "100%" }}>
                            <Label for="name" sm={4}>
                                Naziv dodatka
                            </Label>
                            <Col sm={8}>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Klima"
                                    value={props.name}
                                    onChange={(e) => {
                                        props.handleChange(e);
                                    }}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row style={{ width: "100%" }}>
                            <Label for="price" sm={4}>
                                Cena
                            </Label>
                            <Col sm={8}>
                                <Input
                                    type="number"
                                    name="price"
                                    id="price"
                                    placeholder="100"
                                    value={props.price}
                                    onChange={(e) => {
                                        props.handleChange(e);
                                    }}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row style={{ width: "100%" }}>
                            <Label for="currency" sm={4}>
                                Valuta
                            </Label>
                            <Col sm={8}>
                                <Input
                                    type="select"
                                    name="currency"
                                    id="currency"
                                    value={props.currency}
                                    onChange={(e) => {
                                        props.handleChange(e);
                                    }}
                                >
                                    {props.currencies.map((currency) => {
                                        return (
                                            <option key={currency.id}>
                                                {currency.name}
                                            </option>
                                        );
                                    })}
                                </Input>
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter className="modal-footer">
                    <Button
                        className="btn-primary btn-small btn-green"
                        onClick={() => {
                            props.submitForm();
                        }}
                        color="success"
                    >
                        Dodaj
                    </Button>{" "}
                    <Button
                        className="btn-primary btn-small btn-red"
                        onClick={() => props.toggle()}
                        color="danger"
                    >
                        Odustani
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default connect(null, null)(AddAdditionModal);
