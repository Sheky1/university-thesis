import React, { Component } from "react";
import { Row, Col, Container, Collapse } from "reactstrap";
import Header from "../../components/layout/Header";
import NavigationAdmin from "../../components/layout/NavigationAdmin";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import CurrencyList from "../../components/bonuses/CurrencyList";
import Pagination from "react-js-pagination";

import { connect } from "react-redux";
import AddCurrencyModal from "../../components/modals/AddCurrencyModal";
import { api_axios, params_axios } from "../../api/api";
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

    getCurrencies = async (pageNumber) => {
        try {
            // const response = await api_axios(
            //     "get",
            //     `/currencies?page=${pageNumber}&per_page=${this.state.per_page}`,
            //     null
            // );
            const params = {
                page: pageNumber,
                per_page: this.state.per_page,
                sort_direction: "desc",
            };
            const response = await params_axios(`/currencies`, params);
            if (this._isMounted) {
                const currencies = response.data;
                // const { current_page, total, last_page } = response.data.meta;
                this.setState({
                    currencies,
                    // current_page,
                    // last_page,
                    // total,
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
                errorText: 'Polje "Naziv valute" je neophodno.',
            });
            this.toggleError();
            return true;
        }
        return false;
    };

    submitForm = async () => {
        try {
            if (this.checkInputs()) return;
            const response = await api_axios(
                "post",
                `/currencies?name=${this.state.name}`,
                null
            );
            this.toggle();
            this.setState({
                name: "",
                currencies: [...this.state.currencies, response.data],
            });
            toast.success("Uspešno dodata valuta.");
            // if (this._isMounted) {
            //     const newCurrency = {
            //         name: this.state.name,
            //     };
            //     const response = await api_axios(
            //         "post",
            //         `/currencies`,
            //         newCurrency
            //     );
            //     this.toggle();
            //     toast.success("Uspešno dodata valuta.");
            //     this.setState({
            //         name: "",
            //         currencies: [response.data, ...this.state.currencies],
            //     });
            // }
        } catch (error) {
            this.setState({
                errorText: "Neophodno je da unese naziv za valutu!",
            });
            this.toggleError();
            console.log(error);
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

    deleteItem = async (id) => {
        try {
            if (this._isMounted) {
                await api_axios("delete", `/currencies/${id}`, null);
                toast.success("Uspešno obrisana valuta.");
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
                errorText: "Nije moguće obrisati valutu jer je već u upotrebi.",
            });
            this.toggleError();
        }
    };

    updateCurrency = (updatedCurrency) => {
        this.setState({
            currencies: [
                updatedCurrency,
                ...this.state.currencies.filter(
                    (currency) => updatedCurrency.id !== currency.id
                ),
            ],
        });
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

                                <div
                                    style={{
                                        gridRow: "1",
                                        gridColumn: "2",
                                    }}
                                >
                                    <button
                                        className="btn-primary btn-small"
                                        style={{
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
                                        updateCurrency={this.updateCurrency}
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
                                                    this.getCurrencies(
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
        currencies: state.user.currencies,
    };
};

export default connect(mapStateToProps, null)(Currencies);
