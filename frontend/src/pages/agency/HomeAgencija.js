import React, { useState } from "react";
import { Container, Col, Row, Collapse } from "reactstrap";
import Navigation from "../../components/layout/Navigation";
import Header from "../../components/layout/Header";
import MainAgencija from "../../components/vehicles/MainAgencija";

export default function HomeAgencija() {
    const [collapse, setCollapse] = useState(true);

    const toggle = () => setCollapse(!collapse);

    const x = window.screen.width;

    return (
        <>
            <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Row style={{ width: "100%", margin: 0 }}>
                    <Col md="2" xs="10" className="px-0">
                        {x < 768 ? (
                            <Collapse isOpen={!collapse}>
                                <Navigation toggle={toggle} />
                            </Collapse>
                        ) : (
                            <Collapse isOpen={collapse}>
                                <Navigation toggle={toggle} />
                            </Collapse>
                        )}
                    </Col>
                    <Col xs="12" md="10" className="px-0">
                        <Header toggle={toggle} />
                        <MainAgencija />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
