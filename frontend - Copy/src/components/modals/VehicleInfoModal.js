import React, { Component } from "react";
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
    Form,
} from "reactstrap";

import { connect } from "react-redux";
import ReservationList from "../reservations/ReservationList";
import * as actions from "../../store/actions/index";

class VehicleInfoModal extends Component {
    render() {
        return (
            <>
                <Modal
                    isOpen={this.props.modal}
                    toggle={() => this.props.toggle()}
                    backdrop="static"
                    scrollable={true}
                    size="xl"
                >
                    <ModalHeader toggle={() => this.props.toggle()}>
                        Rezervacije za dato vozilo
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <ReservationList
                                reservations={this.props.reservations}
                                updateReservation={this.props.updateReservation}
                            />
                        </Form>
                    </ModalBody>
                    <ModalFooter className="modal-footer">
                        <Button
                            className="btn-primary btn-small btn-green"
                            onClick={() => {
                                this.props.toggle();
                            }}
                            color="success"
                        >
                            Zatvori
                        </Button>{" "}
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateReservation: (reservation) =>
            dispatch(actions.updateReservation(reservation)),
    };
};

export default connect(null, mapDispatchToProps)(VehicleInfoModal);
