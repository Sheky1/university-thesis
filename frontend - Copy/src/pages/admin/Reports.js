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
import NavigationAdmin from "../../components/layout/NavigationAdmin";
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
            const agency = this.props.agencies.filter((agency) => {
                if (agency.name === this.state.name) return agency;
                return null;
            });
            const agency_id = agency.map((ag) => ag.id);
            const params = {
                from_date: this.formatDate(this.state.date_from),
                to_date: this.formatDate(this.state.date_to),
                agency_id,
            };
            console.log(params);
            const response = await params_axios(
                `/reports/agencyReservations`,
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

    getAgencies = async () => {
        try {
            const response = await api_axios("get", `/agencies`, null);
            if (this._isMounted) {
                this.props.getAgencies(response.data.data);

                this.setState({
                    loading: false,
                    name: this.props.agencies[0].name,
                });
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
        this.getAgencies();
    }

    render() {
        return (
            <>
                <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <Row style={{ width: "100%", margin: 0 }}>
                        <Col xs="2" className="px-0">
                            <NavigationAdmin />
                        </Col>
                        <Col xs="10" className="px-0">
                            <Header />
                            <div className="top-banner">
                                <p>Prikaz izvestaja</p>

                                <Link to="/home-admin/">
                                    <button className="btn-primary btn-small">
                                        <span>
                                            <FaArrowLeft />
                                        </span>{" "}
                                        Nazad na pregled agencija
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
                                    <FormGroup row>
                                        <Label for="reports" sm={2}>
                                            Odaberi agenciju:
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                                type="select"
                                                name="name"
                                                id="name"
                                                value={this.state.name}
                                                onChange={this.handleChange}
                                            >
                                                {this.props.agencies.map(
                                                    (agency) => {
                                                        return (
                                                            <option
                                                                key={agency.id}
                                                            >
                                                                {agency.name}
                                                            </option>
                                                        );
                                                    }
                                                )}
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
        agencies: state.agencies,
        reports: state.reports,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAgencies: (agencies) => dispatch(actions.getAgencies(agencies)),
        getReports: (reports) => dispatch(actions.getReports(reports)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
