import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import ReservationList from "../../components/reservations/ReservationList";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import {
    FaArrowLeft,
    FaCheck,
    FaExclamation,
    FaHourglassHalf,
} from "react-icons/fa";
import Loading from "../../components/layout/Loading";
import { api_axios } from "../../api/api";
import * as actions from "../../store/actions/index";
import axios from "axios";

import { connect } from "react-redux";
import { handleErrors } from "../../store/utilities";

class Reseravations extends Component {
    _isMounted = false;
    state = {
        modal: false,
        errorModal: false,
        errorText: "",
        loading: true,
        name: "",
        current_page: 1,
        total: 1,
        per_page: 5,
    };

    getReservations = async (pageNumber) => {
        try {
            const response = await api_axios(
                "get",
                `/reservations?page=${pageNumber}&per_page=${this.state.per_page}`,
                null
            );
            if (this._isMounted) {
                this.props.getReservations(response.data);
                const { current_page, total } = response.data.meta;
                this.setState({
                    current_page,
                    total,
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
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`,
                Accept: "application/json",
                "X-Api-Key": `adb69d232d124c98fe20400d9a4757d71380ba1d4200697e6817c99a30959ed2`,
            };
            let params;
            if (type === "none")
                params = {
                    is_approved: 0,
                    is_rejected: 0,
                };
            else {
                params = {
                    [type]: 1,
                };
            }
            console.log(params);
            const response = await axios.get(
                "http://localhost:8080/api/reservations/filter",
                {
                    params,
                    headers,
                }
            );
            console.log(response.data);
            this.props.getReservations(response.data);
        } catch (error) {
            handleErrors(error);
        }
    };

    render() {
        return (
            <>
                <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <Row style={{ width: "100%", margin: 0 }}>
                        <Col xs="2" className="px-0">
                            <Navigation />
                        </Col>
                        <Col xs="10" className="px-0">
                            <Header />
                            <div className="top-banner">
                                <p>Rezervacije</p>

                                <div>
                                    <button
                                        className="btn-primary btn-small"
                                        style={{
                                            marginRight: "15px",
                                            backgroundColor: "#e07b39",
                                        }}
                                        onClick={() =>
                                            this.filterReservations("none")
                                        }
                                    >
                                        <span>
                                            <FaHourglassHalf />
                                        </span>{" "}
                                        Na cekanju
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
                                            <FaCheck />
                                        </span>{" "}
                                        Zavrsene
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
                                        Odbacene
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
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Pagination
                                            activePage={this.state.current_page}
                                            totalItemsCount={this.state.total}
                                            itemsCountPerPage={
                                                this.state.per_page
                                            }
                                            onChange={(pageNumber) =>
                                                this.getReservations(pageNumber)
                                            }
                                            itemClass="page-item"
                                            linkClass="page-link"
                                            firstPageText="First"
                                            lastPageText="Last"
                                        />
                                    </div>
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
