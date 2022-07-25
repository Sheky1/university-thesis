import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import VehicleInfo from "../../components/vehicles/VehicleInfo";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaSync, FaMinusCircle, FaBookOpen } from "react-icons/fa";
import DeleteModal from "../../components/modals/DeleteModal";
import EditVehicleModal from "../../components/modals/EditVehicleModal";
import VehicleInfoModal from "../../components/modals/VehicleInfoModal";

import { connect } from "react-redux";
import Loading from "../../components/layout/Loading";
import { api_axios } from "../../api/api";
import * as actions from "../../store/actions/index";
import { handleErrors } from "../../store/utilities";
import axios from "axios";

class SingleVehicle extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalEdit: false,
            modalInfo: false,
            loading: true,
            vehicle: {},
        };
    }

    toggle = () => this.setModal(!this.state.modal);
    toggleEdit = () => this.setModalEdit(!this.state.modalEdit);
    toggleInfo = () => this.setModalInfo(!this.state.modalInfo);

    setModal = (modal) => {
        if (this._isMounted) {
            this.setState({
                modal,
            });
        }
    };

    setModalInfo = (modalInfo) => {
        if (this._isMounted) {
            this.setState({
                modalInfo,
            });
        }
    };

    setModalEdit = (modalEdit) => {
        if (this._isMounted) {
            this.setState({
                modalEdit,
            });
        }
    };

    getVehicleFromSlug = (slug) => {
        const vehicle = this.props.vehicles.find(
            (vehicle) => vehicle.id === parseInt(slug)
        );
        return vehicle;
    };

    getVehicles = async () => {
        try {
            const response = await api_axios("get", `/vehicles`, null);
            if (this._isMounted) {
                const vehicles = response.data.data;
                this.props.getVehicles(vehicles);
                this.setState({
                    vehicle: this.getVehicleFromSlug(
                        this.props.match.params.slug
                    ),
                });
                this.getReservations();
            }
        } catch (error) {
            handleErrors(error);
        }
    };

    getReservations = async () => {
        try {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${atob(localStorage.token)}`,
                Accept: "application/json",
                "X-Api-Key": `adb69d232d124c98fe20400d9a4757d71380ba1d4200697e6817c99a30959ed2`,
            };
            const params = {
                vehicle_id: this.state.vehicle.id,
            };
            const response = await axios.get(
                "https://miljanpeles.com/renter_backend/public/api/reservations/vehicleReservations",
                {
                    params,
                    headers,
                }
            );
            if (this._isMounted) {
                const reservations = response.data.data;
                this.props.getReservations(reservations);
                this.setState({
                    loading: false,
                });
            }
        } catch (error) {
            handleErrors(error);
        }
    };

    deleteItem = async (id) => {
        try {
            const response = await api_axios("delete", `/vehicles/${id}`, null);
            console.log(response);
            this.props.history.push("/home-agency/");
            this.props.deleteVehicle(id);
        } catch (error) {
            handleErrors(error);
        }
    };

    componentDidMount() {
        this._isMounted = true;
        this.getVehicles();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        if (!this.state.vehicle) {
            return (
                <>
                    <Container
                        fluid
                        style={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                        <Row style={{ width: "100%", margin: 0 }}>
                            <Col lg="2" className="px-0">
                                <Navigation />
                            </Col>
                            <Col lg="10" className="px-0">
                                <Header />
                                <div className="error">
                                    <h3 className="error-vehicle">
                                        No such vehicle could be found
                                    </h3>
                                    <Link
                                        to="/home-agency/"
                                        className="btn-primary"
                                    >
                                        <span>
                                            <FaArrowLeft />
                                        </span>{" "}
                                        Back to home
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
                        <Col lg="2" className="px-0">
                            <Navigation />
                        </Col>
                        <Col lg="10" className="px-0">
                            <Header />
                            {this.state.loading ? (
                                <Loading />
                            ) : (
                                <>
                                    <DeleteModal
                                        modal={this.state.modal}
                                        toggle={this.toggle}
                                        text={this.state.vehicle.name}
                                        deleteItem={this.deleteItem}
                                        id={this.state.vehicle.id}
                                    />
                                    <EditVehicleModal
                                        modal={this.state.modalEdit}
                                        toggle={this.toggleEdit}
                                        vehicle={this.state.vehicle}
                                    />
                                    <VehicleInfoModal
                                        modal={this.state.modalInfo}
                                        toggle={this.toggleInfo}
                                        reservations={this.props.reservations}
                                    />
                                    <div className="top-banner">
                                        <p>
                                            Cena: {this.state.vehicle.price}{" "}
                                            {this.state.vehicle.currency.name}
                                        </p>

                                        <div>
                                            <button
                                                className="btn-primary btn-small"
                                                style={{
                                                    marginRight: "15px",
                                                }}
                                                onClick={this.toggleEdit}
                                            >
                                                <span>
                                                    <FaSync />
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
                                                onClick={this.toggle}
                                            >
                                                <span>
                                                    <FaMinusCircle />
                                                </span>{" "}
                                                Obrisi
                                            </button>
                                            <button
                                                className="btn-primary btn-small"
                                                onClick={this.toggleInfo}
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
                                        vehicle={this.props.vehicles.find(
                                            (vehicle) =>
                                                vehicle.id ===
                                                this.state.vehicle.id
                                        )}
                                    />
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
        vehicles: state.vehicles,
        reservations: state.reservations,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getReservations: (reservations) =>
            dispatch(actions.getReservations(reservations)),
        getVehicles: (vehicle) => dispatch(actions.getVehicles(vehicle)),
        deleteVehicle: (id) => dispatch(actions.deleteVehicle(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleVehicle);
