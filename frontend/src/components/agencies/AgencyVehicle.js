import React, { Component } from "react";
import { Col, Card, CardSubtitle } from "reactstrap";

export default class Agency extends Component {
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
                            <img
                                src={this.props.vehicle.images[0].url}
                                alt=""
                                className="reservation-logo"
                                style={{ width: "250px" }}
                            />
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
                                Vrsta menjaca:
                            </span>
                            <span className="reservation-right">
                                {this.props.vehicle.transmission_type}
                            </span>
                        </div>
                        <div className="reservation-text">
                            <span className="reservation-left">Kapacitet:</span>
                            <span className="reservation-right">
                                {this.props.vehicle.passenger_count}
                            </span>
                        </div>
                        <div className="reservation-text">
                            <span className="reservation-left">Tablice:</span>
                            <span className="reservation-right">
                                {this.props.vehicle.register_number}
                            </span>
                        </div>
                        <div className="reservation-text">
                            <span className="reservation-left">Velicina:</span>
                            <span className="reservation-right">
                                {this.props.vehicle.vehicle_size.name}
                            </span>
                        </div>
                        <div className="reservation-text">
                            <span className="reservation-left">Cena:</span>
                            <span className="reservation-right">
                                {this.props.vehicle.price} KM
                            </span>
                        </div>
                    </Card>
                </Col>
            </>
        );
    }
}
