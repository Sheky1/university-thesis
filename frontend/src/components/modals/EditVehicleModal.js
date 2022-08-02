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
      transmissionType: this.props.vehicle.transmissionType,
      passengerCount: this.props.vehicle.passengerCount,
      doorCount: this.props.vehicle.doorCount,
      hasDeposit: this.props.vehicle.hasDeposit,
      depositPrice: this.props.vehicle.depositPrice,
      price: this.props.vehicle.price,
      year: this.props.vehicle.year,
      registerNumber: this.props.vehicle.registerNumber,
      cubicSize: this.props.vehicle.cubicSize,
      currencyId: 0,
      vehicleSize: "",
      fuelType: "",
      vehicleId: this.props.vehicle.id,
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
        transmissionType: this.props.vehicle.transmissionType,
        passengerCount: this.props.vehicle.passengerCount,
        doorCount: this.props.vehicle.doorCount,
        hasDeposit: this.props.vehicle.hasDeposit,
        depositPrice: this.props.vehicle.depositPrice,
        price: this.props.vehicle.price,
        year: this.props.vehicle.year,
        registerNumber: this.props.vehicle.registerNumber,
        cubicSize: this.props.vehicle.cubicSize,
        currencyId: 0,
        vehicleSize: this.props.sizes[0].name,
        fuelType: this.props.fuel[0].name,
        vehicleId: this.props.vehicle.id,
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
            ...this.state.addition_ids.filter((id) => id !== newAddition.id),
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
      [...this.state.files].length + [...this.state.old_files].length < 3 &&
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
              [...this.state.files].length + [...this.state.old_files].length <
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
          response = await api_axios("get", `/fuel-types`, null);
          this.props.getFuelTypes(response.data);
        }
        setTimeout(() => {
          this.setState({
            fuelType: this.props.fuel[0].name,
          });
        }, 100);

        if (this.props.sizes.length === 0) {
          response = await api_axios("get", `/vehicle-sizes`, null);
          this.props.getSizes(response.data);
        }
        setTimeout(() => {
          this.setState({
            vehicleSize: this.props.sizes[0].name,
          });
        }, 100);

        if (this.props.additions.length === 0) {
          response = await api_axios("get", `/additions`, null);
          this.props.getAdditions(response.data);
        }
        setTimeout(() => {
          const additions = this.props.vehicle.additions;
          const addition_ids = additions.map((addition) => addition.id);
          this.setState({ addition_ids });
        }, 100);
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
          transmissionType,
          passengerCount,
          doorCount,
          hasDeposit,
          depositPrice,
          price,
          year,
          registerNumber,
          cubicSize,
          files,
          addition_ids,
        } = this.state;

        let updatedVehicle = {
          name,
          transmissionType,
          passengerCount,
          doorCount,
          hasDeposit,
          depositPrice,
          price,
          year,
          registerNumber,
          cubicSize,
          vehicleSizeId: vehicleSize.id,
          fuelTypeId: fuelType.id,
          currencyId: 1,
          additionIds: addition_ids,
        };
        if (files.length > 0)
          updatedVehicle = { ...updatedVehicle, images: files };

        const response = await api_axios(
          "put",
          `/vehicles/${this.state.vehicleId}`,
          updatedVehicle
        );
        this.props.updateVehicle(response.data);
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
                <Label for="transmissionType" sm={2}>
                  Vrsta menjaca
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="transmissionType"
                    id="transmissionType"
                    value={this.state.transmissionType}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="passengerCount" sm={2}>
                  Broj putnika
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="passengerCount"
                    id="passengerCount"
                    value={this.state.passengerCount}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="doorCount" sm={2}>
                  Broj vrata
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="doorCount"
                    id="doorCount"
                    value={this.state.doorCount}
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
                <Label for="cubicSize" sm={2}>
                  Kubikaža
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="cubicSize"
                    id="cubicSize"
                    value={this.state.cubicSize}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="registerNumber" sm={2}>
                  Registarski broj
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="registerNumber"
                    id="registerNumber"
                    value={this.state.registerNumber}
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
                      return <option key={size.id}>{size.name}</option>;
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
                      return <option key={fuelType.id}>{fuelType.name}</option>;
                    })}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup>
                <Label for="exampleCheckbox">Izaberite dodatke:</Label>
                <div className="p-3 px-5">
                  {this.props.additions.map((addition) => {
                    return (
                      <>
                        <Input
                          type="checkbox"
                          id={addition.name}
                          name="addition"
                          label={addition.name}
                          key={addition.id}
                          onChange={this.handleAdditions}
                          style={{ marginRight: "10px", marginLeft: "10px" }}
                          checked={this.state.addition_ids.includes(
                            addition.id
                          )}
                        />
                        {addition.name}
                      </>
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
                    Izaberite sliku koju zelite da dodate. Ukoliko zelite vise
                    slika, drzite <span className="keyboard-button">Ctrl</span>i
                    izaberite vise slika.
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
