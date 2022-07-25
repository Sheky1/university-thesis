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
			transmission_type: "",
			passenger_count: "",
			door_count: "",
			has_deposit: 0,
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
				transmission_type: "",
				passenger_count: "",
				door_count: "",
				has_deposit: 0,
				deposit_price: "",
				price: "",
				year: "",
				register_number: "",
				cubic_size: "",
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

				if (this.props.fuel.length === 0) {
					response = await api_axios("get", `/fuelTypes`, null);
					this.props.getFuelTypes(response.data.data);
				}
				this.setState({
					fuelType: this.props.fuel[0].name,
				});

				if (this.props.additions.length === 0) {
					response = await api_axios("get", `/additions`, null);
					this.props.getAdditions(response.data.data);
				}

				if (this.props.sizes.length === 0) {
					response = await api_axios("get", `/vehicleSizes`, null);
					this.props.getSizes(response.data.data);
				}
				this.setState({
					vehicleSize: this.props.sizes[0].name,
				});

				if (this.props.currencies.length === 0) {
					response = await api_axios("get", `/app/currencies`, null);
					this.props.getCurrencies(response.data.data);
				}
				this.setState({
					currency: this.props.currencies[0].name,
					loading: false,
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
					transmission_type,
					passenger_count,
					door_count,
					has_deposit,
					price,
					year,
					register_number,
					cubic_size,
					addition_ids,
					files,
				} = this.state;

				passenger_count = parseInt(passenger_count);
				door_count = parseInt(door_count);
				price = parseInt(price);
				year = parseInt(year);
				cubic_size = parseInt(cubic_size);

				const newVehicle = {
					name,
					transmission_type,
					passenger_count,
					door_count,
					has_deposit,
					deposit_price: 50,
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
				console.log(newVehicle);

				const response = await api_axios(
					"post",
					`/vehicles`,
					newVehicle
				);
				console.log(response.data.data);
				this.props.addVehicle(response.data.data);
				this.resetState();
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
						Dodavanje vozila
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
								<Label for="transmission" sm={2}>
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
								<Label for="cubic_size" sm={2}>
									Kubikaza
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
										{this.props.currencies.map(
											(currency) => {
												return (
													<option key={currency.id}>
														{currency.name}
													</option>
												);
											}
										)}
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
												key={addition.name}
												onChange={this.handleAdditions}
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
										Izaberite sliku za novododato vozilo.
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
