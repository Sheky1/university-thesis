import React from "react";
import { Row, Container, Col, Table } from "react-bootstrap";

export default function ReportsList({ reports }) {
    let rowNumber = 1;

    // additions: [{…}]
    // created_at: "2020-09-12 11:01:34"
    // deleted_at: null
    // id: 1
    // is_approved: 0
    // is_completed: 0
    // is_rated: 0
    // is_rejected: 0
    // phone_number: "063455542"
    // reservation_date: "2020-09-12 11:01:34"
    // returning_date: "2020-08-13 10:00:00"
    // taking_date: "2020-08-12 10:00:00"
    // updated_at: "2020-09-12 11:01:34"
    // user: {id: 4, username: "zarkostanisic", email: "zarko.stanisic@live.com", name: "Zarko", surname: "Stanisic"}
    // vehicle: {id: 1, name: "Megane", transmission_type: "manual", passenger_count: 5, door_count: 4, …}

    return (
        <>
            <Container fluid className="p-5">
                <Row style={{ width: "100%", margin: 0 }}>
                    <Col xs="12">
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Ime i prezime</th>
                                    <th>Datum rezervacije</th>
                                    <th>Datum preuzimanja</th>
                                    <th>Datum vracanja</th>
                                    <th>Broj telefona</th>
                                    <th>Email</th>
                                    <th>Vozilo</th>
                                    {/* <th>Cena</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => {
                                    return (
                                        <tr key={report.id}>
                                            <th scope="row">{rowNumber++}</th>
                                            <td>
                                                {report.user.name}{" "}
                                                {report.user.surname}
                                            </td>
                                            <td>{report.reservation_date}</td>
                                            <td>{report.taking_date}</td>
                                            <td>{report.returning_date}</td>
                                            <td>{report.phone_number}</td>
                                            <td>{report.user.email}</td>
                                            <td>
                                                {report.vehicle.name}:{" "}
                                                {report.vehicle.register_number}
                                            </td>
                                            {/* <td>{report.reservation_date}</td> */}
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
