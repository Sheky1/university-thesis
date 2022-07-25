import React from "react";
import Agency from "./Agency";
import { Row, Container } from "reactstrap";

export default function Agencies({ agencies }) {
    if (agencies.length === 0) {
        return (
            <div className="empty-search">
                <h3>Trenutno ne postoji nijedna agencija.</h3>
            </div>
        );
    }

    return (
        <Container fluid className="p-5">
            <Row>
                {agencies.map((agency) => {
                    return <Agency key={agency.id} agency={agency} />;
                })}
            </Row>
        </Container>
    );
}
