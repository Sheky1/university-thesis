import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Header from "../../components/layout/Header";
import NavigationAdmin from "../../components/layout/NavigationAdmin";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import CurrencyList from "../../components/bonuses/CurrencyList";
import Pagination from "react-js-pagination";

import { connect } from "react-redux";
import AddCurrencyModal from "../../components/modals/AddCurrencyModal";
import { api_axios } from "../../api/api";
import Loading from "../../components/layout/Loading";
import ErrorModal from "../../components/modals/ErrorModal";
import { handleErrors } from "../../store/utilities";

class Currencies extends Component {
    _isMounted = false;
    state = {
        modal: false,
        errorModal: false,
        errorText: "",
        currencies: [],
        loading: true,
        name: "",
        current_page: 1,
        total: 1,
        per_page: 12,
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

    getCurrencies = async (pageNumber) => {
        try {
            const response = await api_axios(
                "get",
                `/currencies?page=${pageNumber}&per_page=${this.state.per_page}`,
                null
            );
            if (this._isMounted) {
                const currencies = response.data.data;
                const { current_page, total } = response.data.meta;
                this.setState({
                    currencies,
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

    submitForm = async () => {
        // if (this.state.name !== "") {
        try {
            if (this._isMounted) {
                const newCurrency = {
                    name: this.state.name,
                };
                const response = await api_axios(
                    "post",
                    `/currencies`,
                    newCurrency
                );
                this.toggle();
                this.setState({
                    name: "",
                    currencies: [...this.state.currencies, response.data.data],
                });
            }
        } catch (error) {
            this.setState({
                errorText: "Neophodno je da unese naziv za valutu!",
            });
            this.toggleError();
            console.log(error);
            handleErrors(error);
        }
        // } else {
        //     this.setState({
        //         errorText: "Neophodno je da unese naziv za valutu!",
        //     });
        //     this.toggleError();
        // }
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
                await api_axios("delete", `/currencies/${id}`, null);
                this.setState({
                    currencies: [
                        ...this.state.currencies.filter(
                            (currency) => currency.id !== id
                        ),
                    ],
                });
            }
        } catch (error) {
            this.setState({
                errorText: error.response.data.error,
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
                <AddCurrencyModal
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
                        <Col xs="2" className="px-0">
                            <NavigationAdmin />
                        </Col>
                        <Col xs="10" className="px-0">
                            <Header />
                            <div className="top-banner">
                                <p>Valute</p>

                                <div>
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
                                        Nova valuta
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
                            {this.state.loading ? (
                                <Loading />
                            ) : this.state.currencies.length === 0 ? (
                                <h2 style={{ margin: "20px" }}>
                                    Trenutno ne postoji nijedna valuta.
                                </h2>
                            ) : (
                                <>
                                    <CurrencyList
                                        currencies={this.state.currencies}
                                        deleteItem={this.deleteItem}
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
                                                this.getCurrencies(pageNumber)
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
        currencies: state.user.currencies,
    };
};

export default connect(mapStateToProps, null)(Currencies);
