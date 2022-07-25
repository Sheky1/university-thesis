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
    FormText,
} from "reactstrap";

import { connect } from "react-redux";
import { api_axios } from "../../api/api";
import { Component } from "react";
import { fileToBase64, handleErrors } from "../../store/utilities";
import * as actions from "../../store/actions/index";

class AddAgencyModal extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            name: "",
            address: "",
            city_id: 0,
            username: "",
            email: "",
            password: "",
            files: [],
            old_files: [],
            images: [],
            old_images: [],
        };
    }

    resetState = () => {
        if (this._isMounted) {
            this.setState({
                name: "",
                address: "",
                city_id: 0,
                username: "",
                email: "",
                password: "",
                files: [],
                old_files: [],
                images: [],
                old_images: [],
            });
            this.props.toggle();
        }
    };

    fileSelectedHandler = (event) => {
        if (
            [...this.state.files].length + [...this.state.old_files].length <
                3 &&
            this._isMounted
        ) {
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
                }
            });
        } else {
            event.target.value = "";
        }
    };

    fileCheckHandler = (file) => {
        const pattern = /image-*/;
        if (!file.type.match(pattern) && this._isMounted) {
            this.setState({ invalidFormat: true });
            setTimeout(() => {
                this.setState({ invalidFormat: false });
            }, 5000);
            return false;
        } else {
            return true;
        }
    };

    handleChange = (e) => {
        const { name, value } = e.target;

        if (this._isMounted) {
            this.setState({
                [name]: value,
            });
        }
    };

    getCities = async () => {
        try {
            const response = await api_axios("get", `/cities`, null);
            if (this._isMounted) {
                const cities = response.data.data;
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

    onSubmit = async () => {
        try {
            if (this._isMounted) {
                // console.log(this.state);
                const city = this.state.cities.find(
                    (city) => city.name === this.state.city
                );
                const {
                    name,
                    address,
                    username,
                    email,
                    password,
                    files,
                } = this.state;

                let newAgency = {
                    name,
                    address,
                    city_id: city.id,
                    images: files,
                    username,
                    email,
                    password,
                };
                console.log(newAgency);

                const response = await api_axios(
                    "post",
                    `/agencies`,
                    newAgency
                );
                // console.log(response);
                this.props.addAgency(response.data.data);
            }
            this.props.toggle();
        } catch (error) {
            console.log(error);
            handleErrors(error);
        }
    };

    componentDidMount() {
        this._isMounted = true;
        this.getCities();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <>
                <Modal
                    isOpen={this.props.modal}
                    toggle={() => this.props.toggle()}
                    backdrop="static"
                    scrollable={true}
                    size="xl"
                >
                    <ModalHeader toggle={() => this.props.toggle()}>
                        Dodavanje agencije
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label for="name" sm={2}>
                                    Naziv agencije
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={this.state.name}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" sm={2}>
                                    E-mail
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={this.state.email}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="address" sm={2}>
                                    Adresa
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="address"
                                        id="address"
                                        value={this.state.address}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="cities" sm={2}>
                                    Grad
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="select"
                                        name="cities"
                                        id="cities"
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
                            <FormGroup row>
                                <Label for="username" sm={2}>
                                    Username
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="username"
                                        id="username"
                                        value={this.state.username}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="password" sm={2}>
                                    Password
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="password"
                                        id="password"
                                        value={this.state.password}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
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
                            onClick={() => this.onSubmit()}
                            color="success"
                        >
                            Dodaj
                        </Button>{" "}
                        <Button
                            className="btn-primary btn-small btn-red"
                            onClick={this.resetState}
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
        addAgency: (agency) => dispatch(actions.addAgency(agency)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAgencyModal);
