import React, { useState } from "react";
import { Button, ListGroupItem } from "reactstrap";
import DeleteModal from "../modals/DeleteModal";

export default function City({ city, deleteItem }) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <>
            <DeleteModal
                modal={modal}
                toggle={toggle}
                text={city.name}
                id={city.id}
                deleteItem={deleteItem}
            />
            <ListGroupItem className="additions-group">
                <span>{city.name}</span>
                <Button
                    color="danger"
                    onClick={toggle}
                    className="btn-primary btn-small"
                >
                    Obrisi grad
                </Button>
            </ListGroupItem>
        </>
    );
}
