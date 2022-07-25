import React from "react";
import { Row, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import FuelType from "./FuelType";
import Loading from "../layout/Loading";

export default function FuelList({ fuel, deleteItem }) {
    if (fuel.length === 0) {
        return <Loading />;
    }

    return (
        <>
            <Container fluid className="p-5">
                <Row style={{ width: "100%", margin: 0 }}>
                    <ListGroup className="additions">
                        <ListGroupItem
                            style={{
                                backgroundColor: "#4186a6",
                                color: "whitesmoke",
                            }}
                        >
                            <span>Vrste goriva:</span>
                        </ListGroupItem>
                        {fuel.map((fuelType) => {
                            return (
                                <FuelType
                                    key={fuelType.name}
                                    fuelType={fuelType}
                                    deleteItem={deleteItem}
                                />
                            );
                        })}
                    </ListGroup>
                </Row>
            </Container>
        </>
    );
}
