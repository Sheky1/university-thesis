import React, { useState } from "react";
import { Button, ListGroupItem, ButtonGroup } from "reactstrap";
import DeleteModal from "../modals/DeleteModal";
import EditCurrencyModal from "../modals/EditCurrencyModal";

export default function Currency({ currency, deleteItem, updateCurrency }) {
    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const toggle = () => setModal(!modal);
    const toggleEdit = () => setModalEdit(!modalEdit);

    return (
        <>
            <DeleteModal
                modal={modal}
                toggle={toggle}
                text={currency.name}
                id={currency.id}
                deleteItem={deleteItem}
            />
            <EditCurrencyModal
                modal={modalEdit}
                toggle={toggleEdit}
                currency={currency}
                updateCurrency={updateCurrency}
            />
            <ListGroupItem className="additions-group">
                <span>{currency.name}</span>
                <ButtonGroup>
                    <Button
                        style={{ backgroundColor: "rgb(65, 134, 166)" }}
                        color="primary"
                        onClick={toggleEdit}
                        className="btn-primary btn-small"
                    >
                        Izmeni valutu
                    </Button>
                    <Button
                        color="danger"
                        onClick={toggle}
                        className="btn-primary btn-small"
                    >
                        Obriši valutu
                    </Button>
                </ButtonGroup>
            </ListGroupItem>
        </>
    );
}
