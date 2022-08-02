import React from "react";
import { Col, Card, CardSubtitle, Button } from "reactstrap";
import { handleErrors } from "../../store/utilities";
import { api_axios } from "../../api/api";

export default function Reservation({ reservation, updateReservation, flag }) {
  const color =
    reservation.is_completed === 1
      ? "#16b841"
      : reservation.is_rejected === 1
      ? "rgb(207, 73, 73)"
      : reservation.is_approved === 1
      ? "#2a8f87"
      : "#333";

  const status =
    reservation.is_completed === 1
      ? "Zavrsena"
      : reservation.is_rejected === 1
      ? "Odbijena"
      : reservation.is_approved === 1
      ? "U obradi"
      : "Na cekanju";

  const miliseconds = Math.abs(
    new Date(reservation.returning_date) - new Date(reservation.taking_date)
  );
  const days = Math.ceil(miliseconds / (1000 * 60 * 60 * 24));

  let price = parseFloat(reservation.vehicle.price * days);
  if (
    reservation.vehicle.deposit_price !== undefined &&
    reservation.vehicle.deposit_price !== null
  )
    price += parseFloat(reservation.vehicle.deposit_price);

  reservation.additions.forEach(
    (addition) => (price += parseFloat(addition.price))
  );

  const style = {
    color: color,
    textTransform: "uppercase",
  };

  const approveReservation = async () => {
    try {
      const response = await api_axios(
        "post",
        `/reservations/approve/${reservation.id}`,
        null
      );
      updateReservation(response.data);
    } catch (error) {
      handleErrors(error);
    }
  };

  const declineReservation = async () => {
    try {
      await api_axios("post", `/reservations/reject/${reservation.id}`, null);
      updateReservation({
        ...reservation,
        is_completed: 0,
        is_rejected: 1,
        is_approved: 0,
      });
    } catch (error) {
      handleErrors(error);
    }
  };

  const completeReservation = async () => {
    try {
      const response = await api_axios(
        "post",
        `/reservations/complete/${reservation.id}`,
        null
      );
      updateReservation(response.data);
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <>
      <Col xs="12">
        <Card className="reservation" style={{ paddingBottom: "0px" }}>
          <CardSubtitle
            style={{
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            Datum rezervisavanja: {reservation.reservation_date}
          </CardSubtitle>
          <div className="reservation-text">
            <span className="reservation-left">Ime i prezime:</span>
            <span className="reservation-right">
              {reservation.user.name} {reservation.user.surname}
            </span>
          </div>
          <div className="reservation-text">
            <span className="reservation-left">E-mail adresa:</span>
            <span className="reservation-right">{reservation.user.email}</span>
          </div>
          <div className="reservation-text">
            <span className="reservation-left">Broj telefona:</span>
            <span className="reservation-right">
              {reservation.phone_number}
            </span>
          </div>
          <div className="reservation-text">
            <span className="reservation-left">Ime vozila:</span>
            <span className="reservation-right">
              {reservation.vehicle.name}
            </span>
          </div>
          <div className="reservation-text">
            <span className="reservation-left">Cena depozita:</span>
            <span className="reservation-right">
              {reservation.vehicle.deposit_price}
            </span>
          </div>
          <div className="reservation-text">
            <span className="reservation-left">Datum i vreme preuzimanja:</span>
            <span className="reservation-right">{reservation.taking_date}</span>
          </div>
          <div className="reservation-text">
            <span className="reservation-left">Datum i vreme vracanja:</span>
            <span className="reservation-right">
              {reservation.returning_date}
            </span>
          </div>
          <div className="reservation-text">
            <span className="reservation-left">Ukljuceni dodaci:</span>
            <span className="reservation-right">
              {reservation.vehicle.additions.map(
                (addition) => `${addition.name}, `
              )}
            </span>
          </div>
          <hr />
          <div className="reservation-text" style={{ marginTop: "0px" }}>
            <span className="reservation-left">Status:</span>
            <span className="reservation-right" style={style}>
              {status}
            </span>
          </div>
          <div className="reservation-text" style={{ marginBottom: "10px" }}>
            <span className="reservation-left">Ukupna cena:</span>
            <span
              className="reservation-right"
              style={{
                color: "rgb(207, 73, 73)",
              }}
            >
              {price} KM
            </span>
          </div>
          {flag === "admin" ? (
            <></>
          ) : reservation.is_rejected === 1 ? (
            <div
              className="modal-footer"
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Rezervacija je{" "}
              <span
                style={{
                  color: "rgb(207, 73, 73)",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                odbijena!
              </span>
            </div>
          ) : reservation.is_completed === 1 ? (
            <div
              className="modal-footer"
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Rezervacija je{" "}
              <span
                style={{
                  color: "#2a8f87",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                zavrsena!
              </span>
            </div>
          ) : reservation.is_approved === 1 ? (
            <div className="modal-footer">
              <Button
                className="btn-primary btn-small btn-green"
                onClick={() => {
                  completeReservation();
                }}
                color="success"
              >
                Kompletiraj!
              </Button>{" "}
            </div>
          ) : (
            <div className="modal-footer">
              <Button
                className="btn-primary btn-small btn-green"
                onClick={() => {
                  approveReservation();
                }}
                color="success"
              >
                Potvrdi!
              </Button>{" "}
              <Button
                className="btn-primary btn-small btn-red"
                onClick={() => declineReservation()}
                color="danger"
              >
                Odbaci..
              </Button>
            </div>
          )}
        </Card>
      </Col>
    </>
  );
}
