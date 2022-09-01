import React, { useState } from "react";
import { Button, ListGroupItem, ButtonGroup } from "reactstrap";
import DeleteModal from "../modals/DeleteModal";
import EditAdditionModal from "../modals/EditAdditionModal";

export default function Addition({ addition, deleteItem }) {
    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const toggle = () => setModal(!modal);
    const toggleEdit = () => setModalEdit(!modalEdit);

    return (
        <>
            <DeleteModal
                modal={modal}
                toggle={toggle}
                text={addition.name}
                id={addition.id}
                deleteItem={deleteItem}
            />
            <EditAdditionModal
                modal={modalEdit}
                toggle={toggleEdit}
                addition={addition}
            />
            <ListGroupItem className="additions-group">
                <span>
                    {addition.name}, cena: {addition.price}{" "}
                    {addition.currency.name}
                </span>
                <ButtonGroup>
                    <Button
                        style={{ backgroundColor: "rgb(65, 134, 166)" }}
                        color="primary"
                        onClick={toggleEdit}
                        className="btn-primary btn-small"
                    >
                        Izmeni dodatak
                    </Button>
                    <Button
                        color="danger"
                        onClick={toggle}
                        className="btn-primary btn-small"
                    >
                        Obriši dodatak
                    </Button>
                </ButtonGroup>
            </ListGroupItem>
        </>
    );
}
