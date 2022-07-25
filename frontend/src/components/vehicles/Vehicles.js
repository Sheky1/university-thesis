import React from "react";
import Vehicle from "./Vehicle";
import { Row, Container } from "reactstrap";

export default function Vehicles({ vehicles }) {
    if (vehicles.length === 0) {
        return (
            <div className="empty-search">
                <h3>Trenutno ne postoji nijedno vozilo u agenciji.</h3>
            </div>
        );
    }

    return (
        <Container fluid className="p-5">
            <Row>
                {vehicles.map((vehicle) => {
                    return <Vehicle key={vehicle.id} vehicle={vehicle} />;
                })}
            </Row>
        </Container>
    );
}
