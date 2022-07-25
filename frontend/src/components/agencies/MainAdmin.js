import React, { Component } from "react";
import { FaPlus } from "react-icons/fa";
import Loading from "../layout/Loading";
import Agencies from "./Agencies";

import { connect } from "react-redux";
import AddAgencyModal from "../modals/AddAgencyModal";
import { api_axios } from "../../api/api";
import * as actions from "../../store/actions/index";
import { handleErrors } from "../../store/utilities";
import Pagination from "react-js-pagination";

class MainAdmin extends Component {
    _isMounted = false;
    state = {
        loading: true,
        modal: false,
        modalEdit: false,
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

    getAgencies = async (pageNumber) => {
        try {
            const response = await api_axios(
                "get",
                `/agencies?page=${pageNumber}&per_page=${this.state.per_page}`,
                null
            );
            if (this._isMounted) {
                this.props.getAgencies(response.data.data);
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

    componentDidMount() {
        this._isMounted = true;
        this.getAgencies();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <>
                <AddAgencyModal modal={this.state.modal} toggle={this.toggle} />
                <main className="main">
                    <div className="top-banner">
                        <p>Prikaz svih agencija</p>
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
                            Dodaj agenciju
                        </button>
                    </div>
                    {this.state.loading ? (
                        <Loading />
                    ) : (
                        <>
                            <Agencies agencies={this.props.agencies} />
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
                                    itemsCountPerPage={this.state.per_page}
                                    onChange={(pageNumber) =>
                                        this.getAgencies(pageNumber)
                                    }
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    firstPageText="First"
                                    lastPageText="Last"
                                />
                            </div>
                        </>
                    )}
                </main>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        agencies: state.agencies,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAgencies: (agencies) => dispatch(actions.getAgencies(agencies)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainAdmin);
