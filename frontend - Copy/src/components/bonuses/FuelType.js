import React, { useState } from "react";
import { Button, ListGroupItem } from "reactstrap";
import DeleteModal from "../modals/DeleteModal";

export default function FuelType({ fuelType, deleteItem }) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <>
            <DeleteModal
                modal={modal}
                toggle={toggle}
                text={fuelType.name}
                id={fuelType.id}
                deleteItem={deleteItem}
            />
            <ListGroupItem className="additions-group">
                <span>{fuelType.name}</span>
                <Button
                    color="danger"
                    onClick={toggle}
                    className="btn-primary btn-small"
                >
                    Obrisi gorivo
                </Button>
            </ListGroupItem>
        </>
    );
}
