import React, { Component } from "react";
import {
	Row,
	Col,
	Container,
	Collapse,
	ButtonDropdown,
	DropdownToggle,
	DropdownItem,
	DropdownMenu,
} from "reactstrap";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import ReservationList from "../../components/reservations/ReservationList";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import {
	FaArrowLeft,
	FaExclamation,
	FaFlagCheckered,
	FaFilter,
	FaHourglass,
} from "react-icons/fa";
import Loading from "../../components/layout/Loading";
import { params_axios } from "../../api/api";
import * as actions from "../../store/actions/index";
import axios from "axios";

import { connect } from "react-redux";
import { handleErrors } from "../../store/utilities";

class Reseravations extends Component {
	_isMounted = false;
	state = {
		modal: false,
		errorModal: false,
		dropdownOpen: false,
		errorText: "",
		loading: true,
		name: "",
		current_page: 1,
		total: 1,
		per_page: 6,
		x: window.screen.width,
		collapse: true,
		filter: "",
	};

	toggleDropdown = () => this.setDropdown(!this.state.dropdownOpen);

	setDropdown = (dropdownOpen) => {
		if (this._isMounted) {
			this.setState({
				dropdownOpen,
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

	getReservations = async (pageNumber) => {
		try {
			// const response = await api_axios(
			//     "get",
			//     `/reservations?page=${pageNumber}&per_page=${this.state.per_page}&sort_direction=desc`,
			//     null
			// );
			this.setState({
				loading: true,
			});
			let params;
			if (this.state.filter !== "") {
				console.log("eyo");
				params = {
					page: pageNumber,
					per_page: this.state.per_page,
					sort_direction: "desc",
					[this.state.filter]: 1,
				};
			} else {
				params = {
					page: pageNumber,
					per_page: this.state.per_page,
					sort_direction: "desc",
				};
			}
			const response = await params_axios(`/reservations`, params);
			if (this._isMounted) {
				console.log(response.data);
				this.props.getReservations(response.data.data);
				const { current_page, total, last_page } = response.data.meta;
				this.setState({
					current_page,
					total,
					last_page,
					loading: false,
				});
			}
		} catch (error) {
			handleErrors(error);
		}
	};

	componentDidMount() {
		this._isMounted = true;
		this.getReservations();
	}

	filterReservations = async (type) => {
		try {
			this.setState({
				loading: true,
			});
			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${atob(localStorage.token)}`,
				Accept: "application/json",
				"X-Api-Key": `adb69d232d124c98fe20400d9a4757d71380ba1d4200697e6817c99a30959ed2`,
			};
			let params;
			if (type === "waiting") {
				params = {
					is_approved: 0,
					is_rejected: 0,
					is_completed: 0,
					per_page: this.state.per_page,
				};
			} else {
				params = {
					[type]: 1,
					per_page: this.state.per_page,
				};
			}
			console.log(params);
			const response = await axios.get(
				"http://localhost:8080/api?sort_direction=desc",
				{
					params,
					headers,
				}
			);
			console.log(response.data);
			this.props.getReservations(response.data.data);
			const { current_page, total, last_page } = response.data.meta;
			this.setState({
				filter: type,
				current_page,
				total,
				last_page,
				loading: false,
			});
		} catch (error) {
			handleErrors(error);
		}
	};

	render() {
		return (
			<>
				<Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
					<Row style={{ width: "100%", margin: 0 }}>
						<Col md="2" xs="10" className="px-0">
							{this.state.x < 768 ? (
								<Collapse isOpen={!this.state.collapse}>
									<Navigation toggle={this.toggleCollapse} />
								</Collapse>
							) : (
								<Collapse isOpen={this.state.collapse}>
									<Navigation toggle={this.toggleCollapse} />
								</Collapse>
							)}
						</Col>
						<Col xs="12" md="10" className="px-0">
							<Header toggle={this.toggleCollapse} />
							<div className="top-banner">
								<p>Rezervacije</p>
								<ButtonDropdown
									isOpen={this.state.dropdownOpen}
									toggle={this.toggleDropdown}
								>
									<DropdownToggle color="primary">
										<span>
											<FaFilter />
										</span>
										Filter rezervacija
									</DropdownToggle>
									<DropdownMenu
										style={{
											backgroundColor: "#106ad6",
										}}
									>
										<DropdownItem
											className="res-filter"
											onClick={() =>
												this.filterReservations(
													"waiting"
												)
											}
										>
											<span>
												<FaHourglass />
											</span>{" "}
											Čeka na odobrenje
										</DropdownItem>
										<DropdownItem
											className="res-filter"
											onClick={() =>
												this.filterReservations(
													"is_completed"
												)
											}
										>
											<span>
												<FaFlagCheckered />
											</span>{" "}
											Prihvaćene
										</DropdownItem>
										<DropdownItem
											className="res-filter"
											onClick={() =>
												this.filterReservations(
													"is_rejected"
												)
											}
										>
											<span>
												<FaExclamation />
											</span>{" "}
											Odbačene
										</DropdownItem>
									</DropdownMenu>
								</ButtonDropdown>
								{/* <div className="top-banner-buttons">
                                    <button
                                        className="btn-primary btn-small"
                                        style={{
                                            marginRight: "15px",
                                            backgroundColor: "#e07b39",
                                        }}
                                        onClick={() =>
                                            this.filterReservations(
                                                "is_approved"
                                            )
                                        }
                                    >
                                        <span>
                                            <FaCheck />
                                        </span>{" "}
                                        Prihvaćene
                                    </button>
                                    <button
                                        className="btn-primary btn-small"
                                        style={{
                                            marginRight: "15px",
                                            backgroundColor: "#16b841",
                                        }}
                                        onClick={() =>
                                            this.filterReservations(
                                                "is_completed"
                                            )
                                        }
                                    >
                                        <span>
                                            <FaFlagCheckered />
                                        </span>{" "}
                                        Završene
                                    </button>
                                    <button
                                        className="btn-primary btn-small"
                                        style={{
                                            marginRight: "15px",
                                            backgroundColor: "rgb(207, 73, 73)",
                                        }}
                                        onClick={() =>
                                            this.filterReservations(
                                                "is_rejected"
                                            )
                                        }
                                    >
                                        <span>
                                            <FaExclamation />
                                        </span>{" "}
                                        Odbačene
                                    </button>
                                </div> */}

								<Link to="/home-agency/">
									<button className="btn-primary btn-small">
										<span>
											<FaArrowLeft />
										</span>{" "}
										Nazad na pregled vozila
									</button>
								</Link>
							</div>
							{this.state.loading ? (
								<Loading />
							) : this.props.reservations.length === 0 ? (
								<h2 style={{ margin: "20px" }}>
									Trenutno ne postoji nijedna rezervacija.
								</h2>
							) : (
								<>
									<ReservationList
										reservations={this.props.reservations}
										updateReservation={
											this.props.updateReservation
										}
									/>
									{this.state.last_page !== 1 ? (
										<div
											style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<Pagination
												activePage={
													this.state.current_page
												}
												totalItemsCount={
													this.state.total
												}
												itemsCountPerPage={
													this.state.per_page
												}
												onChange={(pageNumber) =>
													this.getReservations(
														pageNumber
													)
												}
												itemClass="page-item"
												linkClass="page-link"
												firstPageText="Prva Stranica"
												lastPageText="Poslednja stranica"
											/>
										</div>
									) : (
										<></>
									)}
								</>
							)}
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getReservations: (reservations) =>
			dispatch(actions.getReservations(reservations)),
		updateReservation: (reservation) =>
			dispatch(actions.updateReservation(reservation)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Reseravations);
