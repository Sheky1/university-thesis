import React from "react";
import { Col, Card, CardSubtitle, Button } from "reactstrap";
import { handleErrors } from "../../store/utilities";
import { api_axios } from "../../api/api";

export default function Reservation({ reservation, updateReservation, flag }) {
	const color =
		reservation.isCompleted === 1 && reservation.isRejected === 0
			? "#16b841"
			: reservation.isRejected === 1
			? "rgb(207, 73, 73)"
			: reservation.isApproved === 1
			? "#2a8f87"
			: "#333";

	const status =
		reservation.isCompleted === 1 && reservation.isRejected === 0
			? "Završena"
			: reservation.isRejected === 1
			? "Odbijena"
			: reservation.isApproved === 1
			? "prihvaćena"
			: "Čeka na odobrenje";

	const miliseconds = Math.abs(
		new Date(reservation.returningDate) - new Date(reservation.takingDate)
	);
	const days = Math.ceil(miliseconds / (1000 * 60 * 60 * 24));

	let price = parseFloat(reservation.vehicle.price * days);
	if (
		reservation.vehicle.depositPrice !== undefined &&
		reservation.vehicle.depositPrice !== null
	)
		price += parseFloat(reservation.vehicle.depositPrice);

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
				`/reservations/approve/${reservation.id}?sort_direction=desc`,
				null
			);
			updateReservation(response.data);
		} catch (error) {
			handleErrors(error);
		}
	};

	function formatDate(date) {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [day, month, year].join(".");
	}

	const declineReservation = async () => {
		try {
			await api_axios(
				"post",
				`/reservations/reject/${reservation.id}?sort_direction=desc`,
				null
			);
			updateReservation({
				...reservation,
				isCompleted: 0,
				isRejected: 1,
				isApproved: 0,
			});
		} catch (error) {
			handleErrors(error);
		}
	};

	const completeReservation = async () => {
		try {
			const response = await api_axios(
				"post",
				`/reservations/complete/${reservation.id}?sort_direction=desc`,
				null
			);
			updateReservation(response.data);
		} catch (error) {
			handleErrors(error);
		}
	};

	return (
		<>
			<Col xs="12" md="6">
				<Card className="reservation" style={{ paddingBottom: "0px" }}>
					<CardSubtitle
						style={{
							textAlign: "center",
							fontStyle: "italic",
						}}
					>
						Datum rezervisavanja:{" "}
						{formatDate(reservation.reservationDate)}
					</CardSubtitle>
					<div className="reservation-text">
						<span className="reservation-left">Ime i prezime:</span>
						<span className="reservation-right">
							{reservation.user.name} {reservation.user.surname}
						</span>
					</div>
					<div className="reservation-text">
						<span className="reservation-left">E-mail adresa:</span>
						<span className="reservation-right">
							{reservation.user.email}
						</span>
					</div>
					<div className="reservation-text">
						<span className="reservation-left">Broj telefona:</span>
						<span className="reservation-right">
							{reservation.phoneNumber}
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
							{reservation.vehicle.depositPrice}
						</span>
					</div>
					<div className="reservation-text">
						<span className="reservation-left">
							Datum i vreme preuzimanja:
						</span>
						<span className="reservation-right">
							{formatDate(reservation.takingDate)}
						</span>
					</div>
					<div className="reservation-text">
						<span className="reservation-left">
							Datum i vreme vraćanja:
						</span>
						<span className="reservation-right">
							{formatDate(reservation.returningDate)}
						</span>
					</div>

					{reservation.vehicle.additions.length > 0 && (
						<div className="reservation-text">
							<span className="reservation-left">
								Uključeni dodaci:
							</span>
							<span className="reservation-right">
								{reservation.vehicle.additions.map(
									(addition, index) => {
										if (
											index ===
											reservation.vehicle.additions
												.length -
												1
										)
											return `${addition.name}`;
										return `${addition.name}, `;
									}
								)}
							</span>
						</div>
					)}
					<hr />
					<div
						className="reservation-text"
						style={{ marginTop: "0px" }}
					>
						<span className="reservation-left">Status:</span>
						<span className="reservation-right" style={style}>
							{status}
						</span>
					</div>
					<div
						className="reservation-text"
						style={{ marginBottom: "10px" }}
					>
						<span className="reservation-left">Ukupna cena:</span>
						<span className="reservation-right" style={style}>
							{price} {reservation.vehicle.currency.name}
						</span>
					</div>
					{flag === "admin" ? (
						<></>
					) : reservation.isRejected === true ? (
						<div
							className="modal-footer"
							style={{
								fontSize: "1.5rem",
								fontWeight: "bold",
								margin: "15px",
							}}
						>
							Rezervacija je{" "}
							<span
								style={{
									color: "rgb(207, 73, 73)",
									fontSize: "1.5rem",
									fontWeight: "bold",
									marginLeft: "7px",
								}}
							>
								odbijena!
							</span>
						</div>
					) : reservation.isCompleted === true &&
					  reservation.isRejected === false ? (
						<div
							className="modal-footer"
							style={{
								fontSize: "1.5rem",
								fontWeight: "bold",
								margin: "15px",
							}}
						>
							Rezervacija je{" "}
							<span
								style={{
									color: "#2a8f87",
									fontSize: "1.5rem",
									fontWeight: "bold",
									marginLeft: "7px",
								}}
							>
								završena!
							</span>
						</div>
					) : reservation.isApproved === true ? (
						<div
							className="modal-footer"
							style={{ margin: "15px" }}
						>
							<Button
								className="btn-primary btn-small btn-green"
								onClick={() => {
									completeReservation();
								}}
								color="success"
								style={{ marginTop: "0px" }}
							>
								Kompletiraj
							</Button>{" "}
						</div>
					) : (
						<div
							className="modal-footer"
							style={{ margin: "15px" }}
						>
							<Button
								className="btn-primary btn-small btn-green"
								onClick={() => {
									approveReservation();
								}}
								color="success"
								style={{
									marginTop: "0px",
									marginRight: "10px",
								}}
							>
								Potvrdi
							</Button>{" "}
							<Button
								className="btn-primary btn-small btn-red"
								onClick={() => declineReservation()}
								color="danger"
								style={{ marginTop: "0px", marginLeft: "10px" }}
							>
								Odbaci
							</Button>
						</div>
					)}
				</Card>
			</Col>
		</>
	);
}
