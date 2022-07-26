import React, { Component } from "react";
import { Col, Card, CardSubtitle } from "reactstrap";

export default class AgencyVehicle extends Component {
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

    render() {
        return (
            <>
                <Col xs="12" xl="6">
                    <Card className="reservation">
                        <CardSubtitle
                            style={{
                                textAlign: "center",
                                fontStyle: "italic",
                            }}
                        >
                            {require(`../../images/uploaded/${this.props.vehicle.images[0].url}`) && (
                                <img
                                    src={require(`../../images/uploaded/${this.props.vehicle.images[0].url}`)}
                                    alt=""
                                    className="reservation-logo"
                                    style={{ width: "250px" }}
                                />
                            )}
                            {/* <img
                                src={this.props.vehicle.images[0].url}
                                alt=""
                                className="reservation-logo"
                                style={{ width: "100%", height: "200px" }}
                            /> */}
                        </CardSubtitle>
                        <div className="reservation-text">
                            <span className="reservation-left">
                                Naziv vozila:
                            </span>
                            <span className="reservation-right">
                                {this.props.vehicle.name}
                            </span>
                        </div>
                        <div className="reservation-text">
                            <span className="reservation-left">
                                Vrsta menjača:
                            </span>
                            <span className="reservation-right">
                                {this.props.vehicle.transmissionType}
                            </span>
                        </div>
                        <div className="reservation-text">
                            <span className="reservation-left">Kapacitet:</span>
                            <span className="reservation-right">
                                {this.props.vehicle.passengerCount}
                            </span>
                        </div>
                        <div className="reservation-text">
                            <span className="reservation-left">Tablice:</span>
                            <span className="reservation-right">
                                {this.props.vehicle.registerNumber}
                            </span>
                        </div>
                        <div className="reservation-text">
                            <span className="reservation-left">Veličina:</span>
                            <span className="reservation-right">
                                {this.props.vehicle.vehicleSize.name}
                            </span>
                        </div>
                        <div className="reservation-text">
                            <span className="reservation-left">Cena:</span>
                            <span className="reservation-right">
                                {this.props.vehicle.price}{" "}
                                {this.props.vehicle.currency.name}
                            </span>
                        </div>
                    </Card>
                </Col>
            </>
        );
    }
}
