import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import DeleteModal from "../modals/DeleteModal";
import { api_axios } from "../../api/api";
import EditVehicleModal from "../modals/EditVehicleModal";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { handleErrors } from "../../store/utilities";
import { toast } from "react-toastify";
import ErrorModal from "../modals/ErrorModal";

class Vehicle extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalEdit: false,
            loading: true,
            errorModal: false,
            errorText: "",
        };
    }

    toggle = () => this.setModal(!this.state.modal);
    toggleEdit = () => this.setModalEdit(!this.state.modalEdit);
    toggleError = () => this.setErrorModal(!this.state.errorModal);

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

    setErrorModal = (errorModal) => {
        if (this._isMounted) {
            this.setState({
                errorModal,
            });
        }
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    deleteItem = async (id) => {
        try {
            await api_axios("delete", `/vehicles/${id}`, null);
            toast.success("Uspešno obrisano vozilo.");
            this.props.deleteVehicle(id);
        } catch (error) {
            if (error.response.status === 406) {
                this.setState({
                    errorText:
                        "Nije dozvoljeno obrisati vozilo ukoliko postoji rezervacija za njega.",
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

    render() {
        return (
            <>
                <DeleteModal
                    modal={this.state.modal}
                    toggle={this.toggle}
                    text={this.props.vehicle.name}
                    deleteItem={this.deleteItem}
                    id={this.props.vehicle.id}
                />
                <EditVehicleModal
                    modal={this.state.modalEdit}
                    toggle={this.toggleEdit}
                    vehicle={this.props.vehicle}
                />
                <ErrorModal
                    modal={this.state.errorModal}
                    toggle={this.toggleError}
                    text={this.state.errorText}
                />
                <Col xl="3" lg="4" md="4" sm="6" xs="12">
                    <article className="vehicle">
                        <div className="img-container">
                            {this.props.vehicle.images[0] !== undefined ? (
                                <img
                                    src={this.props.vehicle.images[0].url}
                                    alt=""
                                />
                            ) : (
                                <> </>
                            )}

                            <div className="price-top">
                                <h6>
                                    {this.props.vehicle.price}{" "}
                                    {this.props.vehicle.currency.name}
                                </h6>
                                <p>po danu</p>
                            </div>
                            <Link
                                to={`/home-agency/vehicle/${this.props.vehicle.id}`}
                                className="btn-features vehicle-link"
                            >
                                detalji
                            </Link>
                            <p className="vehicle-info">
                                {this.props.vehicle.name}
                                <br />
                                <span>
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
                                        Obriši
                                    </button>
                                </span>
                            </p>
                        </div>
                    </article>
                </Col>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteVehicle: (vehicle) => dispatch(actions.deleteVehicle(vehicle)),
    };
};

export default connect(null, mapDispatchToProps)(Vehicle);
