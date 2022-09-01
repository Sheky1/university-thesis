import React, { Component } from "react";
import { Row, Col, Container, Collapse } from "reactstrap";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import SizeList from "../../components/bonuses/SizeList";

import { connect } from "react-redux";
import AddSizeModal from "../../components/modals/AddSizeModal";
import { api_axios, params_axios } from "../../api/api";
import * as actions from "../../store/actions/index";
import { handleErrors } from "../../store/utilities";
import Loading from "../../components/layout/Loading";
import ErrorModal from "../../components/modals/ErrorModal";
import Pagination from "react-js-pagination";

class Sizes extends Component {
    _isMounted = false;
    state = {
        modal: false,
        errorModal: false,
        name: "",
        errorText: "",
        loading: true,
        current_page: 1,
        total: 1,
        per_page: 12,
        x: window.screen.width,
        collapse: true,
    };

    toggleCollapse = () => this.setCollapse(!this.state.collapse);

    setCollapse = (collapse) => {
        if (this._isMounted) {
            this.setState({
                collapse,
            });
        }
    };

    toggle = () => this.setModal(!this.state.modal);

    setModal = (modal) => {
        if (this._isMounted) {
            this.setState({
                modal,
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

    getSizes = async (pageNumber) => {
        try {
            const params = {
                page: pageNumber,
                per_page: this.state.per_page,
                sort_direction: "desc",
            };
            const response = await params_axios(`/vehicleSizes`, params);
            if (this._isMounted) {
                this.props.getSizes(response.data.data);
                const { current_page, total, last_page } = response.data.meta;
                this.setState({
                    current_page,
                    total,
                    last_page,
                    loading: false,
                });
            }
        } catch (error) {
            console.log(error);
            handleErrors(error);
        }
    };

    checkInputs = () => {
        if (this.state.name === "") {
            this.setState({
                errorText: 'Polje "Naziv veličine" je neophodno.',
            });
            this.toggleError();
            return true;
        }
        return false;
    };

    submitForm = async () => {
        try {
            if (this._isMounted) {
                if (this.checkInputs()) return;
                const newSize = { name: this.state.name };
                const response = await api_axios(
                    "post",
                    `/vehicleSizes`,
                    newSize
                );
                toast.success("Uspešno dodata veličina.");
                this.props.addSize(response.data.data);
                this.toggle();
            }
        } catch (error) {
            this.setState({
                errorText: handleErrors(error),
            });
            this.toggleError();
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

    deleteItem = async (id) => {
        try {
            if (this._isMounted) {
                await api_axios("delete", `/vehicleSizes/${id}`, null);
                toast.success("Uspešno obrisana veličina.");
                this.props.deleteSize(id);
            }
        } catch (error) {
            if (error.response.status === 406) {
                this.setState({
                    errorText:
                        "Nije dozvoljeno obrisati veličinu ukoliko postoji vozilo koje je koristi.",
                });
                this.toggleError();
            } else {
                this.setState({
                    errorText: handleErrors(error),
                });
                this.toggleError();
            }
        }
    };

    componentDidMount() {
        this._isMounted = true;
        this.getSizes();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <>
                <AddSizeModal
                    modal={this.state.modal}
                    toggle={this.toggle}
                    submitForm={this.submitForm}
                    handleChange={this.handleChange}
                    toggleError={this.toggleError}
                    errorModal={this.state.errorModal}
                    errorText={this.state.errorText}
                />
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
                                <div style={{ gridColumn: "2" }}>
                                    <button
                                        className="btn-primary btn-small"
                                        style={{
                                            marginRight: "15px",
                                            backgroundColor: "#16b841",
                                        }}
                                        onClick={this.toggle}
                                    >
                                        <span>
                                            <FaPlus />
                                        </span>{" "}
                                        Nova veličina
                                    </button>
                                </div>
                                <Link
                                    to="/home-agency/"
                                    style={{ gridColumn: "3" }}
                                >
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
                            ) : this.props.sizes.length === 0 ? (
                                <h2 style={{ margin: "20px" }}>
                                    Trenutno ne postoji nijedna veličina.
                                </h2>
                            ) : (
                                <>
                                    <SizeList
                                        sizes={this.props.sizes}
                                        deleteItem={this.deleteItem}
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
                                                    this.getSizes(pageNumber)
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
        sizes: state.vehicleSizes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSizes: (sizes) => dispatch(actions.getSizes(sizes)),
        deleteSize: (size) => dispatch(actions.deleteSize(size)),
        addSize: (size) => dispatch(actions.addSize(size)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sizes);
