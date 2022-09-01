import React, { useState } from "react";
import { Button, ListGroupItem, ButtonGroup } from "reactstrap";
import DeleteModal from "../modals/DeleteModal";
import EditFuelModal from "../modals/EditFuelModal";

export default function FuelType({ fuelType, deleteItem }) {
    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const toggle = () => setModal(!modal);
    const toggleEdit = () => setModalEdit(!modalEdit);

    return (
        <>
            <DeleteModal
                modal={modal}
                toggle={toggle}
                text={fuelType.name}
                id={fuelType.id}
                deleteItem={deleteItem}
            />
            <EditFuelModal
                modal={modalEdit}
                toggle={toggleEdit}
                fuelType={fuelType}
            />
            <ListGroupItem className="additions-group">
                <span>{fuelType.name}</span>
                <ButtonGroup>
                    <Button
                        style={{ backgroundColor: "rgb(65, 134, 166)" }}
                        color="primary"
                        onClick={toggleEdit}
                        className="btn-primary btn-small"
                    >
                        Izmeni gorivo
                    </Button>
                    <Button
                        color="danger"
                        onClick={toggle}
                        className="btn-primary btn-small"
                    >
                        Obriši gorivo
                    </Button>
                </ButtonGroup>
            </ListGroupItem>
        </>
    );
}
