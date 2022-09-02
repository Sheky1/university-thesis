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
} from "reactstrap";

import { connect } from "react-redux";
import ErrorModal from "./ErrorModal";
import { api_axios } from "../../api/api";
import { toast } from "react-toastify";
import { handleErrors } from "../../store/utilities";
import * as actions from "../../store/actions/index";

class EditAdditionModal extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			errorModal: false,
			errorText: "",
			name: this.props.addition.name,
			price: this.props.addition.price,
			currency: this.props.addition.currency.name,
		};
	}

	toggleError = () => this.setErrorModal(!this.state.errorModal);

	setErrorModal = (errorModal) => {
		if (this._isMounted) {
			this.setState({
				errorModal,
			});
		}
	};

	resetState = () => {
		this.setState({
			name: this.props.addition.name,
			price: this.props.addition.price,
		});
		this.props.toggle();
	};

	handleChange = (e) => {
		const { name, value } = e.target;

		this.setState({
			[name]: value,
		});
	};

	getCurrencies = async () => {
		try {
			if (this._isMounted) {
				let response;

				if (this.props.currencies.length === 0) {
					response = await api_axios("get", `/currencies`, null);
					this.props.getCurrencies(response.data);
				}
				// if (this.props.currencies.length !== 0) {
				//     this.setState({
				//         currency: this.props.currencies[0].name,
				//     });
				// }
			}
		} catch (error) {
			console.log(error);
			handleErrors(error);
		}
	};

	checkInputs = () => {
		console.log(this.state.price);
		if (this.state.name === "") {
			this.setState({
				errorText: 'Polje "Naziv dodatka" je neophodno.',
			});
			this.toggleError();
			return true;
		}
		if (this.state.price === "") {
			this.setState({
				errorText: 'Polje "Cena dodatka" je neophodno.',
			});
			this.toggleError();
			return true;
		}
		if (this.state.price === "0") {
			this.setState({
				errorText: 'Polje "Cena dodatka" je ne može biti nula.',
			});
			this.toggleError();
			return true;
		}
	};

	onSubmit = async () => {
		try {
			if (this._isMounted) {
				if (this.checkInputs()) return;
				const currency = this.props.currencies.find(
					(currency) => currency.name === this.state.currency
				);
				const user = JSON.parse(localStorage.getItem("user"));

				let { name, price } = this.state;

				let updatedAddition = {
					name,
					price,
					currencyId: currency.id,
					userId: user.id,
				};

				const response = await api_axios(
					"put",
					`/additions/${this.props.addition.id}`,
					updatedAddition
				);
				toast.success("Uspešno izmenjen dodatak.");
				this.props.updateAddition(response.data);
				this.resetState();
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
		this.getCurrencies();
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
					size="lg"
				>
					<ModalHeader toggle={() => this.props.toggle()}>
						Izmena dodatka
					</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup row style={{ width: "100%" }}>
								<Label for="name" sm={4}>
									Naziv dodatka
								</Label>
								<Col sm={8}>
									<Input
										type="text"
										name="name"
										id="name"
										placeholder="Klima"
										value={this.state.name}
										onChange={this.handleChange}
									/>
								</Col>
							</FormGroup>
							<FormGroup row style={{ width: "100%" }}>
								<Label for="price" sm={4}>
									Cena dodatka
								</Label>
								<Col sm={8}>
									<Input
										type="number"
										name="price"
										id="price"
										placeholder="100"
										value={this.state.price}
										onChange={this.handleChange}
									/>
								</Col>
							</FormGroup>
							<FormGroup row style={{ width: "100%" }}>
								<Label for="currency" sm={4}>
									Valuta
								</Label>
								{this.props.currencies.length !== 0 ? (
									<Col sm={8}>
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
							onClick={() => this.resetState()}
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
		currencies: state.currencies,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateAddition: (addition) =>
			dispatch(actions.updateAddition(addition)),
		getCurrencies: (currencies) =>
			dispatch(actions.getCurrencies(currencies)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAdditionModal);
