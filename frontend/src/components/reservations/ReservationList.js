import React from "react";
import { Row, Container } from "react-bootstrap";
import Reservation from "./Reservation";

export default function ReservationList({
    reservations,
    updateReservation,
    flag,
}) {
    return (
        <>
            <Container fluid className="p-5">
                <Row style={{ width: "100%", margin: 0 }}>
                    {reservations.map((reservation) => {
                        return (
                            <Reservation
                                key={reservation.id}
                                reservation={reservation}
                                updateReservation={updateReservation}
                                flag={flag}
                            />
                        );
                    })}
                </Row>
            </Container>
        </>
    );
}
