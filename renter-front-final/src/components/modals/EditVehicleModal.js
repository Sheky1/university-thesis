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
import { toast } from "react-toastify";
import ErrorModal from "./ErrorModal";
import DatePicker from "react-date-picker";

class EditVehicleModal extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			addition_ids: [],
			image_ids: [],
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
			selected_date: new Date(this.props.vehicle.year, 1, 1, 1, 1, 1, 1),
			registerNumber: this.props.vehicle.registerNumber,
			cubicSize: this.props.vehicle.cubicSize,
			currency_id: this.props.vehicle.currency.id,
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

	setupState = () => {
		if (this._isMounted) {
			this.setState({
				currency_id: this.props.vehicle.currency.id,
				currency: this.props.vehicle.currency.name,
			});
		}
	};

	resetState = () => {
		if (this._isMounted) {
			const additions = this.props.vehicle.additions;
			const addition_ids = additions.map((addition) => addition.id);
			this.setState({
				addition_ids,
				image_ids: [],
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
				currency_id: this.props.vehicle.currency.id,
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

	handleImages = (e) => {
		if (this._isMounted) {
			const { id } = e.target;

			const newImage = this.props.vehicle.images.find((image) => {
				return image.id === parseInt(id);
			});
			if (this.state.image_ids.includes(newImage.id)) {
				this.setState({
					image_ids: [
						...this.state.image_ids.filter(
							(id) => id !== newImage.id
						),
					],
				});
			} else {
				this.setState({
					image_ids: [...this.state.image_ids, newImage.id],
				});
			}
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
				this.setState({
					fuelType: this.props.fuel[0].name,
				});

				if (this.props.sizes.length === 0) {
					response = await api_axios("get", `/vehicle-sizes`, null);
					this.props.getSizes(response.data);
				}
				this.setState({
					vehicleSize: this.props.sizes[0].name,
				});

				if (this.props.additions.length === 0) {
					response = await api_axios("get", `/additions`, null);
					this.props.getAdditions(response.data);
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
		return false;
	};

	onSubmit = async () => {
		try {
			if (this._isMounted) {
				if (this.checkInputs()) return;
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
					depositPrice,
					price,
					year,
					registerNumber,
					cubicSize,
					files,
					addition_ids,
				} = this.state;

				console.log(this.state.image_ids);
				const old_images = this.props.vehicle.images
					.filter((image) => !this.state.image_ids.includes(image.id))
					.map((image) => image.id);

				console.log(old_images);
				let updatedVehicle = {
					name,
					transmissionType,
					passengerCount,
					doorCount,
					hasDeposit,
					depositPrice: hasDeposit ? undefined : depositPrice,
					price,
					year,
					registerNumber,
					cubicSize,
					vehicleSizeId: vehicleSize.id,
					fuelTypeId: fuelType.id,
					currencyId: currency.id,
					additionIds: addition_ids,
					old_images,
				};
				if (files.length > 0)
					updatedVehicle = {
						...updatedVehicle,
						images: files,
					};
				if (old_images.length === 0 && files.length === 0) {
					this.setState({
						errorText: "Vozilo mora imati barem jednu sliku.",
					});
					this.toggleError();
					return;
				}

				const response = await api_axios(
					"put",
					`/vehicles/${this.state.vehicle_id}`,
					updatedVehicle
				);
				toast.success("Uspešno izmenjeno vozilo.");
				this.props.updateVehicle(response.data);
				console.log(response.data);
				this.resetState();
				const classForButton = window.location.pathname;
				if (classForButton !== "/home-agency/")
					window.location.reload();
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
		this.getData();
		setTimeout(() => {
			this.setupState();
		}, 100);
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
							<FormGroup row style={{ width: "100%" }}>
								<Label for="name" sm={2}>
									Proizvođač i Model
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
								<Label for="transmissionType" sm={2}>
									Vrsta menjaca
								</Label>
								<Col sm={10}>
									{/* <Input
                                        type="text"
                                        name="transmissionType"
                                        id="transmissionType"
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
									Broj putnika
								</Label>
								<Col sm={10}>
									{/* <Input
                                        type="text"
                                        name="passengerCount"
                                        id="passengerCount"
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
									Broj vrata
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
									Godište
								</Label>
								<Col sm={10}>
									{/* <Input
                                        type="number"
                                        name="year"
                                        id="year"
                                        value={this.state.year}
                                        onChange={this.handleChange}
                                    /> */}
									<DatePicker
										// selected={startDate}
										locale="sr"
										maxDate={new Date()}
										onChange={this.onChangeYear}
										value={this.state.selected_date}
										format={"yyyy"}
										maxDetail="decade"
										className="year-picker"
										// customInput={<ExampleCustomInput />}
									/>
								</Col>
							</FormGroup>
							<FormGroup row style={{ width: "100%" }}>
								<Label for="cubicSize" sm={2}>
									Kubikaža
								</Label>
								<Col sm={10}>
									<Input
										type="number"
										name="cubicSize"
										id="cubicSize"
										value={this.state.cubicSize}
										onChange={this.handleChange}
									/>
								</Col>
							</FormGroup>
							<FormGroup row style={{ width: "100%" }}>
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
							<FormGroup row style={{ width: "100%" }}>
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
							<FormGroup row style={{ width: "100%" }}>
								<Label for="depositPrice" sm={2}>
									Cena depozita u {this.state.currency}
								</Label>
								<Col sm={10}>
									<Input
										type="number"
										name="depositPrice"
										id="depositPrice"
										value={this.state.depositPrice}
										onChange={this.handleChange}
									/>{" "}
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
							<FormGroup row style={{ width: "100%" }}>
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
													checked={this.state.addition_ids.includes(
														addition.id
													)}
												/>
												{addition.name}
											</div>
										);
									})}
								</div>
							</FormGroup>
							<FormGroup row style={{ width: "100%" }}>
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
										Dozvoljeno je uneti maksimum 3 slike.
										{/* Izaberite sliku koju zelite da dodate.
                                        Ukoliko zelite vise slika, drzite{" "}
                                        <span className="keyboard-button">
                                            Ctrl
                                        </span>
                                        i izaberite vise slika. */}
									</FormText>
								</Col>
							</FormGroup>
							<FormGroup>
								<Label for="exampleCheckbox">
									Slike za brisanje:
								</Label>
								<div
									className="p-3 px-5"
									style={{
										display: "flex",
										flexDirection: "row",
									}}
								>
									{this.props.vehicle.images.map((image) => {
										return (
											<div key={image.id}>
												<Input
													type="checkbox"
													id={image.id}
													name="image"
													key={image.id}
													onChange={this.handleImages}
													checked={this.state.image_ids.includes(
														image.id
													)}
													style={{
														marginRight: "10px",
														marginLeft: "10px",
													}}
												/>
												<img
													src={image.url}
													alt=""
													style={{
														width: "200px",
														height: "120px",
														marginRight: "25px",
													}}
												/>
											</div>
										);
									})}
								</div>
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
		currencies: state.currencies,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateVehicle: (vehicle) => dispatch(actions.updateVehicle(vehicle)),
		getSizes: (sizes) => dispatch(actions.getSizes(sizes)),
		getFuelTypes: (fuelTypes) => dispatch(actions.getFuelTypes(fuelTypes)),
		getAdditions: (additions) => dispatch(actions.getAdditions(additions)),
		getCurrencies: (currencies) =>
			dispatch(actions.getCurrencies(currencies)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditVehicleModal);
