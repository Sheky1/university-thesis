import React, { useState } from "react";
import { Button, ListGroupItem, ButtonGroup } from "reactstrap";
import DeleteModal from "../modals/DeleteModal";
import EditSizeModal from "../modals/EditSizeModal";

export default function Size({ size, deleteItem }) {
    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const toggle = () => setModal(!modal);
    const toggleEdit = () => setModalEdit(!modalEdit);

    return (
        <>
            <DeleteModal
                modal={modal}
                toggle={toggle}
                text={size.name}
                id={size.id}
                deleteItem={deleteItem}
            />
            <EditSizeModal modal={modalEdit} toggle={toggleEdit} size={size} />
            <ListGroupItem className="additions-group">
                <span>{size.name}</span>
                <ButtonGroup>
                    <Button
                        style={{ backgroundColor: "rgb(65, 134, 166)" }}
                        color="primary"
                        onClick={toggleEdit}
                        className="btn-primary btn-small"
                    >
                        Izmeni veličinu
                    </Button>
                    <Button
                        color="danger"
                        onClick={toggle}
                        className="btn-primary btn-small"
                    >
                        Obriši veličinu
                    </Button>
                </ButtonGroup>
            </ListGroupItem>
        </>
    );
}
