import React from "react";
import AgencyVehicle from "./AgencyVehicle";
import { Row, Container } from "reactstrap";

export default function AgencyVehicles({ vehicles }) {
    if (!vehicles || vehicles.length === 0) {
        return (
            <div className="empty-search">
                <h3>Trenutno ne postoji nijedno vozilo u trazenoj agenciji.</h3>
            </div>
        );
    }

    return (
        <Container fluid className="p-4">
            <Row>
                {vehicles.map((vehicle) => {
                    return <AgencyVehicle key={vehicle.id} vehicle={vehicle} />;
                })}
            </Row>
        </Container>
    );
}
