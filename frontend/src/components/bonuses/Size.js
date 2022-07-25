import React, { useState } from "react";
import { Button, ListGroupItem } from "reactstrap";
import DeleteModal from "../modals/DeleteModal";

export default function Size({ size, deleteItem }) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <>
            <DeleteModal
                modal={modal}
                toggle={toggle}
                text={size.name}
                id={size.id}
                deleteItem={deleteItem}
            />
            <ListGroupItem className="additions-group">
                <span>{size.name}</span>
                <Button
                    color="danger"
                    onClick={toggle}
                    className="btn-primary btn-small"
                >
                    Obrisi velicinu
                </Button>
            </ListGroupItem>
        </>
    );
}
