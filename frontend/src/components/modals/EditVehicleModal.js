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
import * as actions from "../../store/actions/index";
import { fileToBase64, handleErrors } from "../../store/utilities";
import ErrorModal from "./ErrorModal";

class EditVehicleModal extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            addition_ids: [],
            errorModal: false,
            errorText: "",
            name: this.props.vehicle.name,
            transmission_type: this.props.vehicle.transmission_type,
            passenger_count: this.props.vehicle.passenger_count,
            door_count: this.props.vehicle.door_count,
            has_deposit: this.props.vehicle.has_deposit,
            deposit_price: this.props.vehicle.deposit_price,
            price: this.props.vehicle.price,
            year: this.props.vehicle.year,
            register_number: this.props.vehicle.register_number,
            cubic_size: this.props.vehicle.cubic_size,
            currency_id: 0,
            vehicleSize: "",
            fuelType: "",
            vehicle_id: this.props.vehicle.id,
            currency: this.props.vehicle.currency.name,
            files: [],
            old_files: [],
            images: [],
            old_images: this.props.vehicle.old_images,
        };
    }

    resetState = () => {
        if (this._isMounted) {
            const additions = this.props.vehicle.additions;
            const addition_ids = additions.map((addition) => addition.id);
            this.setState({
                addition_ids,
                name: this.props.vehicle.name,
                transmission_type: this.props.vehicle.transmission_type,
                passenger_count: this.props.vehicle.passenger_count,
                door_count: this.props.vehicle.door_count,
                has_deposit: this.props.vehicle.has_deposit,
                deposit_price: this.props.vehicle.deposit_price,
                price: this.props.vehicle.price,
                year: this.props.vehicle.year,
                register_number: this.props.vehicle.register_number,
                cubic_size: this.props.vehicle.cubic_size,
                currency_id: 0,
                vehicleSize: this.props.sizes[0].name,
                fuelType: this.props.fuel[0].name,
                vehicle_id: this.props.vehicle.id,
                currency: this.props.vehicle.currency.name,
                files: [],
                old_files: [],
                images: [],
                old_images: this.props.vehicle.old_images,
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

    handleChange = (event) => {
        const { name, value } = event.target;

        if (this._isMounted) {
            this.setState({
                [name]: value,
            });
        }
    };

    handleAdditions = (e) => {
        if (this._isMounted) {
            const { id } = e.target;

            const newAddition = this.props.additions.find(
                (addition) => addition.name === id
            );
            if (this.state.addition_ids.includes(newAddition.id)) {
                this.setState({
                    addition_ids: [
                        ...this.state.addition_ids.filter(
                            (id) => id !== newAddition.id
                        ),
                    ],
                });
            } else {
                this.setState({
                    addition_ids: [...this.state.addition_ids, newAddition.id],
                });
            }
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
                    console.log(this.state);
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

    getData = async () => {
        try {
            if (this._isMounted) {
                let response;

                if (this.props.fuel.length === 0) {
                    response = await api_axios("get", `/fuelTypes`, null);
                    this.props.getFuelTypes(response.data.data);
                }
                this.setState({
                    fuelType: this.props.fuel[0].name,
                });

                if (this.props.sizes.length === 0) {
                    response = await api_axios("get", `/vehicleSizes`, null);
                    this.props.getSizes(response.data.data);
                }
                this.setState({
                    vehicleSize: this.props.sizes[0].name,
                });

                if (this.props.additions.length === 0) {
                    response = await api_axios("get", `/additions`, null);
                    this.props.getAdditions(response.data.data);
                }
                const additions = this.props.vehicle.additions;
                const addition_ids = additions.map((addition) => addition.id);
                this.setState({ addition_ids });
            }
        } catch (error) {
            console.log(error);
            handleErrors(error);
        }
    };

    onSubmit = async () => {
        try {
            if (this._isMounted) {
                const vehicleSize = this.props.sizes.find(
                    (vehicleSize) => vehicleSize.name === this.state.vehicleSize
                );
                const fuelType = this.props.fuel.find(
                    (fuelType) => fuelType.name === this.state.fuelType
                );
                const {
                    name,
                    transmission_type,
                    passenger_count,
                    door_count,
                    has_deposit,
                    deposit_price,
                    price,
                    year,
                    register_number,
                    cubic_size,
                    files,
                    addition_ids,
                } = this.state;

                let updatedVehicle = {
                    name,
                    transmission_type,
                    passenger_count,
                    door_count,
                    has_deposit,
                    deposit_price,
                    price,
                    year,
                    register_number,
                    cubic_size,
                    vehicle_size_id: vehicleSize.id,
                    fuel_type_id: fuelType.id,
                    currency_id: 1,
                    addition_id: addition_ids,
                };
                if (files.length > 0)
                    updatedVehicle = { ...updatedVehicle, images: files };

                const response = await api_axios(
                    "put",
                    `/vehicles/${this.state.vehicle_id}`,
                    updatedVehicle
                );
                this.props.updateVehicle(response.data.data);
            }
            this.props.toggle();
        } catch (error) {
            this.setState({
                errorText: handleErrors(error),
            });
            this.toggleError();
        }
    };

    componentDidMount() {
        this._isMounted = true;
        this.getData();
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
                        Izmena vozila
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label for="name" sm={2}>
                                    Naziv modela
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
                            <FormGroup row>
                                <Label for="transmission_type" sm={2}>
                                    Vrsta menjaca
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="transmission_type"
                                        id="transmission_type"
                                        value={this.state.transmission_type}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="passenger_count" sm={2}>
                                    Broj putnika
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="passenger_count"
                                        id="passenger_count"
                                        value={this.state.passenger_count}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="door_count" sm={2}>
                                    Broj vrata
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="door_count"
                                        id="door_count"
                                        value={this.state.door_count}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="year" sm={2}>
                                    Godište
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="year"
                                        id="year"
                                        value={this.state.year}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="cubic_size" sm={2}>
                                    Kubikaža
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="cubic_size"
                                        id="cubic_size"
                                        value={this.state.cubic_size}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="register_number" sm={2}>
                                    Registarski broj
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="register_number"
                                        id="register_number"
                                        value={this.state.register_number}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="price" sm={2}>
                                    Cena u {this.state.currency}
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="number"
                                        name="price"
                                        id="price"
                                        value={this.state.price}
                                        onChange={this.handleChange}
                                    />{" "}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="sizes" sm={2}>
                                    Velicina
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="select"
                                        name="vehicleSize"
                                        id="vehicleSize"
                                        value={this.state.vehicleSize}
                                        onChange={this.handleChange}
                                    >
                                        {this.props.sizes.map((size) => {
                                            return (
                                                <option key={size.id}>
                                                    {size.name}
                                                </option>
                                            );
                                        })}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="fuel" sm={2}>
                                    Vrsta goriva
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="select"
                                        name="fuelType"
                                        id="fuelType"
                                        value={this.state.fuelType}
                                        onChange={this.handleChange}
                                    >
                                        {this.props.fuel.map((fuelType) => {
                                            return (
                                                <option key={fuelType.id}>
                                                    {fuelType.name}
                                                </option>
                                            );
                                        })}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleCheckbox">
                                    Izaberite dodatke:
                                </Label>
                                <div className="p-3 px-5">
                                    {this.props.additions.map((addition) => {
                                        return (
                                            <Input 
                                                type="switch"
                                                id={addition.name}
                                                name="addition"
                                                label={addition.name}
                                                key={addition.id}
                                                onChange={this.handleAdditions}
                                                checked={this.state.addition_ids.includes(
                                                    addition.id
                                                )}
                                            />
                                        );
                                    })}
                                </div>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="image" sm={2}>
                                    Dodaj sliku
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
                                        Izaberite sliku koju zelite da dodate.
                                        Ukoliko zelite vise slika, drzite{" "}
                                        <span className="keyboard-button">
                                            Ctrl
                                        </span>
                                        i izaberite vise slika.
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
                            Izmeni
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
        fuel: state.fuelTypes,
        sizes: state.vehicleSizes,
        additions: state.additions,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateVehicle: (vehicle) => dispatch(actions.updateVehicle(vehicle)),
        getSizes: (sizes) => dispatch(actions.getSizes(sizes)),
        getFuelTypes: (fuelTypes) => dispatch(actions.getFuelTypes(fuelTypes)),
        getAdditions: (additions) => dispatch(actions.getAdditions(additions)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditVehicleModal);
