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
import { api_axios } from "../../api/api";
import { toast } from "react-toastify";
import { handleErrors } from "../../store/utilities";
import * as actions from "../../store/actions/index";

class AddSizeModal extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            errorModal: false,
            errorText: "",
            name: this.props.size.name,
        };
    }

    toggleError = () => this.setErrorModal(!this.state.errorModal);

    setErrorModal = (errorModal) => {
        if (this._isMounted) {
            this.setState({
                errorModal,
            });
        }
    };

    resetState = () => {
        this.setState({
            name: this.props.size.name,
        });
        this.props.toggle();
    };

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    };

    checkInputs = () => {
        if (this.state.name === "") {
            this.setState({
                errorText: 'Polje "Naziv veličine" je neophodno.',
            });
            this.toggleError();
            return true;
        }
    };

    onSubmit = async () => {
        try {
            if (this._isMounted) {
                if (this.checkInputs()) return;

                let { name } = this.state;

                let updatedSize = {
                    name,
                };

                const response = await api_axios(
                    "put",
                    `/vehicleSizes/${this.props.size.id}`,
                    updatedSize
                );
                toast.success("Uspešno izmenjena veličina.");
                this.props.updateSize(response.data.data);
                this.resetState();
            }
        } catch (error) {
            this.setState({
                errorText: handleErrors(error),
            });
            this.toggleError();
        }
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <>
                <ErrorModal
                    modal={this.state.errorModal}
                    toggle={this.toggleError}
                    text={this.state.errorText}
                />
                <Modal
                    isOpen={this.props.modal}
                    toggle={() => this.props.toggle()}
                    backdrop="static"
                    scrollable={true}
                    size="lg"
                >
                    <ModalHeader toggle={() => this.props.toggle()}>
                        Izmena veličine
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="name" sm={4}>
                                    Naziv veličine
                                </Label>
                                <Col sm={8}>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Veliko vozilo"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter className="modal-footer">
                        <Button
                            className="btn-primary btn-small btn-green"
                            onClick={() => {
                                this.onSubmit();
                            }}
                            color="success"
                        >
                            Izmeni
                        </Button>{" "}
                        <Button
                            className="btn-primary btn-small btn-red"
                            onClick={() => this.resetState()}
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

const mapDispatchToProps = (dispatch) => {
    return {
        updateSize: (size) => dispatch(actions.updateSize(size)),
    };
};

export default connect(null, mapDispatchToProps)(AddSizeModal);
