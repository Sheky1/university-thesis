import React, { Component } from "react";
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

class AddSizeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            errorText: "",
        };
    }

    toggleError = () => this.setModal(!this.state.modal);

    setModal = (modal) => {
        if (this._isMounted) {
            this.setState({
                modal,
            });
        }
    };

    render() {
        return (
            <>
                <ErrorModal
                    modal={this.props.errorModal}
                    toggle={this.props.toggleError}
                    text={this.props.errorText}
                />
                <Modal
                    isOpen={this.props.modal}
                    toggle={() => this.props.toggle()}
                    backdrop="static"
                    scrollable={true}
                    size="lg"
                >
                    <ModalHeader toggle={() => this.props.toggle()}>
                        Dodavanje velicine
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label for="name" sm={4}>
                                    Naziv velicine
                                </Label>
                                <Col sm={8}>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        onChange={(e) => {
                                            this.props.handleChange(e);
                                        }}
                                    />
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter className="modal-footer">
                        <Button
                            className="btn-primary btn-small btn-green"
                            onClick={() => {
                                this.props.submitForm();
                            }}
                            color="success"
                        >
                            Dodaj
                        </Button>{" "}
                        <Button
                            className="btn-primary btn-small btn-red"
                            onClick={() => this.props.toggle()}
                            color="danger"
                        >
                            Odustani
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default connect(null, null)(AddSizeModal);
