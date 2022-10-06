import React, { Component } from "react";
import {
	Row,
	Col,
	Container,
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	Collapse,
} from "reactstrap";
import DatePicker from "react-date-picker";
import Header from "../../components/layout/Header";
import NavigationAdmin from "../../components/layout/NavigationAdmin";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Loading from "../../components/layout/Loading";
import ErrorModal from "../../components/modals/ErrorModal";

import { connect } from "react-redux";
import { params_axios } from "../../api/api";
import { handleErrors } from "../../store/utilities";
import { api_axios } from "../../api/api";
import * as actions from "../../store/actions/index";
import PdfComponent from "../../components/pdf/PdfComponent";
import axios from "axios";

const currentYear = new Date().getFullYear();

class Reports extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			errorModal: false,
			errorText: "",
			loading: false,
			tableShow: false,
			date_from: new Date(currentYear, 0, 1),
			date_to: new Date(),
			fromDate: "",
			toDate: "",
			name: "",
			x: window.screen.width,
			collapse: true,
			report_type: "",
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

	toggleCollapse = () => this.setCollapse(!this.state.collapse);

	setCollapse = (collapse) => {
		if (this._isMounted) {
			this.setState({
				collapse,
			});
		}
	};

	onChangeFrom = (date) => {
		this.setState({
			fromDate: date,
			date_from: date,
		});
	};

	onChangeTo = (date) => {
		this.setState({
			toDate: date,
			date_to: date,
		});
	};

	formatDate = (date) => {
		return date.toISOString().replace(/T/, " ").replace(/\..+/, "");
	};

	getReports = async () => {
		try {
			if (this.state.report_type === "") {
				this.setState({
					errorText: "Neophodno je odabrati vrstu izveštaja.",
				});
				this.toggleError();
				return;
			}
			if (this.state.name === "") {
				this.setState({
					errorText: "Neophodno je odabrati agenciju.",
				});
				this.toggleError();
				return;
			}
			this.setState({
				loading: true,
			});
			const agency = this.props.agencies.filter((agency) => {
				if (agency.name === this.state.name) return agency;
				return null;
			});
			const agency_id = agency.map((ag) => ag.id);
			let from_date, to_date;
			if (this.state.date_from === null) {
				from_date = this.formatDate(new Date(currentYear, 0, 1));
			} else {
				from_date = this.formatDate(this.state.date_from);
			}
			if (this.state.date_to === null) {
				to_date = this.formatDate(new Date());
			} else {
				to_date = this.formatDate(this.state.date_to);
			}
			const params = {
				from_date,
				to_date,
				agency_id,
			};
			// const response = await params_axios(
			//     `/reports/agencyReservations`,
			//     params
			// );
			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.token}`,
				Accept: "application/json",
				"X-Api-Key": `adb69d232d124c98fe20400d9a4757d71380ba1d4200697e6817c99a30959ed2`,
			};
			const response = await axios.get(
				`http://localhost:8080/api/reservations/agency/${agency_id}`,
				{
					headers,
				}
			);
			if (this._isMounted) {
				this.props.getReports(response.data);
				console.log(this.props.reports);
				this.setState({
					loading: false,
					tableShow: true,
				});
			}
		} catch (error) {
			handleErrors(error);
		}
	};

	getAgencies = async () => {
		try {
			const response = await api_axios("get", `/agencies`, null);
			if (this._isMounted) {
				this.props.getAgencies(response.data);

				this.setState({
					loading: false,
				});
			}
		} catch (error) {
			handleErrors(error);
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

	componentDidMount() {
		this._isMounted = true;
		this.getAgencies();
	}

	render() {
		return (
			<>
				<ErrorModal
					modal={this.state.errorModal}
					toggle={this.toggleError}
					text={this.state.errorText}
				/>
				<Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
					<Row style={{ width: "100%", margin: 0 }}>
						<Col md="2" xs="10" className="px-0">
							{this.state.x < 768 ? (
								<Collapse isOpen={!this.state.collapse}>
									<NavigationAdmin
										toggle={this.toggleCollapse}
									/>
								</Collapse>
							) : (
								<Collapse isOpen={this.state.collapse}>
									<NavigationAdmin
										toggle={this.toggleCollapse}
									/>
								</Collapse>
							)}
						</Col>
						<Col xs="12" md="10" className="px-0">
							<Header toggle={this.toggleCollapse} />
							<div className="top-banner">
								<p>Prikaz izveštaja</p>

								<Link
									to="/home-admin/"
									style={{
										gridColumn: "3",
									}}
								>
									<button className="btn-primary btn-small">
										<span>
											<FaArrowLeft />
										</span>{" "}
										Nazad na pregled agencija
									</button>
								</Link>
							</div>

							<div className="agency-preview">
								<Form
									style={{
										width: "100%",
										padding: "2rem",
									}}
									onSubmit={(e) => {
										e.preventDefault();
									}}
								>
									<FormGroup row style={{ width: "100%" }}>
										<Label for="report_type" sm={2}>
											Vrsta izveštaja
										</Label>
										<Col sm={10}>
											<Input
												type="select"
												name="report_type"
												id="report_type"
												value={this.state.report_type}
												onChange={this.handleChange}
											>
												<option value="" disabled>
													Vrsta izveštaja
												</option>
												<option value="1">
													Izveštaj prema rezervacijama
												</option>
											</Input>
										</Col>
									</FormGroup>
									<FormGroup row style={{ width: "100%" }}>
										<Label for="reports" sm={2}>
											Odaberi agenciju:
										</Label>
										<Col sm={10}>
											<Input
												type="select"
												name="name"
												id="name"
												value={this.state.name}
												onChange={this.handleChange}
											>
												<option value="" disabled>
													Odaberi agenciju
												</option>
												{this.props.agencies.map(
													(agency) => {
														return (
															<option
																key={agency.id}
															>
																{agency.name}
															</option>
														);
													}
												)}
											</Input>
										</Col>
									</FormGroup>
									<FormGroup>
										<Col sm={6} className="p-3">
											<DatePicker
												// selected={startDate}
												locale="sr"
												maxDate={new Date()}
												onChange={this.onChangeFrom}
												value={this.state.fromDate}
												dayPlaceholder={"dd"}
												monthPlaceholder={"mm"}
												yearPlaceholder={"yyyy"}
												className="date-picker"
												format={"dd.MM.yyyy"}
												clearIcon={null}
												// customInput={<ExampleCustomInput />}
											/>
											<DatePicker
												// selected={startDate}
												locale="sr"
												maxDate={new Date()}
												onChange={this.onChangeTo}
												value={this.state.toDate}
												dayPlaceholder={"dd"}
												monthPlaceholder={"mm"}
												yearPlaceholder={"yyyy"}
												className="date-picker"
												format={"dd.MM.yyyy"}
												clearIcon={null}
												// customInput={<ExampleCustomInput />}
											/>
										</Col>
										<Col sm={6} className="p-3">
											<Button
												className="btn-primary btn-small btn-green"
												onClick={() =>
													this.getReports()
												}
												style={{
													padding: "7px 25px",
												}}
												color="success"
											>
												Filtriraj
											</Button>{" "}
										</Col>
									</FormGroup>
								</Form>
								<Col xs={12} className="p-3">
									{this.state.loading ? (
										<Loading />
									) : this.state.tableShow ? (
										<PdfComponent
											reports={this.props.reports}
										/>
									) : (
										<></>
									)}
								</Col>
							</div>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		reservations: state.reservations,
		agencies: state.agencies,
		reports: state.reports,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAgencies: (agencies) => dispatch(actions.getAgencies(agencies)),
		getReports: (reports) => dispatch(actions.getReports(reports)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
