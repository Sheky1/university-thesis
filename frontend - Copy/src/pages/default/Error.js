import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function Error() {
    return (
        <>
            <div className="error">
                <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <Row className="width-100">
                        <Col lg="12" className="px-0">
                            <div className="login-logo">
                                <img src={logo} alt="" className="login-logo" />
                            </div>
                            <div className="login-form">
                                <h1>404</h1>
                                <div className="login-line"></div>
                                <h4>Page not found</h4>

                                <Link to="/" className="btn-primary">
                                    Back to Home
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}
