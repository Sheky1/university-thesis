import React from "react";
import { Row, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import Currency from "./Currency";
import Loading from "../layout/Loading";

export default function CurrencyList({
    currencies,
    deleteItem,
    updateCurrency,
}) {
    if (currencies.length === 0) {
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
                            <span>Trenutno ponuđene valute:</span>
                        </ListGroupItem>
                        {currencies.map((currency) => {
                            return (
                                <Currency
                                    key={currency.name}
                                    currency={currency}
                                    deleteItem={deleteItem}
                                    updateCurrency={updateCurrency}
                                />
                            );
                        })}
                    </ListGroup>
                </Row>
            </Container>
        </>
    );
}
