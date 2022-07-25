import React, { Component } from "react";
import { Col, Card, CardSubtitle } from "reactstrap";
import EditAgencyModal from "../modals/EditAgencyModal";
import DeleteModal from "../modals/DeleteModal";
import { Link } from "react-router-dom";
import { api_axios } from "../../api/api";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { handleErrors } from "../../store/utilities";

class Agency extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalEdit: false,
            loading: true,
        };
    }

    toggle = () => this.setModal(!this.state.modal);
    toggleEdit = () => this.setModalEdit(!this.state.modalEdit);

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
            this.props.deleteAgency(id);
        } catch (error) {
            console.log(error);
            handleErrors(error);
        }
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <>
                <DeleteModal
                    modal={this.state.modal}
                    toggle={this.toggle}
                    text={this.props.agency.name}
                    deleteItem={this.deleteItem}
                    id={this.props.agency.id}
                />
                <EditAgencyModal
                    modal={this.state.modalEdit}
                    toggle={this.toggleEdit}
                    agency={this.props.agency}
                />
                <Col xs="12" xl="6">
                    <Card className="reservation">
                        <CardSubtitle
                            style={{
                                textAlign: "center",
                                fontStyle: "italic",
                            }}
                        >
                            <img
                                src={this.props.agency.logo_url}
                                // src={`data:image/jpeg;base64,${this.props.agency.logo_url}`}
                                alt=""
                                className="reservation-logo"
                            />
                        </CardSubtitle>
                        <div className="reservation-text">
                            <span className="reservation-left">
                                Naziv agencije:
                            </span>
                            <span className="reservation-right">
                                {this.props.agency.name}
                            </span>
                        </div>
                        <div className="reservation-text">
                            <span className="reservation-left">
                                E-mail adresa:
                            </span>
                            <span className="reservation-right">
                                {this.props.agency.user.email}
                            </span>
                        </div>
                        <div className="reservation-text">
                            <span className="reservation-left">Grad:</span>
                            <span className="reservation-right">
                                {this.props.agency.city.name}
                            </span>
                        </div>
                        <div className="reservation-text">
                            <span className="reservation-left">Adresa:</span>
                            <span className="reservation-right">
                                {this.props.agency.address}
                            </span>
                        </div>
                        <hr />
                        <div className="reservation-text">
                            <span className="reservation-left">Username:</span>
                            <span className="reservation-right">
                                {this.props.agency.user.username}
                            </span>
                        </div>
                        {/* <div className="reservation-text">
                            <span className="reservation-left">Password:</span>
                            <span
                                className="reservation-right"
                                style={{
                                    color: "rgb(207, 73, 73)",
                                }}
                            >
                                {this.props.agency.address}
                            </span>
                        </div> */}
                        <hr />
                        <div className="reservation-buttons">
                            <button
                                className="btn-primary btn-small btn-vehicles"
                                onClick={this.toggleEdit}
                            >
                                Izmeni
                            </button>
                            <button
                                className="btn-primary btn-small btn-vehicles"
                                style={{
                                    backgroundColor: "rgb(207, 73, 73)",
                                }}
                                onClick={this.toggle}
                            >
                                Obrisi
                            </button>
                            <Link
                                to={`/home-admin/agency/${this.props.agency.id}`}
                                className="btn-primary btn-small btn-vehicles"
                                style={{ padding: "0.3rem 2rem" }}
                            >
                                Detalji
                            </Link>
                        </div>
                    </Card>
                </Col>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteAgency: (id) => dispatch(actions.deleteAgency(id)),
    };
};

export default connect(null, mapDispatchToProps)(Agency);
