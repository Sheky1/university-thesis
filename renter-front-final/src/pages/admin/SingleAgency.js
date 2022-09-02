import React, { Component, useEffect, useState } from "react";
import { Row, Col, Container, Collapse } from "reactstrap";
import Header from "../../components/layout/Header";
import NavigationAdmin from "../../components/layout/NavigationAdmin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	FaArrowLeft,
	FaPen,
	FaMinusCircle,
	FaBookOpen,
	FaCar,
	FaSync,
} from "react-icons/fa";
import DeleteModal from "../../components/modals/DeleteModal";
import EditAgencyModal from "../../components/modals/EditAgencyModal";
import AgencyVehicles from "../../components/agencies/AgencyVehicles";

import { connect, useDispatch, useSelector } from "react-redux";
import Loading from "../../components/layout/Loading";
import ReservationList from "../../components/reservations/ReservationList";
import axios from "axios";
import * as actions from "../../store/actions/index";
import { api_axios } from "../../api/api";
import { handleErrors } from "../../store/utilities";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

// class SingleAgency extends Component {
//     _isMounted = false;
//     constructor(props) {
//         super(props);
//         state = {
//             modal: false,
//             modalEdit: false,
//             showVehicles: true,
//             loading: true,
//             agency: this.getAgencyFromSlug(this.props.match.params.slug),
//             current_page: 1,
//             current_page_reservations: 1,
//             total: 1,
//             total_reservations: 1,
//             per_page: 6,
//             x: window.screen.width,
//             collapse: true,
//         };
//     }

//     toggle = () => this.setModal(!state.modal);
//     toggleEdit = () => this.setModalEdit(!state.modalEdit);
//     toggleCollapse = () => this.setCollapse(!state.collapse);

//     setCollapse = (collapse) => {
//         if (this._isMounted) {
//             this.setState({
//                 collapse,
//             });
//         }
//     };

//     setShowVehicles = (showVehicles) => {
//         if (this._isMounted) {
//             this.setState({
//                 showVehicles,
//             });
//         }
//     };

//     setModal = (modal) => {
//         if (this._isMounted) {
//             this.setState({
//                 modal,
//             });
//         }
//     };

//     setModalEdit = (modalEdit) => {
//         if (this._isMounted) {
//             this.setState({
//                 modalEdit,
//             });
//         }
//     };

//     deleteItem = async (id) => {
//         try {
//             await api_axios("delete", `/agencies/${id}`, null);
//             toast.success("Uspešno obrisana agencija.");
//             this.props.history.push("/home-admin/");
//             this.props.deleteAgency(id);
//         } catch (error) {
//             console.log(error);
//             handleErrors(error);
//         }
//     };

//     getVehicles = async (id, pageNumber) => {
//         try {
//             if (this._isMounted) {
//                 this.setState({
//                     loading: true,
//                 });
//                 const headers = {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${atob(localStorage.token)}`,
//                     Accept: "application/json",
//                     "X-Api-Key": `adb69d232d124c98fe20400d9a4757d71380ba1d4200697e6817c99a30959ed2`,
//                 };
//                 const response = await axios.get(
//                     `http://localhost:8080/api?page=${pageNumber}&per_page=${state.per_page}`,
//                     {
//                         params: {
//                             agency_id: id,
//                             sort_direction: "desc",
//                         },
//                         headers,
//                     }
//                 );
//                 this.props.getVehicles(response.data);
//                 // const { current_page, total, last_page } = response.data.meta;
//                 this.setState({
//                     // current_page,
//                     // total,
//                     // last_page,
//                     loading: false,
//                 });
//             }
//         } catch (error) {
//             console.log(error);
//             handleErrors(error);
//         }
//     };

//     getReservations = async (id, pageNumber) => {
//         try {
//             if (this._isMounted) {
//                 this.setState({
//                     loading: true,
//                 });
//                 const headers = {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${atob(localStorage.token)}`,
//                     Accept: "application/json",
//                     "X-Api-Key": `adb69d232d124c98fe20400d9a4757d71380ba1d4200697e6817c99a30959ed2`,
//                 };
//                 const response = await axios.get(
//                     `http://localhost:8080/api?page=${pageNumber}&per_page=${state.per_page}`,
//                     {
//                         params: {
//                             agency_id: id,
//                             sort_direction: "desc",
//                         },
//                         headers,
//                     }
//                 );
//                 this.props.getReservations(response.data);
//                 // const { current_page, total, last_page } = response.data.meta;
//                 this.setState({
//                     // current_page_reservations: current_page,
//                     // total_reservations: total,
//                     // last_page,
//                     loading: false,
//                 });
//             }
//         } catch (error) {
//             console.log(error);
//             handleErrors(error);
//         }
//     };

//     getAgencyFromSlug = (slug) => {
//         const agency = this.props.agencies.find(
//             (agency) => agency.id === parseInt(slug)
//         );
//         return agency;
//     };

//     getAgencies = async () => {
//         try {
//             const response = await api_axios("get", `/agencies`, null);
//             if (this._isMounted) {
//                 const agencies = response.data;
//                 this.props.getAgencies(agencies);
//                 this.setState({
//                     agency: this.getAgencyFromSlug(
//                         this.props.match.params.slug
//                     ),
//                 });
//                 this.getVehicles(state.agency.id);
//                 this.getReservations(state.agency.id);
//             }
//         } catch (error) {
//             console.log(error);
//             handleErrors(error);
//         }
//     };

//     componentDidMount() {
//         this._isMounted = true;
//         // if (this.props.agencies.length === 0) {
//         this.getAgencies();
//         // } else {
//         //     this.setState({
//         //         agency: this.getAgencyFromSlug(this.props.match.params.slug),
//         //     });
//         //     this.getVehicles(state.agency.id);
//         //     this.getReservations(state.agency.id);
//         // }
//     }

//     componentWillUnmount() {
//         this._isMounted = false;
//     }

//     render() {
//         if (!state.agency) {
//             return (
//                 <>
//                     <Container
//                         fluid
//                         style={{ paddingLeft: 0, paddingRight: 0 }}
//                     >
//                         <Row style={{ width: "100%", margin: 0 }}>
//                             <Col lg="2" className="px-0">
//                                 <NavigationAdmin />
//                             </Col>
//                             <Col lg="10" className="px-0">
//                                 <Header />
//                                 {state.loading ? (
//                                     <Loading />
//                                 ) : (
//                                     <>
//                                         <div className="error">
//                                             <h3 className="error-vehicle">
//                                                 Ne postoji tražena agencija.
//                                             </h3>
//                                             <Link
//                                                 to="/home-admin/"
//                                                 className="btn-primary"
//                                             >
//                                                 <span>
//                                                     <FaArrowLeft />
//                                                 </span>{" "}
//                                                 Nazad na pregled agencija
//                                             </Link>
//                                         </div>
//                                     </>
//                                 )}
//                             </Col>
//                         </Row>
//                     </Container>
//                 </>
//             );
//         }

//         return (
//             <>
//                 <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
//                     <Row style={{ width: "100%", margin: 0 }}>
//                         <Col md="2" xs="10" className="px-0">
//                             {state.x < 768 ? (
//                                 <Collapse isOpen={!state.collapse}>
//                                     <NavigationAdmin
//                                         toggle={this.toggleCollapse}
//                                     />
//                                 </Collapse>
//                             ) : (
//                                 <Collapse isOpen={state.collapse}>
//                                     <NavigationAdmin
//                                         toggle={this.toggleCollapse}
//                                     />
//                                 </Collapse>
//                             )}
//                         </Col>
//                         <Col xs="12" md="10" className="px-0">
//                             <Header toggle={this.toggleCollapse} />
//                             {state.loading ? (
//                                 <Loading />
//                             ) : (
//                                 <>
//                                     <DeleteModal
//                                         modal={state.modal}
//                                         toggle={this.toggle}
//                                         text={state.agency.name}
//                                         deleteItem={this.deleteItem}
//                                         id={state.agency.id}
//                                     />
//                                     <EditAgencyModal
//                                         modal={state.modalEdit}
//                                         toggle={this.toggleEdit}
//                                         agency={this.props.agencies.find(
//                                             (agency) =>
//                                                 agency.id ===
//                                                 state.agency.id
//                                         )}
//                                     />
//                                     <div className="top-banner">
//                                         <p>
//                                             Pregled agencije:{" "}
//                                             {state.agency.name}
//                                         </p>

//                                         <div>
//                                             <button
//                                                 className="btn-primary btn-small"
//                                                 style={{
//                                                     marginRight: "15px",
//                                                 }}
//                                                 onClick={this.toggleEdit}
//                                             >
//                                                 <span>
//                                                     <FaPen />
//                                                 </span>{" "}
//                                                 Izmeni
//                                             </button>
//                                             <button
//                                                 className="btn-primary btn-small"
//                                                 style={{
//                                                     backgroundColor:
//                                                         "rgb(207, 73, 73)",
//                                                     marginRight: "15px",
//                                                 }}
//                                                 onClick={this.toggle}
//                                             >
//                                                 <span>
//                                                     <FaMinusCircle />
//                                                 </span>{" "}
//                                                 Obriši
//                                             </button>
//                                         </div>

//                                         <Link to="/home-admin/">
//                                             <button className="btn-primary btn-small">
//                                                 <span>
//                                                     <FaArrowLeft />
//                                                 </span>{" "}
//                                                 Nazad na pregled agencija
//                                             </button>
//                                         </Link>
//                                     </div>
//                                     <section className="agency-preview">
//                                         <img
//                                             src={state.agency.logo}
//                                             alt=""
//                                         />
//                                         <h3 className="agency-preview-name">
//                                             {state.agency.name}
//                                         </h3>
//                                         <div className="agency-preview-buttons">
//                                             <button
//                                                 className="btn-primary btn-small"
//                                                 style={{ marginRight: "15px" }}
//                                                 onClick={() =>
//                                                     this.setShowVehicles(true)
//                                                 }
//                                             >
//                                                 <span>
//                                                     <FaCar />
//                                                 </span>{" "}
//                                                 Vozila
//                                             </button>
//                                             <button
//                                                 className="btn-primary btn-small"
//                                                 onClick={() =>
//                                                     this.setShowVehicles(false)
//                                                 }
//                                             >
//                                                 <span>
//                                                     <FaBookOpen />
//                                                 </span>{" "}
//                                                 Rezervacije
//                                             </button>
//                                         </div>

//                                         {state.showVehicles ? (
//                                             <>
//                                                 <AgencyVehicles
//                                                     key={this.props.agencies.find(
//                                                         (agency) =>
//                                                             agency.id ===
//                                                             state.agency.id
//                                                     )}
//                                                     vehicles={
//                                                         this.props.vehicles
//                                                     }
//                                                 />
//                                                 {state.last_page !== 1 ? (
//                                                     <div
//                                                         style={{
//                                                             display: "flex",
//                                                             justifyContent:
//                                                                 "center",
//                                                             alignItems:
//                                                                 "center",
//                                                         }}
//                                                     >
//                                                         <Pagination
//                                                             activePage={
//                                                                 this.state
//                                                                     .current_page
//                                                             }
//                                                             totalItemsCount={
//                                                                 state.total
//                                                             }
//                                                             itemsCountPerPage={
//                                                                 this.state
//                                                                     .per_page
//                                                             }
//                                                             onChange={(
//                                                                 pageNumber
//                                                             ) =>
//                                                                 this.getVehicles(
//                                                                     this.state
//                                                                         .agency
//                                                                         .id,
//                                                                     pageNumber
//                                                                 )
//                                                             }
//                                                             itemClass="page-item"
//                                                             linkClass="page-link"
//                                                             firstPageText="Prva Stranica"
//                                                             lastPageText="Poslednja stranica"
//                                                         />
//                                                     </div>
//                                                 ) : (
//                                                     <></>
//                                                 )}
//                                             </>
//                                         ) : (
//                                             <>
//                                                 {this.props.reservations
//                                                     .length === 0 ? (
//                                                     <div className="empty-search">
//                                                         <h3>
//                                                             Trenutno nema
//                                                             rezervacija
//                                                         </h3>
//                                                     </div>
//                                                 ) : (
//                                                     <ReservationList
//                                                         reservations={
//                                                             this.props
//                                                                 .reservations
//                                                         }
//                                                         flag="admin"
//                                                     />
//                                                 )}
//                                                 {state.last_page !== 1 ? (
//                                                     <div
//                                                         style={{
//                                                             display: "flex",
//                                                             justifyContent:
//                                                                 "center",
//                                                             alignItems:
//                                                                 "center",
//                                                         }}
//                                                     >
//                                                         <Pagination
//                                                             activePage={
//                                                                 this.state
//                                                                     .current_page_reservations
//                                                             }
//                                                             totalItemsCount={
//                                                                 this.state
//                                                                     .total_reservations
//                                                             }
//                                                             itemsCountPerPage={
//                                                                 this.state
//                                                                     .per_page
//                                                             }
//                                                             onChange={(
//                                                                 pageNumber
//                                                             ) =>
//                                                                 this.getReservations(
//                                                                     this.state
//                                                                         .agency
//                                                                         .id,
//                                                                     pageNumber
//                                                                 )
//                                                             }
//                                                             itemClass="page-item"
//                                                             linkClass="page-link"
//                                                             firstPageText="Prva Stranica"
//                                                             lastPageText="Poslednja stranica"
//                                                         />
//                                                     </div>
//                                                 ) : (
//                                                     <></>
//                                                 )}
//                                             </>
//                                         )}
//                                     </section>
//                                 </>
//                             )}
//                         </Col>
//                     </Row>
//                 </Container>
//             </>
//         );
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         agencies: state.agencies,
//         vehicles: state.vehicles,
//         reservations: state.reservations,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getVehicles: (vehicles) => dispatch(actions.getVehicles(vehicles)),
//         getReservations: (reservations) =>
//             dispatch(actions.getReservations(reservations)),
//         getAgencies: (agencies) => dispatch(actions.getAgencies(agencies)),
//         deleteAgency: (agency) => dispatch(actions.deleteAgency(agency)),
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SingleAgency);

const SingleAgency = (props) => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [state, setState] = useState({ collapse: true });
	const [_isMounted, setIsMounted] = useState(false);
	const agencies = useSelector((state) => state.agencies);
	const vehicles = useSelector((state) => state.vehicles);
	const reservations = useSelector((state) => state.reservations);

	useEffect(() => {
		setIsMounted(true);
		getAgencies();
	}, []);

	useEffect(() => {
		const pathParts = location.pathname.split("/");
		setState({
			...state,
			modal: false,
			modalEdit: false,
			showVehicles: true,
			loading: true,
			agency: getAgencyFromSlug(pathParts[pathParts.length - 1]),
			current_page: 1,
			total: 1,
			per_page: 6,
			collapse: true,
		});
	}, [agencies]);

	const toggle = () => setModal(!state.modal);
	const toggleEdit = () => setModalEdit(!state.modalEdit);
	const toggleCollapse = () => setCollapse(!state.collapse);

	const setShowVehicles = (showVehicles) => {
		if (_isMounted) {
			setState({
				...state,
				showVehicles,
			});
		}
	};

	const setModal = (modal) => {
		if (_isMounted) {
			setState({
				...state,
				modal,
			});
		}
	};

	const setModalEdit = (modalEdit) => {
		if (_isMounted) {
			setState({
				...state,
				modalEdit,
			});
		}
	};

	const setCollapse = (collapse) => {
		if (_isMounted) {
			setState({
				...state,
				collapse,
			});
		}
	};

	const deleteItem = async (id) => {
		try {
			const response = await api_axios("delete", `/agencies/${id}`, null);
			console.log(response);
			navigate("/home-admin/");
			toast.success("Uspešno obrisana agencija.");
			dispatch(actions.deleteAgency(id));
		} catch (error) {
			console.log(error);
			handleErrors(error);
		}
	};

	const getVehicles = async (id, agencies, pageNumber) => {
		try {
			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.token}`,
				Accept: "application/json",
				"X-Api-Key": `adb69d232d124c98fe20400d9a4757d71380ba1d4200697e6817c99a30959ed2`,
			};
			// const response = await axios.get(
			//   `http://localhost:8080/api/agencies/vehicles?page=${pageNumber}&per_page=${state.per_page}`,
			//   {
			//     params: {
			//       agency_id: id,
			//     },
			//     headers,
			//   }
			// );
			const response = await axios.get(
				`http://localhost:8080/api/agencies/${id}/vehicles`,
				{
					headers,
				}
			);
			dispatch(actions.getVehicles(response.data));
			// const { current_page, total } = response.data.meta;
			// setState({
			//   current_page,
			//   total,
			//   loading: false
			setState({
				...state,
				modal: false,
				modalEdit: false,
				showVehicles: true,
				loading: false,
				agency: agencies.find((agency) => agency.id === id),
				current_page: 1,
				total: 1,
				per_page: 6,
			});
		} catch (error) {
			console.log(error);
			handleErrors(error);
		}
	};
	console.log(vehicles);

	const getReservations = async (id, pageNumber) => {
		try {
			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.token}`,
				Accept: "application/json",
				"X-Api-Key": `adb69d232d124c98fe20400d9a4757d71380ba1d4200697e6817c99a30959ed2`,
			};
			// const response = await axios.get(
			//   `http://localhost:8080/api/agencies/reservations?page=${pageNumber}&per_page=${state.per_page}`,
			//   {
			//     params: {
			//       agency_id: id,
			//     },
			//     headers,
			//   }
			// );
			const response = await axios.get(
				`http://localhost:8080/api/agencies/reservations`,
				{
					params: {
						agency_id: id,
					},
					headers,
				}
			);
			dispatch(actions.getReservations(response.data));
			setState({
				...state,
				loading: false,
			});
		} catch (error) {
			console.log(error);
			handleErrors(error);
		}
	};

	const getAgencyFromSlug = (slug) => {
		const agency = agencies.find((agency) => agency.id === parseInt(slug));
		return agency;
	};

	const getAgencies = async () => {
		try {
			const response = await api_axios("get", `/agencies`, null);
			const pathParts = location.pathname.split("/");
			const agencies = response.data;
			dispatch(actions.getAgencies(agencies));
			const agency = response.data.find(
				(agency) =>
					agency.id === parseInt(pathParts[pathParts.length - 1])
			);
			setState({
				...state,
				agency,
			});
			getVehicles(agency.id, agencies);
			// getReservations(agency.id);
		} catch (error) {
			console.log(error);
			handleErrors(error);
		}
	};
	console.log(state);
	if (!state.agency) {
		return (
			<>
				<Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
					<Row style={{ width: "100%", margin: 0 }}>
						<Col lg="2" className="px-0">
							<NavigationAdmin />
						</Col>
						<Col lg="10" className="px-0">
							<Header />
							{state.loading ? (
								<Loading />
							) : (
								<>
									<div className="error">
										<h3 className="error-vehicle">
											No such agency could be found
										</h3>
										<Link
											to="/home-admin/"
											className="btn-primary"
										>
											<span>
												<FaArrowLeft />
											</span>{" "}
											Back to home
										</Link>
									</div>
								</>
							)}
						</Col>
					</Row>
				</Container>
			</>
		);
	}

	return (
		<>
			<Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
				<Row style={{ width: "100%", margin: 0 }}>
					<Col md="2" xs="10" className="px-0">
						{state.x < 768 ? (
							<Collapse isOpen={!state.collapse}>
								<NavigationAdmin toggle={toggleCollapse} />
							</Collapse>
						) : (
							<Collapse isOpen={state.collapse}>
								<NavigationAdmin toggle={toggleCollapse} />
							</Collapse>
						)}
					</Col>
					<Col xs="12" md="10" className="px-0">
						<Header toggle={toggleCollapse} />
						{state.loading ? (
							<Loading />
						) : (
							<>
								<DeleteModal
									modal={state.modal}
									toggle={toggle}
									text={state.agency.name}
									deleteItem={deleteItem}
									id={state.agency.id}
								/>
								<EditAgencyModal
									modal={state.modalEdit}
									toggle={toggleEdit}
									agency={agencies.find(
										(agency) =>
											agency.id === state.agency.id
									)}
								/>
								<div className="top-banner">
									<p>Pregled agencije: {state.agency.name}</p>

									<div>
										<button
											className="btn-primary btn-small"
											style={{
												marginRight: "15px",
											}}
											onClick={toggleEdit}
										>
											<span>
												<FaPen />
											</span>{" "}
											Izmeni
										</button>
										<button
											className="btn-primary btn-small"
											style={{
												backgroundColor:
													"rgb(207, 73, 73)",
												marginRight: "15px",
											}}
											onClick={toggle}
										>
											<span>
												<FaMinusCircle />
											</span>{" "}
											Obriši
										</button>
									</div>

									<Link to="/home-admin/">
										<button className="btn-primary btn-small">
											<span>
												<FaArrowLeft />
											</span>{" "}
											Nazad na pregled agencija
										</button>
									</Link>
								</div>
								<section className="agency-preview">
									<img src={state.agency.logo} alt="" />
									<h3 className="agency-preview-name">
										{state.agency.name}
									</h3>
									<div className="agency-preview-buttons">
										<button
											className="btn-primary btn-small"
											style={{ marginRight: "15px" }}
											onClick={() =>
												setShowVehicles(true)
											}
										>
											<span>
												<FaCar />
											</span>{" "}
											Vozila
										</button>
										<button
											className="btn-primary btn-small"
											onClick={() =>
												setShowVehicles(false)
											}
										>
											<span>
												<FaBookOpen />
											</span>{" "}
											Rezervacije
										</button>
									</div>

									{state.showVehicles ? (
										<>
											<AgencyVehicles
												key={agencies.find(
													(agency) =>
														agency.id ===
														state.agency.id
												)}
												vehicles={vehicles}
											/>
											{vehicles.length > 0 ? (
												<div
													style={{
														display: "flex",
														justifyContent:
															"center",
														alignItems: "center",
													}}
												>
													<Pagination
														activePage={
															state.current_page
														}
														totalItemsCount={
															state.total
														}
														itemsCountPerPage={
															state.per_page
														}
														onChange={(
															pageNumber
														) =>
															getVehicles(
																state.agency.id,
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
									) : (
										<>
											{reservations.length === 0 ? (
												<div className="empty-search">
													<h3>
														Trenutno nema
														rezervacija
													</h3>
												</div>
											) : (
												<ReservationList
													reservations={reservations}
													flag="admin"
												/>
											)}
											{reservations.length > 1 ? (
												<div
													style={{
														display: "flex",
														justifyContent:
															"center",
														alignItems: "center",
													}}
												>
													<Pagination
														activePage={
															state.current_page_reservations
														}
														totalItemsCount={
															state.total_reservations
														}
														itemsCountPerPage={
															state.per_page
														}
														onChange={(
															pageNumber
														) =>
															getReservations(
																state.agency.id,
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
								</section>
							</>
						)}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default SingleAgency;
