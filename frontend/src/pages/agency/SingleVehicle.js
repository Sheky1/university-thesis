import React, { Component, useEffect, useState } from "react";
import { Row, Col, Container, Collapse } from "reactstrap";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import { toast } from "react-toastify";
import VehicleInfo from "../../components/vehicles/VehicleInfo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	FaArrowLeft,
	FaPen,
	FaMinusCircle,
	FaBookOpen,
	FaSync,
} from "react-icons/fa";
import DeleteModal from "../../components/modals/DeleteModal";
import EditVehicleModal from "../../components/modals/EditVehicleModal";
import VehicleInfoModal from "../../components/modals/VehicleInfoModal";

import { connect, useDispatch, useSelector } from "react-redux";
import Loading from "../../components/layout/Loading";
import { api_axios } from "../../api/api";
import * as actions from "../../store/actions/index";
import { handleErrors } from "../../store/utilities";
import axios from "axios";

// class SingleVehicle extends Component {
//     _isMounted = false;
//     constructor(props) {
//         super(props);
//         state = {
//             modal: false,
//             modalEdit: false,
//             modalInfo: false,
//             loading: true,
//             vehicle: {},
//             x: window.screen.width,
//             collapse: true,
//         };
//     }

//     toggle = () => setModal(!state.modal);
//     toggleEdit = () => setModalEdit(!state.modalEdit);
//     toggleInfo = () => setModalInfo(!state.modalInfo);
//     toggleCollapse = () => this.setCollapse(!this.state.collapse);

//     setCollapse = (collapse) => {
//         if (this._isMounted) {
//             this.setState({
//                 collapse,
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

//     setModalInfo = (modalInfo) => {
//         if (this._isMounted) {
//             this.setState({
//                 modalInfo,
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

//     getVehicleFromSlug = (slug) => {
//         const vehicle = this.props.vehicles.find(
//             (vehicle) => vehicle.id === parseInt(slug)
//         );
//         return vehicle;
//     };

//     getVehicles = async () => {
//         try {
//             const response = await api_axios("get", `/vehicles`, null);
//             if (this._isMounted) {
//                 const vehicles = response.data;
//                 this.props.getVehicles(vehicles);
//                 this.setState({
//                     vehicle: this.getVehicleFromSlug(
//                         this.props.match.params.slug
//                     ),
//                 });
//                 this.getReservations();
//             }
//         } catch (error) {
//             handleErrors(error);
//         }
//     };

//     getReservations = async () => {
//         try {
//             const headers = {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${atob(localStorage.token)}`,
//                 Accept: "application/json",
//                 "X-Api-Key": `adb69d232d124c98fe20400d9a4757d71380ba1d4200697e6817c99a30959ed2`,
//             };
//             const params = {
//                 vehicle_id: this.state.vehicle.id,
//             };
//             const response = await axios.get("http://localhost:8080/api", {
//                 params,
//                 headers,
//             });
//             if (this._isMounted) {
//                 const reservations = response.data;
//                 this.props.getReservations(reservations);
//                 this.setState({
//                     loading: false,
//                 });
//             }
//         } catch (error) {
//             handleErrors(error);
//         }
//     };

//     deleteItem = async (id) => {
//         try {
//             await api_axios("delete", `/vehicles/${id}`, null);
//             toast.success("Uspešno obrisano vozilo.");
//             this.props.history.push("/home-agency/");
//             this.props.deleteVehicle(id);
//         } catch (error) {
//             handleErrors(error);
//         }
//     };

//     componentDidMount() {
//         this._isMounted = true;
//         this.getVehicles();
//     }

//     componentWillUnmount() {
//         this._isMounted = false;
//     }

//     render() {
//         if (!this.state.vehicle) {
//             return (
//                 <>
//                     <Container
//                         fluid
//                         style={{ paddingLeft: 0, paddingRight: 0 }}
//                     >
//                         <Row style={{ width: "100%", margin: 0 }}>
//                             <Col md="2" xs="10" className="px-0">
//                                 {this.state.x < 768 ? (
//                                     <Collapse isOpen={!this.state.collapse}>
//                                         <Navigation
//                                             toggle={this.toggleCollapse}
//                                         />
//                                     </Collapse>
//                                 ) : (
//                                     <Collapse isOpen={this.state.collapse}>
//                                         <Navigation
//                                             toggle={this.toggleCollapse}
//                                         />
//                                     </Collapse>
//                                 )}
//                             </Col>
//                             <Col xs="12" md="10" className="px-0">
//                                 <Header toggle={this.toggleCollapse} />
//                                 <div className="error">
//                                     <h3 className="error-vehicle">
//                                         Nije pronađeno traženo vozilo
//                                     </h3>
//                                     <Link
//                                         to="/home-agency/"
//                                         className="btn-primary"
//                                     >
//                                         <span>
//                                             <FaArrowLeft />
//                                         </span>{" "}
//                                         Nazad na pregled vozila
//                                     </Link>
//                                 </div>
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
//                             {this.state.x < 768 ? (
//                                 <Collapse isOpen={!this.state.collapse}>
//                                     <Navigation toggle={this.toggleCollapse} />
//                                 </Collapse>
//                             ) : (
//                                 <Collapse isOpen={this.state.collapse}>
//                                     <Navigation toggle={this.toggleCollapse} />
//                                 </Collapse>
//                             )}
//                         </Col>
//                         <Col xs="12" md="10" className="px-0">
//                             <Header toggle={this.toggleCollapse} />
//                             {this.state.loading ? (
//                                 <Loading />
//                             ) : (
//                                 <>
//                                     <DeleteModal
//                                         modal={this.state.modal}
//                                         toggle={this.toggle}
//                                         text={this.state.vehicle.name}
//                                         deleteItem={this.deleteItem}
//                                         id={this.state.vehicle.id}
//                                     />
//                                     <EditVehicleModal
//                                         modal={this.state.modalEdit}
//                                         toggle={this.toggleEdit}
//                                         vehicle={this.state.vehicle}
//                                     />
//                                     <VehicleInfoModal
//                                         modal={this.state.modalInfo}
//                                         toggle={this.toggleInfo}
//                                         reservations={this.props.reservations}
//                                     />
//                                     <div className="top-banner">
//                                         <p>
//                                             Cena: {this.state.vehicle.price}{" "}
//                                             {this.state.vehicle.currency.name}
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
//                                             <button
//                                                 className="btn-primary btn-small"
//                                                 onClick={this.toggleInfo}
//                                             >
//                                                 <span>
//                                                     <FaBookOpen />
//                                                 </span>{" "}
//                                                 Rezervacije
//                                             </button>
//                                         </div>

//                                         <Link to="/home-agency/">
//                                             <button className="btn-primary btn-small">
//                                                 <span>
//                                                     <FaArrowLeft />
//                                                 </span>{" "}
//                                                 Nazad na pregled vozila
//                                             </button>
//                                         </Link>
//                                     </div>

//                                     <VehicleInfo
//                                         vehicle={this.props.vehicles.find(
//                                             (vehicle) =>
//                                                 vehicle.id ===
//                                                 this.state.vehicle.id
//                                         )}
//                                     />
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
//         vehicles: state.vehicles,
//         reservations: state.reservations,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getReservations: (reservations) =>
//             dispatch(actions.getReservations(reservations)),
//         getVehicles: (vehicle) => dispatch(actions.getVehicles(vehicle)),
//         deleteVehicle: (id) => dispatch(actions.deleteVehicle(id)),
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SingleVehicle);

const SingleVehicle = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [state, setState] = useState({
		modal: false,
		modalEdit: false,
		modalInfo: false,
		loading: true,
		collapse: true,
		x: window.screen.width,
	});
	const [_isMounted, setIsMounted] = useState(false);
	const vehicles = useSelector((state) => state.vehicles);
	const reservations = useSelector((state) => state.reservations);

	useEffect(() => {
		setIsMounted(true);
		getVehicles();
	}, []);

	console.log(state);
	useEffect(() => {
		const pathParts = location.pathname.split("/");
		setState({
			...state,
			modal: false,
			modalEdit: false,
			modalInfo: false,
			collapse: true,
			vehicle: getVehicleFromSlug(pathParts[pathParts.length - 1]),
		});
		getReservations();
	}, [vehicles]);

	const toggle = () => this.setModal(!state.modal);
	const toggleEdit = () => setModalEdit(!state.modalEdit);
	const toggleInfo = () => setModalInfo(!state.modalInfo);
	const toggleCollapse = () => setCollapse(!state.collapse);

	const setModal = (modal) => {
		setState({
			...state,
			modal,
		});
	};

	const setModalInfo = (modalInfo) => {
		setState({
			...state,
			modalInfo,
		});
	};

	const setModalEdit = (modalEdit) => {
		setState({
			...state,
			modalEdit,
		});
	};

	const setCollapse = (collapse) => {
		if (_isMounted) {
			setState({
				...state,
				collapse,
			});
		}
	};

	const getVehicleFromSlug = (slug) => {
		const vehicle = vehicles.find(
			(vehicle) => vehicle.id === parseInt(slug)
		);
		return vehicle;
	};

	const getVehicles = async () => {
		try {
			const pathParts = location.pathname.split("/");
			const response = await api_axios("get", `/vehicles`, null);
			const vehicles = response.data;
			dispatch(actions.getVehicles(vehicles));
			console.log("cajsncla");
			const vehicle = response.data.find(
				(vehicle) =>
					vehicle.id === parseInt(pathParts[pathParts.length - 1])
			);
			setTimeout(() => {
				setState({
					...state,
					vehicle,
					loading: false,
				});
			}, 100);
		} catch (error) {
			handleErrors(error);
		}
	};

	const getReservations = async () => {
		try {
			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.token}`,
				Accept: "application/json",
				"X-Api-Key": `adb69d232d124c98fe20400d9a4757d71380ba1d4200697e6817c99a30959ed2`,
			};
			const pathParts = location.pathname.split("/");
			const response = await axios.get(
				`http://localhost:8080/api/reservations/vehicle/${
					pathParts[pathParts.length - 1]
				}`,
				{
					headers,
				}
			);
			const reservations = response.data;
			dispatch(actions.getReservations(reservations));
			setState({
				...state,
				loading: false,
				collapse: true,
			});
		} catch (error) {
			handleErrors(error);
		}
	};

	const deleteItem = async (id) => {
		try {
			const response = await api_axios("delete", `/vehicles/${id}`, null);
			console.log(response);
			navigate("/home-agency/");
			dispatch(actions.deleteVehicle(id));
		} catch (error) {
			handleErrors(error);
		}
	};

	if (!state.vehicle) {
		return (
			<>
				<Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
					<Row style={{ width: "100%", margin: 0 }}>
						<Col md="2" xs="10" className="px-0">
							{state.x < 768 ? (
								<Collapse isOpen={!state.collapse}>
									<Navigation toggle={toggleCollapse} />
								</Collapse>
							) : (
								<Collapse isOpen={state.collapse}>
									<Navigation toggle={toggleCollapse} />
								</Collapse>
							)}
						</Col>
						<Col xs="12" md="10" className="px-0">
							<Header toggle={toggleCollapse} />
							<div className="error">
								<h3 className="error-vehicle">
									Nije pronađeno traženo vozilo
								</h3>
								<Link
									to="/home-agency/"
									className="btn-primary"
								>
									<span>
										<FaArrowLeft />
									</span>{" "}
									Nazad na pregled vozila
								</Link>
							</div>
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
								<Navigation toggle={toggleCollapse} />
							</Collapse>
						) : (
							<Collapse isOpen={state.collapse}>
								<Navigation toggle={toggleCollapse} />
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
									text={state.vehicle.name}
									deleteItem={deleteItem}
									id={state.vehicle.id}
								/>
								<EditVehicleModal
									modal={state.modalEdit}
									toggle={toggleEdit}
									vehicle={state.vehicle}
								/>
								<VehicleInfoModal
									modal={state.modalInfo}
									toggle={toggleInfo}
									reservations={reservations}
								/>
								<div className="top-banner">
									<p>
										Cena: {state.vehicle.price}{" "}
										{state.vehicle.currency.name}
									</p>

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
										<button
											className="btn-primary btn-small"
											onClick={toggleInfo}
										>
											<span>
												<FaBookOpen />
											</span>{" "}
											Rezervacije
										</button>
									</div>

									<Link to="/home-agency/">
										<button className="btn-primary btn-small">
											<span>
												<FaArrowLeft />
											</span>{" "}
											Nazad na pregled vozila
										</button>
									</Link>
								</div>

								<VehicleInfo
									vehicle={vehicles.find(
										(vehicle) =>
											vehicle.id === state.vehicle.id
									)}
								/>
							</>
						)}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default SingleVehicle;
