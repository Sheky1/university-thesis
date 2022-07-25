import React, { useState } from "react";
import { Button, ListGroupItem } from "reactstrap";
import DeleteModal from "../modals/DeleteModal";

export default function Currency({ currency, deleteItem }) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <>
            <DeleteModal
                modal={modal}
                toggle={toggle}
                text={currency.name}
                id={currency.id}
                deleteItem={deleteItem}
            />
            <ListGroupItem className="additions-group">
                <span>{currency.name}</span>
                <Button
                    color="danger"
                    onClick={toggle}
                    className="btn-primary btn-small"
                >
                    Obrisi valutu
                </Button>
            </ListGroupItem>
        </>
    );
}
