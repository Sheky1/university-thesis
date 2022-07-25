import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Header from "../../components/layout/Header";
import NavigationAdmin from "../../components/layout/NavigationAdmin";
import { Link } from "react-router-dom";
import {
    FaArrowLeft,
    FaSync,
    FaMinusCircle,
    FaBookOpen,
    FaCar,
} from "react-icons/fa";
import DeleteModal from "../../components/modals/DeleteModal";
import EditAgencyModal from "../../components/modals/EditAgencyModal";
import AgencyVehicles from "../../components/agencies/AgencyVehicles";

import { connect } from "react-redux";
import Loading from "../../components/layout/Loading";
import ReservationList from "../../components/reservations/ReservationList";
import axios from "axios";
import * as actions from "../../store/actions/index";
import { api_axios } from "../../api/api";
import { handleErrors } from "../../store/utilities";
import Pagination from "react-js-pagination";

class SingleAgency extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalEdit: false,
            showVehicles: true,
            loading: true,
            agency: this.getAgencyFromSlug(this.props.match.params.slug),
            current_page: 1,
            total: 1,
            per_page: 6,
        };
    }

    toggle = () => this.setModal(!this.state.modal);
    toggleEdit = () => this.setModalEdit(!this.state.modalEdit);

    setShowVehicles = (showVehicles) => {
        if (this._isMounted) {
            this.setState({
                showVehicles,
            });
        }
    };

    setModal = (modal) => {
        if (this._isMounted) {
            this.setState({
                modal,
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

    deleteItem = async (id) => {
        try {
            const response = await api_axios("delete", `/agencies/${id}`, null);
            console.log(response);
            this.props.history.push("/home-admin/");
            this.props.deleteAgency(id);
        } catch (error) {
            console.log(error);
            handleErrors(error);
        }
    };

    getVehicles = async (id, pageNumber) => {
        try {
            if (this._isMounted) {
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${atob(localStorage.token)}`,
                    Accept: "application/json",
                    "X-Api-Key": `adb69d232d124c98fe20400d9a4757d71380ba1d4200697e6817c99a30959ed2`,
                };
                const response = await axios.get(
                    `https://miljanpeles.com/renter_backend/public/api/agencies/vehicles?page=${pageNumber}&per_page=${this.state.per_page}`,
                    {
                        params: {
                            agency_id: id,
                        },
                        headers,
                    }
                );
                this.props.getVehicles(response.data.data);
                const { current_page, total } = response.data.meta;
                this.setState({
                    current_page,
                    total,
                    loading: false,
                });
            }
        } catch (error) {
            console.log(error);
            handleErrors(error);
        }
    };

    getReservations = async (id, pageNumber) => {
        try {
            if (this._isMounted) {
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${atob(localStorage.token)}`,
                    Accept: "application/json",
                    "X-Api-Key": `adb69d232d124c98fe20400d9a4757d71380ba1d4200697e6817c99a30959ed2`,
                };
                const response = await axios.get(
                    `https://miljanpeles.com/renter_backend/public/api/agencies/reservations?page=${pageNumber}&per_page=${this.state.per_page}`,
                    {
                        params: {
                            agency_id: id,
                        },
                        headers,
                    }
                );
                this.props.getReservations(response.data.data);
                const { current_page, total } = response.data.meta;
                this.setState({
                    current_page,
                    total,
                    loading: false,
                });
            }
        } catch (error) {
            console.log(error);
            handleErrors(error);
        }
    };

    getAgencyFromSlug = (slug) => {
        const agency = this.props.agencies.find(
            (agency) => agency.id === parseInt(slug)
        );
        return agency;
    };

    getAgencies = async () => {
        try {
            const response = await api_axios("get", `/agencies`, null);
            if (this._isMounted) {
                const agencies = response.data.data;
                this.props.getAgencies(agencies);
                this.setState({
                    agency: this.getAgencyFromSlug(
                        this.props.match.params.slug
                    ),
                });
                this.getVehicles(this.state.agency.id);
                this.getReservations(this.state.agency.id);
            }
        } catch (error) {
            console.log(error);
            handleErrors(error);
        }
    };

    componentDidMount() {
        this._isMounted = true;
        // if (this.props.agencies.length === 0) {
        this.getAgencies();
        // } else {
        //     this.setState({
        //         agency: this.getAgencyFromSlug(this.props.match.params.slug),
        //     });
        //     this.getVehicles(this.state.agency.id);
        //     this.getReservations(this.state.agency.id);
        // }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        if (!this.state.agency) {
            return (
                <>
                    <Container
                        fluid
                        style={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                        <Row style={{ width: "100%", margin: 0 }}>
                            <Col lg="2" className="px-0">
                                <NavigationAdmin />
                            </Col>
                            <Col lg="10" className="px-0">
                                <Header />
                                {this.state.loading ? (
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
                        <Col lg="2" className="px-0">
                            <NavigationAdmin />
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
                                        text={this.state.agency.name}
                                        deleteItem={this.deleteItem}
                                        id={this.state.agency.id}
                                    />
                                    <EditAgencyModal
                                        modal={this.state.modalEdit}
                                        toggle={this.toggleEdit}
                                        agency={this.props.agencies.find(
                                            (agency) =>
                                                agency.id ===
                                                this.state.agency.id
                                        )}
                                    />
                                    <div className="top-banner">
                                        <p>
                                            Pregled agencije:{" "}
                                            {this.state.agency.name}
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
                                        <img
                                            src={this.state.agency.logo}
                                            alt=""
                                        />
                                        <h3 className="agency-preview-name">
                                            {this.state.agency.name}
                                        </h3>
                                        <div className="agency-preview-buttons">
                                            <button
                                                className="btn-primary btn-small"
                                                style={{ marginRight: "15px" }}
                                                onClick={() =>
                                                    this.setShowVehicles(true)
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
                                                    this.setShowVehicles(false)
                                                }
                                            >
                                                <span>
                                                    <FaBookOpen />
                                                </span>{" "}
                                                Rezervacije
                                            </button>
                                        </div>

                                        {this.state.showVehicles ? (
                                            <>
                                                <AgencyVehicles
                                                    key={this.props.agencies.find(
                                                        (agency) =>
                                                            agency.id ===
                                                            this.state.agency.id
                                                    )}
                                                    vehicles={
                                                        this.props.vehicles
                                                    }
                                                />
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
                                                            this.state
                                                                .current_page
                                                        }
                                                        totalItemsCount={
                                                            this.state.total
                                                        }
                                                        itemsCountPerPage={
                                                            this.state.per_page
                                                        }
                                                        onChange={(
                                                            pageNumber
                                                        ) =>
                                                            this.getVehicles(
                                                                this.state
                                                                    .agency.id,
                                                                pageNumber
                                                            )
                                                        }
                                                        itemClass="page-item"
                                                        linkClass="page-link"
                                                        firstPageText="First"
                                                        lastPageText="Last"
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <ReservationList
                                                    reservations={
                                                        this.props.reservations
                                                    }
                                                    flag="admin"
                                                />
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
                                                            this.state
                                                                .current_page
                                                        }
                                                        totalItemsCount={
                                                            this.state.total
                                                        }
                                                        itemsCountPerPage={
                                                            this.state.per_page
                                                        }
                                                        onChange={(
                                                            pageNumber
                                                        ) =>
                                                            this.getVehicles(
                                                                this.state
                                                                    .agency.id,
                                                                pageNumber
                                                            )
                                                        }
                                                        itemClass="page-item"
                                                        linkClass="page-link"
                                                        firstPageText="First"
                                                        lastPageText="Last"
                                                    />
                                                </div>
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
    }
}

const mapStateToProps = (state) => {
    return {
        agencies: state.agencies,
        vehicles: state.vehicles,
        reservations: state.reservations,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getVehicles: (vehicles) => dispatch(actions.getVehicles(vehicles)),
        getReservations: (reservations) =>
            dispatch(actions.getReservations(reservations)),
        getAgencies: (agencies) => dispatch(actions.getAgencies(agencies)),
        deleteAgency: (agency) => dispatch(actions.deleteAgency(agency)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleAgency);
