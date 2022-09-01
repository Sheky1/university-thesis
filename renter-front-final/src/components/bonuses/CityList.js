import React from "react";
import { Row, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import City from "./City";
import Loading from "../layout/Loading";

export default function CityList({ cities, deleteItem, updateCity }) {
    if (cities.length === 0) {
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
                            <span>Trenutno ponuđeni gradovi:</span>
                        </ListGroupItem>
                        {cities.map((city) => {
                            return (
                                <City
                                    key={city.name}
                                    city={city}
                                    deleteItem={deleteItem}
                                    updateCity={updateCity}
                                />
                            );
                        })}
                    </ListGroup>
                </Row>
            </Container>
        </>
    );
}
