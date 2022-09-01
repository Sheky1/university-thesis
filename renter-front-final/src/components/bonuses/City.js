import React, { useState } from "react";
import { Button, ListGroupItem, ButtonGroup } from "reactstrap";
import DeleteModal from "../modals/DeleteModal";
import EditCityModal from "../modals/EditCityModal";

export default function City({ city, deleteItem, updateCity }) {
    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const toggle = () => setModal(!modal);
    const toggleEdit = () => setModalEdit(!modalEdit);

    return (
        <>
            <DeleteModal
                modal={modal}
                toggle={toggle}
                text={city.name}
                id={city.id}
                deleteItem={deleteItem}
            />
            <EditCityModal
                modal={modalEdit}
                toggle={toggleEdit}
                city={city}
                updateCity={updateCity}
            />
            <ListGroupItem className="additions-group">
                <span>{city.name}</span>
                <ButtonGroup>
                    <Button
                        style={{ backgroundColor: "rgb(65, 134, 166)" }}
                        color="primary"
                        onClick={toggleEdit}
                        className="btn-primary btn-small"
                    >
                        Izmeni grad
                    </Button>
                    <Button
                        color="danger"
                        onClick={toggle}
                        className="btn-primary btn-small"
                    >
                        Obriši grad
                    </Button>
                </ButtonGroup>
            </ListGroupItem>
        </>
    );
}
