import React, { useState } from "react";
import { Button, ListGroupItem } from "reactstrap";
import DeleteModal from "../modals/DeleteModal";

export default function Addition({ addition, deleteItem }) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <>
            <DeleteModal
                modal={modal}
                toggle={toggle}
                text={addition.name}
                id={addition.id}
                deleteItem={deleteItem}
            />
            <ListGroupItem className="additions-group">
                <span>
                    {addition.name}, cena: {addition.price}{" "}
                    {addition.currency.name}
                </span>
                <Button
                    color="danger"
                    onClick={toggle}
                    className="btn-primary btn-small"
                >
                    Obrisi dodatak
                </Button>
            </ListGroupItem>
        </>
    );
}
