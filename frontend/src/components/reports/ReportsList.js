import React, { Component } from "react";
import { Row, Container, Col, Table } from "react-bootstrap";

export default class ReportsList extends Component {
	formatDate = (date) => {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [day, month, year].join(".");
	};
	render() {
		let rowNumber = 1;

		return (
			<>
				<Container fluid className="p-5">
					<Row style={{ width: "100%", margin: 0 }}>
						<Col xs="12">
							<Table bordered responsive>
								<thead>
									<tr>
										<th>#</th>
										<th>Ime i prezime</th>
										<th>Datum rezervacije</th>
										<th>Datum preuzimanja</th>
										<th>Datum vraćanja</th>
										<th>Broj telefona</th>
										<th>Email</th>
										<th>Vozilo</th>
										<th>Ukupna cena</th>
										<th>Uključeni dodaci</th>
									</tr>
								</thead>
								<tbody>
									{this.props.reports.map((report) => {
										const miliseconds = Math.abs(
											new Date(report.returningDate) -
												new Date(report.takingDate)
										);
										const days = Math.ceil(
											miliseconds / (1000 * 60 * 60 * 24)
										);
										// let price = parseFloat(
										//     report.vehicle.price
										// );
										let price = parseFloat(
											report.vehicle.price * days
										);
										if (
											report.vehicle.depositPrice !==
												undefined &&
											report.vehicle.depositPrice !== null
										)
											price += parseFloat(
												report.vehicle.depositPrice
											);
										report.additions.forEach((addition) => {
											price += parseFloat(addition.price);
										});
										return (
											<tr key={report.id}>
												<th scope="row">
													{rowNumber++}
												</th>
												<td>
													{report.user.name}{" "}
													{report.user.surname}
												</td>
												<td>
													{this.formatDate(
														report.reservationDate
													)}
												</td>
												<td>
													{this.formatDate(
														report.takingDate
													)}
												</td>
												<td>
													{this.formatDate(
														report.returningDate
													)}
												</td>
												<td>{report.phoneNumber}</td>
												<td>{report.user.email}</td>
												<td>
													{report.vehicle.name}:{" "}
													{
														report.vehicle
															.registerNumber
													}
												</td>
												<td>
													{price}{" "}
													{
														report.vehicle.currency
															.name
													}
												</td>
												<td>
													{report.additions.length ===
													0
														? "Nema dodataka"
														: report.additions.map(
																(addition) => {
																	return (
																		addition.name +
																		": " +
																		addition.price +
																		" " +
																		addition
																			.currency
																			.name +
																		", "
																	);
																}
														  )}
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}
