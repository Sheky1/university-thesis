import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import DeleteModal from "../modals/DeleteModal";
import { api_axios } from "../../api/api";
import EditVehicleModal from "../modals/EditVehicleModal";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { handleErrors } from "../../store/utilities";

class Vehicle extends Component {
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

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    deleteItem = async (id) => {
        try {
            const response = await api_axios("delete", `/vehicles/${id}`, null);
            console.log(response);
            this.props.deleteVehicle(id);
        } catch (error) {
            console.log(error);
            handleErrors(error);
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
                <Col xl="3" lg="4" md="4" sm="6" xs="12">
                    <article className="vehicle">
                        <div className="img-container">
                            <img
                                src={this.props.vehicle.images[0].url}
                                alt=""
                            />
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
                                        Obrisi
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
