import React from "react";
import { Row, Container, ListGroup, ListGroupItem } from "reactstrap";
import Addition from "./Addition";

export default function AdditionList({ additions, deleteItem }) {
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
                            <span>Moguci dodaci:</span>
                        </ListGroupItem>
                        {additions.map((addition) => {
                            return (
                                <Addition
                                    key={addition.id}
                                    addition={addition}
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
