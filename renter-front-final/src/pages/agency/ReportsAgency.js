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
    Collapse,
} from "reactstrap";
import DatePicker from "react-date-picker";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Loading from "../../components/layout/Loading";
import ErrorModal from "../../components/modals/ErrorModal";

import PdfComponent from "../../components/pdf/PdfComponent";
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
            errorModal: false,
            errorText: "",
            loading: false,
            loading2: true,
            tableShow: false,
            date_from: new Date(currentYear, 0, 1),
            date_to: new Date(),
            fromDate: "",
            toDate: "",
            name: "",
            report_type: "",
            x: window.screen.width,
            collapse: true,
        };
    }

    toggleError = () => this.setErrorModal(!this.state.errorModal);

    setErrorModal = (errorModal) => {
        if (this._isMounted) {
            this.setState({
                errorModal,
            });
        }
    };

    toggleCollapse = () => this.setCollapse(!this.state.collapse);

    setCollapse = (collapse) => {
        if (this._isMounted) {
            this.setState({
                collapse,
            });
        }
    };

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
            if (this.state.report_type === "") {
                this.setState({
                    errorText: "Neophodno je odabrati vrstu izveštaja.",
                });
                this.toggleError();
                return;
            }
            if (this.state.name === "") {
                this.setState({
                    errorText: "Neophodno je odabrati vozilo/sva vozila.",
                });
                this.toggleError();
                return;
            }

            this.setState({
                loading: true,
            });
            let vehicle_id;
            if (this.state.name === "all") {
                vehicle_id = this.props.vehicles.map((vehicle) => {
                    return vehicle.id;
                });
            } else {
                const vehicle = this.props.vehicles.filter((vehicle) => {
                    if (vehicle.name === this.state.name) return vehicle;
                    return null;
                });
                if (vehicle.length === 0) {
                    this.setState({
                        loading: false,
                    });
                    return;
                }
                vehicle_id = vehicle.map((veh) => veh.id);
            }
            console.log(vehicle_id);

            let from_date, to_date;
            if (this.state.date_from === null) {
                from_date = this.formatDate(new Date(currentYear, 0, 1));
            } else {
                from_date = this.formatDate(this.state.date_from);
            }
            if (this.state.date_to === null) {
                to_date = this.formatDate(new Date());
            } else {
                to_date = this.formatDate(this.state.date_to);
            }
            const params = {
                from_date,
                to_date,
                vehicle_id,
                is_completed: 1,
                is_rejected: 1,
            };
            const response = await params_axios(
                `/reports/vehicleReservations`,
                params
            );
            if (this._isMounted) {
                this.props.getReports(response.data);
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
                this.props.getVehicles(response.data);
                console.log(response.data);
                // if (this.props.vehicles.length !== 0) {
                //     this.setState({
                //         name: this.props.vehicles[0].name,
                //     });
                // }
                this.setState({
                    loading2: false,
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
        this.getVehicles();
    }

    render() {
        return (
            <>
                <ErrorModal
                    modal={this.state.errorModal}
                    toggle={this.toggleError}
                    text={this.state.errorText}
                />
                <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <Row style={{ width: "100%", margin: 0 }}>
                        <Col md="2" xs="10" className="px-0">
                            {this.state.x < 768 ? (
                                <Collapse isOpen={!this.state.collapse}>
                                    <Navigation toggle={this.toggleCollapse} />
                                </Collapse>
                            ) : (
                                <Collapse isOpen={this.state.collapse}>
                                    <Navigation toggle={this.toggleCollapse} />
                                </Collapse>
                            )}
                        </Col>
                        <Col xs="12" md="10" className="px-0">
                            <Header toggle={this.toggleCollapse} />
                            <div className="top-banner">
                                <p>Prikaz izveštaja</p>

                                <Link
                                    to="/home-agency/"
                                    style={{
                                        gridColumn: "3",
                                    }}
                                >
                                    <button className="btn-primary btn-small">
                                        <span>
                                            <FaArrowLeft />
                                        </span>{" "}
                                        Nazad na pregled vozila
                                    </button>
                                </Link>
                            </div>

                            {this.state.loading2 ? (
                                <Loading />
                            ) : (
                                <div className="agency-preview">
                                    <Form
                                        style={{
                                            width: "100%",
                                            padding: "2rem",
                                        }}
                                    >
                                        <FormGroup
                                            row
                                            style={{ width: "100%" }}
                                        >
                                            <Label for="report_type" sm={2}>
                                                Vrsta izveštaja
                                            </Label>
                                            <Col sm={10}>
                                                <Input
                                                    type="select"
                                                    name="report_type"
                                                    id="report_type"
                                                    value={
                                                        this.state.report_type
                                                    }
                                                    onChange={this.handleChange}
                                                >
                                                    <option value="" disabled>
                                                        Vrsta izveštaja
                                                    </option>
                                                    <option value="1">
                                                        Izveštaj prema
                                                        rezervacijama
                                                    </option>
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup
                                            row
                                            style={{ width: "100%" }}
                                        >
                                            <Label for="reports" sm={2}>
                                                Odaberi vozilo:
                                            </Label>
                                            {this.props.vehicles.length !==
                                            0 ? (
                                                <Col sm={10}>
                                                    <Input
                                                        type="select"
                                                        name="name"
                                                        id="name"
                                                        value={this.state.name}
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            Odaberi vozilo
                                                        </option>
                                                        <option value="all">
                                                            Sva vozila
                                                        </option>
                                                        {this.props.vehicles.map(
                                                            (vehicle) => {
                                                                return (
                                                                    <option
                                                                        key={
                                                                            vehicle.id
                                                                        }
                                                                    >
                                                                        {
                                                                            vehicle.name
                                                                        }
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </Input>
                                                </Col>
                                            ) : (
                                                <div>
                                                    Trenutno ne postoji nijedno
                                                    vozilo u agenciji.
                                                </div>
                                            )}
                                        </FormGroup>
                                        <FormGroup>
                                            <Col sm={6} className="p-3">
                                                <DatePicker
                                                    // selected={startDate}
                                                    locale="sr"
                                                    maxDate={new Date()}
                                                    onChange={this.onChangeFrom}
                                                    value={this.state.fromDate}
                                                    dayPlaceholder={"dd"}
                                                    monthPlaceholder={"mm"}
                                                    yearPlaceholder={"yyyy"}
                                                    className="date-picker"
                                                    format={"dd.MM.yyyy"}
                                                    clearIcon={null}
                                                    // customInput={<ExampleCustomInput />}
                                                />
                                                <DatePicker
                                                    // selected={startDate}
                                                    locale="sr"
                                                    maxDate={new Date()}
                                                    onChange={this.onChangeTo}
                                                    value={this.state.toDate}
                                                    dayPlaceholder={"dd"}
                                                    monthPlaceholder={"mm"}
                                                    yearPlaceholder={"yyyy"}
                                                    className="date-picker"
                                                    format={"dd.MM.yyyy"}
                                                    clearIcon={null}
                                                    // customInput={<ExampleCustomInput />}
                                                />
                                            </Col>
                                            <Col sm={6} className="p-3">
                                                <Button
                                                    className="btn-primary btn-small btn-green"
                                                    onClick={() =>
                                                        this.getReports()
                                                    }
                                                    style={{
                                                        padding: "7px 25px",
                                                    }}
                                                    color="success"
                                                >
                                                    Filtriraj
                                                </Button>{" "}
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                    <Col xs={12} className="p-3">
                                        {this.state.loading ? (
                                            <Loading />
                                        ) : this.state.tableShow ? (
                                            <PdfComponent
                                                reports={this.props.reports}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </Col>
                                </div>
                            )}
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
