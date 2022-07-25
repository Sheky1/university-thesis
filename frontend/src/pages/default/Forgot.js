import logo from "../../images/logo.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import React, { Component } from "react";

export default class Forgot extends Component {
    handleChange = () => {
        console.log("caoo");
    };

    render() {
        return (
            <>
                <div className="login">
                    <Container
                        fluid
                        style={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                        <Row className="width-100">
                            <Col lg="12" className="px-0">
                                <div className="login-logo">
                                    <img
                                        src={logo}
                                        alt=""
                                        className="login-logo"
                                    />
                                </div>
                                <form action="" className="login-form">
                                    <h1>Zaborili ste lozinku?</h1>

                                    <input
                                        type="email"
                                        id="text"
                                        placeholder="Unesite email za oporavku lozinke"
                                        required
                                    />

                                    <Link to="/">
                                        <button
                                            className="btn-primary"
                                            onChange={this.handleChange}
                                        >
                                            Submit
                                        </button>
                                    </Link>
                                </form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}
