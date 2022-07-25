import React from "react";
import logo from "../../images/logo.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function Footer() {
    return (
        <>
            <footer className="footer">
                <Container fluid>
                    <Row style={{ width: "100%", margin: 0 }} className="row">
                        <Col lg="5">
                            <div className="footer__navigation">
                                <ul className="footer__list">
                                    <li className="footer__item">Company</li>
                                    <li className="footer__item">Contact us</li>
                                    <li className="footer__item">Careers</li>
                                    <li className="footer__item">
                                        Privacy Policy
                                    </li>
                                    <li className="footer__item">Terms</li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg="2">
                            <div className="footer__logo-box">
                                <img
                                    src={logo}
                                    alt="Full logo"
                                    className="footer__logo"
                                />
                            </div>
                        </Col>
                        <Col lg="5">
                            <p className="footer__copyright">
                                &copy;{" "}
                                <a
                                    href="www.google.com"
                                    className="footer__link"
                                >
                                    2020 Renter
                                </a>
                                , All Rights Reserved.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
}
