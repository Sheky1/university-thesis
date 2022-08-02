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

class AddVehicleModal extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      addition_ids: [],
      errorModal: false,
      errorText: "",
      name: "",
      transmissionType: "",
      passengerCount: "",
      doorCount: "",
      hasDeposit: 0,
      depositPrice: "",
      price: "",
      year: "",
      registerNumber: "",
      cubicSize: "",
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
        transmissionType: "",
        passengerCount: "",
        doorCount: "",
        hasDeposit: 0,
        depositPrice: "",
        price: "",
        year: "",
        registerNumber: "",
        cubicSize: "",
        vehicleSize: this.props.sizes[0].name,
        fuelType: this.props.fuel[0].name,
        currency: this.props.currencies[0].name,
        files: [],
        old_files: [],
        images: [],
        old_images: [],
      });
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
    console.log(event.target.files[0]);
    console.log(event.target.files);
    this.state.images.push(event.target.files[0]);
    // if (
    //   [...this.state.files].length + [...this.state.old_files].length < 3 &&
    //   this._isMounted
    // ) {
    //   const files = event.target.files;

    //   [...files].forEach(async (file, i) => {
    //     if (this.fileCheckHandler(file)) {
    //       await fileToBase64(file).then((result) => {
    //         let image = {
    //           src: result,
    //           altText: `Image_${i}`,
    //           caption: file.name,
    //         };
    //         !!(
    //           [...this.state.files].length + [...this.state.old_files].length <
    //           3
    //         ) &&
    //           this.setState({
    //             files: [...this.state.files, result],
    //             images: [...this.state.images, image],
    //           });
    //       });
    //     }
    //   });
    // } else {
    //   event.target.value = "";
    // }
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

        if (this.props.additions.length === 0) {
          response = await api_axios("get", `/additions`, null);
          this.props.getAdditions(response.data);
        }
        setTimeout(() => {
          console.log(this.props.additions);
          this.setState({
            addition: this.props.additions[0].name,
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

        if (this.props.currencies.length === 0) {
          response = await api_axios("get", `/currencies`, null);
          this.props.getCurrencies(response.data);
        }
        setTimeout(() => {
          this.setState({
            currency: this.props.currencies[0].name,
            loading: false,
          });
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
        const currency = this.props.currencies.find(
          (currency) => currency.name === this.state.currency
        );
        let {
          name,
          transmissionType,
          passengerCount,
          doorCount,
          hasDeposit,
          price,
          year,
          registerNumber,
          cubicSize,
          addition_ids,
          files,
          images,
        } = this.state;

        passengerCount = parseInt(passengerCount);
        doorCount = parseInt(doorCount);
        price = parseInt(price);
        year = parseInt(year);
        cubicSize = parseInt(cubicSize);

        console.log(images);

        const user = JSON.parse(localStorage.getItem("user"));

        const newVehicle = {
          name,
          transmissionType,
          passengerCount,
          doorCount,
          hasDeposit: hasDeposit === 0 ? false : true,
          depositPrice: 50,
          price,
          year,
          registerNumber,
          cubicSize,
          vehicleSizeId: vehicleSize.id,
          fuelTypeId: fuelType.id,
          currencyId: currency.id,
          additionIds: addition_ids,
          userId: user.id,
          image: images[0],
          // images: files,
        };
        console.log(newVehicle);

        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.token}`,
          Accept: "application/json",
          "X-Api-Key": `adb69d232d124c98fe20400d9a4757d71380ba1d4200697e6817c99a30959ed2`,
        };

        const response = await api_axios(
          "post",
          `/vehicles`,
          newVehicle,
          headers
        );
        console.log(response.data);
        this.props.addVehicle(response.data);
        this.resetState();
      }
      this.props.toggle();
    } catch (error) {
      console.log(error);
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
            <Form encType="multipart/form-data">
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
                <Label for="transmission" sm={2}>
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
                  Godiste
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
                  Kubikaza
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
                  Cena
                </Label>
                <Col sm={10}>
                  <Input
                    type="number"
                    name="price"
                    id="price"
                    value={this.state.price}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="currency" sm={2}>
                  Valuta
                </Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    name="currency"
                    id="currency"
                    value={this.state.currency}
                    onChange={this.handleChange}
                  >
                    {this.props.currencies.map((currency) => {
                      return <option key={currency.id}>{currency.name}</option>;
                    })}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="vehicleSize" sm={2}>
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
                <Label for="fuelType" sm={2}>
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
                          key={addition.name}
                          onChange={this.handleAdditions}
                          style={{ marginRight: "10px", marginLeft: "10px" }}
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
                    Izaberite sliku za novododato vozilo. Ukoliko zelite vise
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
