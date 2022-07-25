import React, { useState } from "react";
import { Container, Col, Row, Collapse, Button } from "reactstrap";
import Navigation from "../../components/layout/Navigation";
import Header from "../../components/layout/Header";
import MainAgencija from "../../components/vehicles/MainAgencija";

export default function HomeAgencija() {
    const [collapse, setCollapse] = useState(true);

    const toggle = () => setCollapse(!collapse);

    return (
        <>
            <Button
                color="primary"
                onClick={toggle}
                className="btn-primary btn-hidden"
                style={{ marginBottom: "1rem" }}
            >
                Toggle
            </Button>
            <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Row style={{ width: "100%", margin: 0 }}>
                    <Col md="2" xs="10" className="px-0">
                        <Collapse isOpen={collapse}>
                            <Navigation />
                        </Collapse>
                    </Col>
                    <Col xs="10" className="px-0">
                        <Header />
                        <MainAgencija />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
