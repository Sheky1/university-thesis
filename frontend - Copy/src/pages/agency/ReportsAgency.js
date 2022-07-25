import React, { Component } from "react";
import {
    Row,
    Col,
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from "reactstrap";
import DatePicker from "react-date-picker";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Loading from "../../components/layout/Loading";

import ReportsList from "../../components/reports/ReportsList";
import { connect } from "react-redux";
import { params_axios } from "../../api/api";
import { handleErrors } from "../../store/utilities";
import { api_axios } from "../../api/api";
import * as actions from "../../store/actions/index";

const currentYear = new Date().getFullYear();

class Reports extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            tableShow: false,
            date_from: new Date(currentYear, 0, 1),
            date_to: new Date(),
            fromDate: "",
            toDate: "",
            name: "",
        };
    }

    onChangeFrom = (date) => {
        this.setState({
            fromDate: date,
            date_from: date,
        });
    };

    onChangeTo = (date) => {
        this.setState({
            toDate: date,
            date_to: date,
        });
    };

    formatDate = (date) => {
        return date.toISOString().replace(/T/, " ").replace(/\..+/, "");
    };

    getReports = async () => {
        try {
            this.setState({
                loading: true,
            });
            const vehicle_id = this.props.vehicles.map((vehicle) => vehicle.id);
            const params = {
                from_date: this.formatDate(this.state.date_from),
                to_date: this.formatDate(this.state.date_to),
                vehicle_id,
            };
            console.log(params);
            const response = await params_axios(
                `/reports/vehicleReservations`,
                params
            );
            if (this._isMounted) {
                this.props.getReports(response.data.data);
                console.log(this.props.reports);
                this.setState({
                    loading: false,
                    tableShow: true,
                });
            }
        } catch (error) {
            handleErrors(error);
        }
    };

    getVehicles = async () => {
        try {
            const response = await api_axios("get", `/vehicles`, null);
            if (this._isMounted) {
                this.props.getVehicles(response.data.data);
            }
        } catch (error) {
            handleErrors(error);
        }
    };

    handleChange = (e) => {
        const { name, value } = e.target;

        if (this._isMounted) {
            this.setState({
                [name]: value,
            });
        }
    };

    componentDidMount() {
        this._isMounted = true;
        this.getVehicles();
    }

    render() {
        return (
            <>
                <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <Row style={{ width: "100%", margin: 0 }}>
                        <Col xs="2" className="px-0">
                            <Navigation />
                        </Col>
                        <Col xs="10" className="px-0">
                            <Header />
                            <div className="top-banner">
                                <p>Prikaz izvestaja</p>

                                <Link to="/home-agency/">
                                    <button className="btn-primary btn-small">
                                        <span>
                                            <FaArrowLeft />
                                        </span>{" "}
                                        Nazad na pregled vozila
                                    </button>
                                </Link>
                            </div>

                            <div className="agency-preview">
                                <Form
                                    style={{
                                        width: "100%",
                                        padding: "2rem",
                                    }}
                                >
                                    <FormGroup row>
                                        <Label for="reports" sm={2}>
                                            Vrsta izvestaja
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                                type="select"
                                                name="reports"
                                                id="reports"
                                            >
                                                <option>
                                                    Izvestaj prema rezervacijama
                                                </option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup
                                        row
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Col sm={6} className="p-3">
                                            <DatePicker
                                                // selected={startDate}
                                                onChange={this.onChangeFrom}
                                                value={this.state.fromDate}
                                                dayPlaceholder={"dd"}
                                                monthPlaceholder={"mm"}
                                                yearPlaceholder={"yyyy"}
                                                className="date-picker"
                                                // customInput={<ExampleCustomInput />}
                                            />
                                            <DatePicker
                                                // selected={startDate}
                                                onChange={this.onChangeTo}
                                                value={this.state.toDate}
                                                dayPlaceholder={"dd"}
                                                monthPlaceholder={"mm"}
                                                yearPlaceholder={"yyyy"}
                                                className="date-picker"
                                                // customInput={<ExampleCustomInput />}
                                            />
                                        </Col>
                                        <Col sm={6} className="p-3">
                                            <Button
                                                className="btn-primary btn-small btn-green"
                                                onClick={() =>
                                                    this.getReports()
                                                }
                                                color="success"
                                            >
                                                Filtriraj
                                            </Button>{" "}
                                        </Col>
                                    </FormGroup>
                                </Form>
                                {this.state.loading ? (
                                    <Loading />
                                ) : this.state.tableShow ? (
                                    <ReportsList reports={this.props.reports} />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reservations: state.reservations,
        vehicles: state.vehicles,
        reports: state.reports,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getVehicles: (vehicles) => dispatch(actions.getVehicles(vehicles)),
        getReports: (reports) => dispatch(actions.getReports(reports)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
