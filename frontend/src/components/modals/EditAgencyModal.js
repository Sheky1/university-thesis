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
    FormText,
} from "reactstrap";

import { connect } from "react-redux";
import { api_axios } from "../../api/api";
import { fileToBase64 } from "../../store/utilities";
import * as actions from "../../store/actions/index";
import { handleErrors } from "../../store/utilities";
import { toast } from "react-toastify";
import ErrorModal from "./ErrorModal";

class AddAgencyModal extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            city: this.props.agency.city.name,
            name: this.props.agency.name,
            address: this.props.agency.address,
            username: this.props.agency.user.username,
            email: this.props.agency.user.email,
            password: "",
            agency_id: this.props.agency.id,
            files: [],
            old_files: [],
            images: [],
            old_images: [],
        };
    }

    setupState = () => {
        if (this._isMounted) {
            this.setState({
                city: this.props.agency.city.name,
            });
        }
    };

    resetState = () => {
        if (this._isMounted) {
            this.setState({
                city: this.props.agency.city.name,
                name: this.props.agency.name,
                address: this.props.agency.address,
                username: this.props.agency.user.username,
                email: this.props.agency.user.email,
                password: "",
                files: [],
                old_files: [],
                images: [],
                old_images: [],
            });
            this.props.toggle();
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;

        if (this._isMounted) {
            this.setState({
                [name]: value,
            });
        }
    };

    fileSelectedHandler = (event) => {
        this.setState({
            images: [],
            old_images: [],
            files: [],
            old_files: [],
        });
        // if (
        //     [...this.state.files].length + [...this.state.old_files].length <
        //         3 &&
        //     this._isMounted
        // ) {
        if (event.target.files.length === 1) {
            const files = event.target.files;

            [...files].forEach(async (file, i) => {
                if (this.fileCheckHandler(file)) {
                    await fileToBase64(file).then((result) => {
                        let image = {
                            src: result,
                            altText: `Image_${i}`,
                            caption: file.name,
                        };
                        !!(
                            [...this.state.files].length +
                                [...this.state.old_files].length <
                            3
                        ) &&
                            this.setState({
                                files: [...this.state.files, result],
                                images: [...this.state.images, image],
                            });
                    });
                } else {
                    event.target.value = null;
                    this.setState({
                        errorText: "Morate uneti korektan format slike.",
                    });
                    this.toggleError();
                }
            });
        } else {
            event.target.value = null;
            this.setState({
                errorText: "Neophodno je uneti samo jednu sliku.",
            });
            this.toggleError();
        }
    };

    fileCheckHandler = (file) => {
        const pattern = /image-*/;
        if (!file.type.match(pattern) && this._isMounted) {
            return false;
        } else {
            return true;
        }
    };

    getCities = async () => {
        try {
            const response = await api_axios("get", `/cities`, null);
            if (this._isMounted) {
                const cities = response.data;
                const city = cities[0].name;
                this.setState({
                    loading: false,
                    cities,
                    city,
                });
            }
        } catch (error) {
            console.log(error);
            handleErrors(error);
        }
    };

    checkInputs = () => {
        if (this.state.name === "") {
            this.setState({
                errorText: 'Polje "Naziv agencije" je neophodno.',
            });
            this.toggleError();
            return true;
        }
        if (this.state.email === "") {
            this.setState({
                errorText: 'Polje "E-mail" je neophodno.',
            });
            this.toggleError();
            return true;
        }
        if (this.state.address === "") {
            this.setState({
                errorText: 'Polje "Adresa" je neophodno.',
            });
            this.toggleError();
            return true;
        }
        if (this.state.username === "") {
            this.setState({
                errorText: 'Polje "Korisničko ime" je neophodno.',
            });
            this.toggleError();
            return true;
        }
        if (this.state.password.length < 6 && this.state.password !== "") {
            this.setState({
                errorText: '"Šifra" mora imati minimum 6 karaktera.',
            });
            this.toggleError();
            return true;
        }
        return false;
    };

    onSubmit = async () => {
        try {
            if (this._isMounted) {
                if (this.checkInputs()) return;
                const city = this.state.cities.find(
                    (city) => city.name === this.state.city
                );
                const {
                    name,
                    address,
                    username,
                    email,
                    agency_id,
                    password,
                    files,
                } = this.state;

                let updatedAgency = {
                    name,
                    address,
                    city_id: city.id,
                    username,
                    email,
                    agency_id,
                };
                if (password !== "")
                    updatedAgency = { ...updatedAgency, password };
                if (files.length > 0)
                    updatedAgency = { ...updatedAgency, images: files };

                const response = await api_axios(
                    "put",
                    `/agencies/${this.state.agency_id}`,
                    updatedAgency
                );
                this.props.updateAgency(response.data);
                toast.success("Uspešno izmenjena agencija.");
                this.resetState();
            }
        } catch (error) {
            this.setState({
                errorText: handleErrors(error),
            });
            this.toggleError();
        }
    };

    toggleError = () => this.setErrorModal(!this.state.errorModal);

    setErrorModal = (errorModal) => {
        if (this._isMounted) {
            this.setState({
                errorModal,
            });
        }
    };

    componentDidMount() {
        this._isMounted = true;
        this.getCities();
        setTimeout(() => {
            this.setupState();
        }, 1000);
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
                    size="xl"
                >
                    <ModalHeader toggle={() => this.props.toggle()}>
                        Izmena agencije
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="name" sm={2}>
                                    Naziv agencije
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="email" sm={2}>
                                    E-mail
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            {/* <FormGroup row style={{ width: "100%" }}>
                                <Label for="phone" sm={2}>
                                    Broj telefona
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        value={this.state.agency.phone}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup> */}
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="address" sm={2}>
                                    Adresa
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="address"
                                        id="address"
                                        value={this.state.address}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="city" sm={2}>
                                    Grad
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="select"
                                        name="city"
                                        id="city"
                                        value={this.state.city}
                                        onChange={(e) => {
                                            this.setState({
                                                city: e.target.value,
                                            });
                                        }}
                                    >
                                        {this.state.cities.map((city) => {
                                            return (
                                                <option
                                                    key={city.id}
                                                    value={city.name}
                                                >
                                                    {city.name}
                                                </option>
                                            );
                                        })}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="username" sm={2}>
                                    Username
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="username"
                                        id="username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="password" sm={2}>
                                    Password
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="password"
                                        id="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        placeholder="Opciono"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="image" sm={2}>
                                    Logo
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="file"
                                        name="image"
                                        id="image"
                                        onChange={this.fileSelectedHandler}
                                        multiple
                                    />
                                    <FormText color="muted">
                                        Izaberite logo za novu agenciju.
                                    </FormText>
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

const mapStateToProps = (state) => {
    return {
        cities: state.user.cities,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateAgency: (agency) => dispatch(actions.updateAgency(agency)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAgencyModal);
