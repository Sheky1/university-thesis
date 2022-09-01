import React, { Component } from "react";
import { Row, Col, Container, Collapse } from "reactstrap";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import AdditionList from "../../components/bonuses/AdditionList";

import { connect } from "react-redux";
import { toast } from "react-toastify";
import AddAdditionModal from "../../components/modals/AddAdditionModal";
import { api_axios, params_axios } from "../../api/api";
import * as actions from "../../store/actions/index";
import { handleErrors } from "../../store/utilities";
import Loading from "../../components/layout/Loading";
import ErrorModal from "../../components/modals/ErrorModal";
import Pagination from "react-js-pagination";

class Additions extends Component {
    _isMounted = false;
    state = {
        modal: false,
        errorModal: false,
        errorText: "",
        loading: true,
        name: "",
        price: "",
        currency: "",
        current_page: 1,
        total: 1,
        per_page: 12,
        x: window.screen.width,
        collapse: true,
    };

    toggle = () => this.setModal(!this.state.modal);

    setModal = (modal) => {
        if (this._isMounted) {
            this.setState({
                modal,
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

    toggleError = () => this.setErrorModal(!this.state.errorModal);

    setErrorModal = (errorModal) => {
        if (this._isMounted) {
            this.setState({
                errorModal,
            });
        }
    };

    resetState = () => {
        if (this._isMounted) {
            this.setState({
                name: "",
                price: "",
            });
            this.toggle();
        }
    };

    getAdditions = async (pageNumber) => {
        try {
            // const response = await api_axios(
            //     "get",
            //     `/additions?page=${pageNumber}&per_page=${this.state.per_page}`,
            //     null
            // );
            const params = {
                page: pageNumber,
                per_page: this.state.per_page,
                sort_direction: "desc",
            };
            const response = await params_axios(`/additions`, params);
            if (this._isMounted) {
                this.props.getAdditions(response.data.data);
                const { current_page, total, last_page } = response.data.meta;
                this.setState({
                    current_page,
                    total,
                    last_page,
                });
                if (this.props.currencies.length === 0) this.getCurrencies();
                else {
                    this.setState({
                        currency: this.props.currencies[0].name,
                        loading: false,
                    });
                }
            }
        } catch (error) {
            handleErrors(error);
        }
    };

    getCurrencies = async () => {
        try {
            const response = await api_axios("get", `/app/currencies`, null);
            if (this._isMounted) {
                this.props.getCurrencies(response.data.data);
                this.setState({
                    currency: this.props.currencies[0].name,
                    loading: false,
                });
            }
        } catch (error) {
            handleErrors(error);
        }
    };

    checkInputs = () => {
        if (this.state.name === "") {
            this.setState({
                errorText: 'Polje "Naziv goriva" je neophodno.',
            });
            this.toggleError();
            return true;
        }
        if (this.state.price === "") {
            this.setState({
                errorText: 'Polje "Cena" je neophodno.',
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
                const currency = this.props.currencies.find(
                    (currency) => currency.name === this.state.currency
                );
                const newAddition = {
                    name: this.state.name,
                    price: parseInt(this.state.price),
                    currency_id: currency.id,
                };
                const response = await api_axios(
                    "post",
                    `/additions`,
                    newAddition
                );
                toast.success("Uspešno dodat dodatak.");
                this.props.addAddition(response.data.data);
                this.resetState();
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
                await api_axios("delete", `/additions/${id}`, null);
                toast.success("Uspešno obrisan dodatak.");
                this.props.deleteAddition(id);
            }
        } catch (error) {
            if (error.response.status === 406) {
                this.setState({
                    errorText:
                        "Nije dozvoljeno obrisati dodatak ukoliko postoji vozilo koje ga koristi.",
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
        this.getAdditions();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <>
                <AddAdditionModal
                    modal={this.state.modal}
                    toggle={this.toggle}
                    submitForm={this.submitForm}
                    handleChange={this.handleChange}
                    toggleError={this.toggleError}
                    errorModal={this.state.errorModal}
                    errorText={this.state.errorText}
                    currencies={this.props.currencies}
                    currency={this.props.currency}
                    price={this.props.price}
                    name={this.props.name}
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
                                        Nov dodatak
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
                            ) : this.props.additions.length === 0 ? (
                                <h2 style={{ margin: "20px" }}>
                                    Trenutno ne postoji nijedan dodatak.
                                </h2>
                            ) : (
                                <>
                                    <AdditionList
                                        additions={this.props.additions}
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
                                                    this.getAdditions(
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
        additions: state.additions,
        currencies: state.currencies,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAdditions: (additions) => dispatch(actions.getAdditions(additions)),
        deleteAddition: (addition) =>
            dispatch(actions.deleteAddition(addition)),
        addAddition: (addition) => dispatch(actions.addAddition(addition)),
        getCurrencies: (currencies) =>
            dispatch(actions.getCurrencies(currencies)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Additions);
