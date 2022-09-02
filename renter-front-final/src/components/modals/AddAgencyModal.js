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
import ErrorModal from "./ErrorModal";
import { toast } from "react-toastify";
import axios from "axios";

class AddAgencyModal extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            errorModal: false,
            errorText: "",
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

    toggleError = () => this.setErrorModal(!this.state.errorModal);

    setErrorModal = (errorModal) => {
        if (this._isMounted) {
            this.setState({
                errorModal,
            });
        }
    };

    fileSelectedHandler = (event) => {
        // this.setState({
        //     images: [],
        //     old_images: [],
        //     files: [],
        //     old_files: [],
        // });
        this.state.images.push(event.target.files[0]);
        // if (
        //     [...this.state.files].length + [...this.state.old_files].length <
        //         3 &&
        //     this._isMounted
        // ) {
        // if (event.target.files.length === 1) {
        //     const files = event.target.files;

        //     [...files].forEach(async (file, i) => {
        //         if (this.fileCheckHandler(file)) {
        //             await fileToBase64(file).then((result) => {
        //                 let image = {
        //                     src: result,
        //                     altText: `Image_${i}`,
        //                     caption: file.name,
        //                 };
        //                 !!(
        //                     [...this.state.files].length +
        //                         [...this.state.old_files].length <
        //                     3
        //                 ) &&
        //                     this.setState({
        //                         files: [...this.state.files, result],
        //                         images: [...this.state.images, image],
        //                     });
        //             });
        //         } else {
        //             event.target.value = null;
        //             this.setState({
        //                 errorText: "Morate uneti korektan format slike.",
        //             });
        //             this.toggleError();
        //         }
        //     });
        // } else {
        //     event.target.value = null;
        //     this.setState({
        //         errorText: "Neophodno je uneti samo jednu sliku.",
        //     });
        //     this.toggleError();
        // }
    };

    fileCheckHandler = (file) => {
        const pattern = /image-*/;
        if (!file.type.match(pattern) && this._isMounted) {
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
        if (this.state.username.includes(" ")) {
            this.setState({
                errorText:
                    'U polje "Korisničko ime" nije dozvoljeno uneti razmak.',
            });
            this.toggleError();
            return true;
        }
        if (this.state.password === "") {
            this.setState({
                errorText: 'Polje "Šifra" je neophodno.',
            });
            this.toggleError();
            return true;
        }
        if (this.state.password.includes(" ")) {
            this.setState({
                errorText: 'U polje "Šifra" nije dozvoljeno uneti razmak.',
            });
            this.toggleError();
            return true;
        }
        if (this.state.password.length < 6) {
            this.setState({
                errorText: '"Šifra" mora imati minimum 6 karaktera.',
            });
            this.toggleError();
            return true;
        }
        if (this.state.images.length === 0) {
            this.setState({
                errorText:
                    "Neophodno je dodati sliku koja predstavlja logo agencije.",
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
                    images,
                } = this.state;

                let newAgency = {
                    name,
                    address,
                    cityId: city.id,
                    logo: images[0],
                    username,
                    email,
                    password,
                };
                // let newAgency = {
                //     name,
                //     address,
                //     city_id: city.id,
                //     images: files,
                //     username,
                //     email,
                //     password,
                // };
                console.log(newAgency);

                const formData = new FormData();

                for (var key in newAgency) {
                    formData.append(key, newAgency[key]);
                }

                // const response = await api_axios(
                //     "post",
                //     `/agencies`,
                //     newAgency
                // );
                // // console.log(response);
                // this.props.addAgency(response.data);

                const headers = {
                    "Content-Type":
                        "multipart/form-data; boundary=----WebKitFormBoundaryY4U7hoZMlQAqLCEr",
                    Authorization: `Bearer ${localStorage.token}`,
                    Accept: "application/json",
                    "X-Api-Key": `adb69d232d124c98fe20400d9a4757d71380ba1d4200697e6817c99a30959ed2`,
                };
                const response = await axios({
                    method: `post`,
                    url: `http://localhost:8080/api/agencies`,
                    data: formData,
                    headers: headers,
                });
                setTimeout(() => {
                    this.props.addAgency(response.data);
                    toast.success("Uspešno dodata nova agencija.");
                    this.resetState();
                }, 100);
            }
        } catch (error) {
            console.log(error.response.status);
            if (error.response.status === 422) {
                this.setState({
                    errorText: "Takvo korisničko ime već postoji.",
                });
                this.toggleError();
            } else {
                this.setState({
                    errorText: handleErrors(error),
                });
                this.toggleError();
            }
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
                        Dodavanje agencije
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="name" sm={2}>
                                    Naziv agencije *
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Rent a car"
                                        value={this.state.name}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="email" sm={2}>
                                    E-mail *
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="demo@demo.demo"
                                        value={this.state.email}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="address" sm={2}>
                                    Adresa *
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="address"
                                        id="address"
                                        placeholder="Kralja milana 291"
                                        value={this.state.address}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="cities" sm={2}>
                                    Grad *
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
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="username" sm={2}>
                                    Korisničko ime *
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="rentagencija"
                                        value={this.state.username}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="password" sm={2}>
                                    Šifra *
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="password"
                                        id="password"
                                        placeholder="primersifre123"
                                        value={this.state.password}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="image" sm={2}>
                                    Logo *
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
