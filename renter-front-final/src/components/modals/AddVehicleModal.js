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
import { Component } from "react";
import { api_axios } from "../../api/api";
import * as actions from "../../store/actions/index";
import { fileToBase64, handleErrors } from "../../store/utilities";
import ErrorModal from "./ErrorModal";
import { toast } from "react-toastify";
import DatePicker from "react-date-picker";

class AddVehicleModal extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            addition_ids: [],
            errorModal: false,
            errorText: "",
            name: "",
            transmission_type: "Manuel",
            passenger_count: 1,
            door_count: 1,
            deposit_price: "",
            price: "",
            year: "",
            register_number: "",
            cubic_size: "",
            vehicleSize: "",
            fuelType: "",
            currency: "",
            files: [],
            old_files: [],
            images: [],
            old_images: [],
        };
    }

    resetState = () => {
        if (this._isMounted) {
            this.setState({
                addition_ids: [],
                name: "",
                transmission_type: "Manuel",
                passenger_count: "",
                door_count: "",
                deposit_price: "",
                price: "",
                year: "",
                register_number: "",
                cubic_size: "",
                currency: this.props.currencies[0].name,
                files: [],
                old_files: [],
                images: [],
                old_images: [],
            });
            if (this.props.sizes.length !== 0) {
                this.setState({
                    vehicleSize: this.props.sizes[0].name,
                });
            }
            if (this.props.fuel.length !== 0) {
                this.setState({
                    fuelType: this.props.fuel[0].name,
                });
            }
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
        if (event.target.files.length <= 3) {
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
                        errorText: "Morate uneti korektan format.",
                    });
                    this.toggleError();
                }
            });
        } else {
            event.target.value = null;
            this.setState({
                errorText: "Ne mozete uneti vise od 3 slike.",
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

    handleChange = (e) => {
        const { name, value } = e.target;

        if (this._isMounted) {
            this.setState({
                [name]: value,
            });
        }
    };

    onChangeYear = (date) => {
        if (date === null) {
            this.setState({
                selected_date: null,
                year: "",
            });
        } else {
            this.setState({
                selected_date: date,
                year: date.getFullYear(),
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

    getData = async () => {
        try {
            if (this._isMounted) {
                let response;

                if (this.props.currencies.length === 0) {
                    response = await api_axios("get", `/currencies`, null);
                    this.props.getCurrencies(response.data);
                }
                if (this.props.currencies.length !== 0) {
                    this.setState({
                        currency: this.props.currencies[0].name,
                    });
                }

                if (this.props.fuel.length === 0) {
                    response = await api_axios("get", `/fuelTypes`, null);
                    this.props.getFuelTypes(response.data);
                }
                if (this.props.fuel.length !== 0) {
                    this.setState({
                        fuelType: this.props.fuel[0].name,
                    });
                }

                if (this.props.additions.length === 0) {
                    response = await api_axios("get", `/additions`, null);
                    this.props.getAdditions(response.data);
                }

                if (this.props.sizes.length === 0) {
                    response = await api_axios("get", `/vehicleSizes`, null);
                    this.props.getSizes(response.data);
                }
                if (this.props.sizes.length !== 0) {
                    this.setState({
                        vehicleSize: this.props.sizes[0].name,
                    });
                }
                this.setState({
                    loading: false,
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
                errorText: 'Polje "Proizvođač i Model" je neophodno.',
            });
            this.toggleError();
            return true;
        }
        if (this.state.transmission_type === "") {
            this.setState({
                errorText: 'Polje "Vrsta menjača" je neophodno.',
            });
            this.toggleError();
            return true;
        }
        if (this.state.passenger_count === "") {
            this.setState({
                errorText: 'Polje "Broj Putnika" je neophodno.',
            });
            this.toggleError();
            return true;
        }
        if (this.state.door_count === "") {
            this.setState({
                errorText: 'Polje "Broj Vrata" je neophodno.',
            });
            this.toggleError();
            return true;
        }
        if (this.state.year === "") {
            this.setState({
                errorText: 'Polje "Godište" je neophodno.',
            });
            this.toggleError();
            return true;
        }
        if (this.state.cubic_size === "") {
            this.setState({
                errorText: 'Polje "Kubikaža" je neophodno.',
            });
            this.toggleError();
            return true;
        }
        if (this.state.register_number === "") {
            this.setState({
                errorText: 'Polje "Registraski broj" je neophodno.',
            });
            this.toggleError();
            return true;
        }
        if (this.state.price === "") {
            this.setState({
                errorText: 'Polje "Cena" je neophodno.',
            });
            this.toggleError();
            return true;
        }
        if (this.state.images.length === 0) {
            this.setState({
                errorText: "Neophodno je dodati minimum jednu sliku.",
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
                if (this.props.sizes.length === 0) {
                    this.setState({
                        errorText:
                            "Trenutno ne postoji definisana nijedna velicina",
                    });
                    this.toggleError();
                    return;
                }
                if (this.props.fuel.length === 0) {
                    this.setState({
                        errorText:
                            "Trenutno ne postoji definisana nijedna vrsta goriva",
                    });
                    this.toggleError();
                    return;
                }
                if (this.props.currencies.length === 0) {
                    this.setState({
                        errorText:
                            "Trenutno ne postoji definisana nijedna valuta",
                    });
                    this.toggleError();
                    return;
                }
                const vehicleSize = this.props.sizes.find(
                    (vehicleSize) => vehicleSize.name === this.state.vehicleSize
                );
                const fuelType = this.props.fuel.find(
                    (fuelType) => fuelType.name === this.state.fuelType
                );
                const currency = this.props.currencies.find(
                    (currency) => currency.name === this.state.currency
                );
                const has_deposit =
                    this.state.deposit_price === "" ||
                    this.state.deposit_price === "0"
                        ? 1
                        : 0;
                let {
                    name,
                    transmission_type,
                    passenger_count,
                    door_count,
                    price,
                    deposit_price,
                    year,
                    register_number,
                    cubic_size,
                    addition_ids,
                    files,
                } = this.state;

                passenger_count = parseInt(passenger_count);
                price = parseInt(price);
                if (!has_deposit) deposit_price = parseInt(deposit_price);

                const newVehicle = {
                    name,
                    transmission_type,
                    passenger_count,
                    door_count,
                    has_deposit,
                    deposit_price: has_deposit ? undefined : deposit_price,
                    price,
                    year,
                    register_number,
                    cubic_size,
                    vehicle_size_id: vehicleSize.id,
                    fuel_type_id: fuelType.id,
                    currency_id: currency.id,
                    addition_id: addition_ids,
                    images: files,
                };

                const response = await api_axios(
                    "post",
                    `/vehicles`,
                    newVehicle
                );
                this.props.addVehicle(response.data);
                toast.success("Uspešno dodato novo vozilo.");
                this.resetState();
            }
            this.props.toggle();
        } catch (error) {
            console.log(error.response);
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
                        Dodavanje vozila
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="name" sm={2}>
                                    Proizvođač i Model *
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Toyota Corolla"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="transmission" sm={2}>
                                    Vrsta menjača *
                                </Label>
                                <Col sm={10}>
                                    {/* <Input
                                        type="text"
                                        name="transmission_type"
                                        id="transmission_type"
                                        placeholder="Manuel"
                                        value={this.state.transmission_type}
                                        onChange={this.handleChange}
                                    /> */}
                                    <Input
                                        type="select"
                                        name="transmission_type"
                                        id="transmission_type"
                                        value={this.state.transmission_type}
                                        onChange={this.handleChange}
                                        style={{ paddingLeft: "5px" }}
                                    >
                                        <option>Manuel</option>
                                        <option>Automatik</option>
                                        <option>Poluautomatik</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="passenger_count" sm={2}>
                                    Broj putnika *
                                </Label>
                                <Col sm={10}>
                                    {/* <Input
                                        type="number"
                                        name="passenger_count"
                                        id="passenger_count"
                                        placeholder="5"
                                        value={this.state.passenger_count}
                                        onChange={this.handleChange}
                                    /> */}
                                    <Input
                                        type="select"
                                        name="passenger_count"
                                        id="passenger_count"
                                        value={this.state.passenger_count}
                                        onChange={this.handleChange}
                                        style={{ paddingLeft: "5px" }}
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="door_count" sm={2}>
                                    Broj vrata *
                                </Label>
                                <Col sm={10}>
                                    {/* <Input
                                        type="text"
                                        name="door_count"
                                        id="door_count"
                                        value={this.state.door_count}
                                        onChange={this.handleChange}
                                    /> */}
                                    <Input
                                        type="select"
                                        name="door_count"
                                        id="door_count"
                                        value={this.state.door_count}
                                        onChange={this.handleChange}
                                        style={{ paddingLeft: "5px" }}
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="year" sm={2}>
                                    Godište *
                                </Label>
                                <Col sm={10}>
                                    {/* <Input
                                        type="number"
                                        name="year"
                                        id="year"
                                        placeholder="2015"
                                        value={this.state.year}
                                        onChange={this.handleChange}
                                    /> */}
                                    <DatePicker
                                        // selected={startDate}
                                        className="year-picker"
                                        locale="sr"
                                        maxDate={new Date()}
                                        onChange={this.onChangeYear}
                                        value={this.state.selected_date}
                                        format={"yyyy"}
                                        maxDetail="decade"
                                        // customInput={<ExampleCustomInput />}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="cubic_size" sm={2}>
                                    Kubikaža *
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="number"
                                        name="cubic_size"
                                        id="cubic_size"
                                        placeholder="1600"
                                        value={this.state.cubic_size}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="register_number" sm={2}>
                                    Registarski broj *
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="register_number"
                                        id="register_number"
                                        placeholder="BG-1234-RP"
                                        value={this.state.register_number}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="price" sm={2}>
                                    Cena *
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="number"
                                        name="price"
                                        id="price"
                                        placeholder="200"
                                        value={this.state.price}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="deposit_price" sm={2}>
                                    Cena depozita
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="number"
                                        name="deposit_price"
                                        id="deposit_price"
                                        placeholder="20"
                                        value={this.state.deposit_price}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="currency" sm={2}>
                                    Valuta
                                </Label>
                                {this.props.currencies.length !== 0 ? (
                                    <Col sm={10}>
                                        <Input
                                            type="select"
                                            name="currency"
                                            id="currency"
                                            value={this.state.currency}
                                            onChange={this.handleChange}
                                        >
                                            {this.props.currencies.map(
                                                (currency) => {
                                                    return (
                                                        <option
                                                            key={currency.id}
                                                        >
                                                            {currency.name}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </Input>
                                    </Col>
                                ) : (
                                    <Col sm={10}>
                                        <div>
                                            Trenutno ne postoji nijedna valuta.
                                        </div>
                                    </Col>
                                )}
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="vehicleSize" sm={2}>
                                    Velicina
                                </Label>
                                {this.props.sizes.length !== 0 ? (
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
                                ) : (
                                    <Col sm={10}>
                                        <div>
                                            Neophodno je uneti barem jednu
                                            velicinu kako bi se vozilo dodalo.
                                        </div>
                                    </Col>
                                )}
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="fuelType" sm={2}>
                                    Vrsta goriva
                                </Label>
                                {this.props.fuel.length !== 0 ? (
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
                                ) : (
                                    <Col sm={10}>
                                        <div>
                                            Neophodno je uneti barem jednu vrstu
                                            goriva kako bi se vozilo dodalo.
                                        </div>
                                    </Col>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleCheckbox">
                                    Izaberite dodatke:
                                </Label>
                                <div className="p-3 px-5">
                                    {this.props.additions.map((addition) => {
                                        return (
                                            <>
                                                <Input
                                                    type="checkbox"
                                                    id={addition.name}
                                                    name="addition"
                                                    label={addition.name}
                                                    key={addition.name}
                                                    onChange={
                                                        this.handleAdditions
                                                    }
                                                    style={{
                                                        marginRight: "10px",
                                                        marginLeft: "10px",
                                                    }}
                                                />
                                                {addition.name}
                                            </>
                                        );
                                    })}
                                </div>
                            </FormGroup>
                            <FormGroup row style={{ width: "100%" }}>
                                <Label for="image" sm={2}>
                                    Dodavanje slika *
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
                                        Dozvoljeno je uneti maksimum 3 slike.
                                        {/* Izaberite sliku za novododato vozilo.
                                        Ukoliko zelite vise slika, drzite{" "}
                                        <span className="keyboard-button">
                                            Ctrl
                                        </span>
                                        i izaberite vise slika. */}
                                    </FormText>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter className="modal-footer">
                        <Button
                            className="btn-primary btn-small btn-green"
                            onClick={this.onSubmit}
                            color="success"
                        >
                            Dodaj
                        </Button>{" "}
                        <Button
                            className="btn-primary btn-small btn-red"
                            onClick={() => {
                                this.resetState();
                                this.props.toggle();
                            }}
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
        currencies: state.currencies,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addVehicle: (vehicle) => dispatch(actions.addVehicle(vehicle)),
        getSizes: (sizes) => dispatch(actions.getSizes(sizes)),
        getFuelTypes: (sizes) => dispatch(actions.getFuelTypes(sizes)),
        getAdditions: (sizes) => dispatch(actions.getAdditions(sizes)),
        getCurrencies: (sizes) => dispatch(actions.getCurrencies(sizes)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVehicleModal);
