import React from "react";
import { Row, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import Size from "./Size";
import Loading from "../layout/Loading";

export default function SizeList({ sizes, deleteItem }) {
    if (sizes.length === 0) {
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
                            <span>Velicine:</span>
                        </ListGroupItem>
                        {sizes.map((size) => {
                            return (
                                <Size
                                    key={size.name}
                                    size={size}
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
