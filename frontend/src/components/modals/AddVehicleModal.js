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
import axios from "axios";

class AddVehicleModal extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			addition_ids: [],
			errorModal: false,
			errorText: "",
			name: "",
			transmissionType: "Manuel",
			passengerCount: 1,
			doorCount: 1,
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
				transmissionType: "Manuel",
				passengerCount: "",
				doorCount: "",
				depositPrice: "",
				price: "",
				year: "",
				registerNumber: "",
				cubicSize: "",
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
		// this.setState({
		// 	images: [],
		// 	old_images: [],
		// 	files: [],
		// 	old_files: [],
		// });
		this.state.images.push(...event.target.files);
		// if (
		//     [...this.state.files].length + [...this.state.old_files].length <
		//         3 &&
		//     this._isMounted
		// ) {
		// if (event.target.files.length <= 3) {
		// 	const files = event.target.files;

		// 	[...files].forEach(async (file, i) => {
		// 		if (this.fileCheckHandler(file)) {
		// 			await fileToBase64(file).then((result) => {
		// 				let image = {
		// 					src: result,
		// 					altText: `Image_${i}`,
		// 					caption: file.name,
		// 				};
		// 				!!(
		// 					[...this.state.files].length +
		// 						[...this.state.old_files].length <
		// 					3
		// 				) &&
		// 					this.setState({
		// 						files: [...this.state.files, result],
		// 						images: [...this.state.images, image],
		// 					});
		// 			});
		// 		} else {
		// 			event.target.value = null;
		// 			this.setState({
		// 				errorText: "Morate uneti korektan format.",
		// 			});
		// 			this.toggleError();
		// 		}
		// 	});
		// } else {
		// 	event.target.value = null;
		// 	this.setState({
		// 		errorText: "Ne mozete uneti vise od 3 slike.",
		// 	});
		// 	this.toggleError();
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
				(addition) => addition.id === parseInt(id)
			);
			if (this.state.addition_ids.includes(newAddition.id)) {
				this.setState({
					addition_ids: [
						...this.state.addition_ids.filter(
							(chosenId) => chosenId !== newAddition.id
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
					response = await api_axios("get", `/fuel-types`, null);
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
					response = await api_axios("get", `/vehicle-sizes`, null);
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
		if (this.state.transmissionType === "") {
			this.setState({
				errorText: 'Polje "Vrsta menjača" je neophodno.',
			});
			this.toggleError();
			return true;
		}
		if (this.state.passengerCount === "") {
			this.setState({
				errorText: 'Polje "Broj Putnika" je neophodno.',
			});
			this.toggleError();
			return true;
		}
		if (this.state.doorCount === "") {
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
		if (this.state.cubicSize === "") {
			this.setState({
				errorText: 'Polje "Kubikaža" je neophodno.',
			});
			this.toggleError();
			return true;
		}
		if (this.state.registerNumber === "") {
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
				console.log(this.state);
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
				const hasDeposit =
					this.state.depositPrice === "" ||
					this.state.depositPrice === "0"
						? 1
						: 0;
				let {
					name,
					transmissionType,
					passengerCount,
					doorCount,
					price,
					depositPrice,
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
				if (!hasDeposit) depositPrice = parseInt(depositPrice);

				const user = JSON.parse(localStorage.getItem("user"));

				const formData = new FormData();

				const newVehicle = {
					name,
					transmissionType,
					passengerCount,
					doorCount,
					hasDeposit: hasDeposit === 0 ? false : true,
					depositPrice: hasDeposit ? undefined : depositPrice,
					price,
					year,
					registerNumber,
					cubicSize,
					vehicleSizeId: vehicleSize.id,
					fuelTypeId: fuelType.id,
					currencyId: currency.id,
					additionIds: addition_ids,
					// images: files,
					userId: user.id,
				};
				console.log(newVehicle);

				for (var key in newVehicle) {
					formData.append(key, newVehicle[key]);
				}

				for (var x = 0; x < images.length; x++) {
					formData.append("images[]", images[x]);
				}

				const headers = {
					"Content-Type":
						"multipart/form-data; boundary=----WebKitFormBoundaryY4U7hoZMlQAqLCEr",
					Authorization: `Bearer ${localStorage.token}`,
					Accept: "application/json",
					"X-Api-Key": `adb69d232d124c98fe20400d9a4757d71380ba1d4200697e6817c99a30959ed2`,
				};
				const response = await axios({
					method: `post`,
					url: `http://localhost:8080/api/vehicles`,
					data: formData,
					headers: headers,
				});

				// const response = await api_axios(
				// 	"post",
				// 	`/vehicles`,
				// 	newVehicle
				// );
				setTimeout(() => {
					this.props.addVehicle(response.data);
					toast.success("Uspešno dodato novo vozilo.");
					this.resetState();
				}, 100);
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
                                        name="transmissionType"
                                        id="transmissionType"
                                        placeholder="Manuel"
                                        value={this.state.transmissionType}
                                        onChange={this.handleChange}
                                    /> */}
									<Input
										type="select"
										name="transmissionType"
										id="transmissionType"
										value={this.state.transmissionType}
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
								<Label for="passengerCount" sm={2}>
									Broj putnika *
								</Label>
								<Col sm={10}>
									{/* <Input
                                        type="number"
                                        name="passengerCount"
                                        id="passengerCount"
                                        placeholder="5"
                                        value={this.state.passengerCount}
                                        onChange={this.handleChange}
                                    /> */}
									<Input
										type="select"
										name="passengerCount"
										id="passengerCount"
										value={this.state.passengerCount}
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
								<Label for="doorCount" sm={2}>
									Broj vrata *
								</Label>
								<Col sm={10}>
									{/* <Input
                                        type="text"
                                        name="doorCount"
                                        id="doorCount"
                                        value={this.state.doorCount}
                                        onChange={this.handleChange}
                                    /> */}
									<Input
										type="select"
										name="doorCount"
										id="doorCount"
										value={this.state.doorCount}
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
								<Label for="cubicSize" sm={2}>
									Kubikaža *
								</Label>
								<Col sm={10}>
									<Input
										type="number"
										name="cubicSize"
										id="cubicSize"
										placeholder="1600"
										value={this.state.cubicSize}
										onChange={this.handleChange}
									/>
								</Col>
							</FormGroup>
							<FormGroup row style={{ width: "100%" }}>
								<Label for="registerNumber" sm={2}>
									Registarski broj *
								</Label>
								<Col sm={10}>
									<Input
										type="text"
										name="registerNumber"
										id="registerNumber"
										placeholder="BG-1234-RP"
										value={this.state.registerNumber}
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
								<Label for="depositPrice" sm={2}>
									Cena depozita
								</Label>
								<Col sm={10}>
									<Input
										type="number"
										name="depositPrice"
										id="depositPrice"
										placeholder="20"
										value={this.state.depositPrice}
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
											<div key={addition.id}>
												<Input
													type="checkbox"
													id={addition.id}
													name="addition"
													label={addition.name}
													key={addition.id}
													onChange={
														this.handleAdditions
													}
													style={{
														marginRight: "10px",
														marginLeft: "10px",
													}}
												/>
												{addition.name}
											</div>
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
