import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Header from "../../components/layout/Header";
import NavigationAdmin from "../../components/layout/NavigationAdmin";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import CityList from "../../components/bonuses/CityList";
import Pagination from "react-js-pagination";

import { connect } from "react-redux";
import AddCityModal from "../../components/modals/AddCityModal";
import { api_axios } from "../../api/api";
import Loading from "../../components/layout/Loading";
import ErrorModal from "../../components/modals/ErrorModal";
import { handleErrors } from "../../store/utilities";

class Cities extends Component {
  _isMounted = false;
  state = {
    modal: false,
    errorModal: false,
    errorText: "",
    cities: [],
    loading: true,
    name: "",
    current_page: 1,
    total: 1,
    per_page: 12,
  };

  toggle = () => this.setModal(!this.state.modal);

  setModal = (modal) => {
    if (this._isMounted) {
      this.setState({
        modal,
      });
    }
  };

  toggleError = () => this.setErrorModal(!this.state.errorModal);

  setErrorModal = (errorModal) => {
    if (this._isMounted) {
      this.setState({
        errorModal,
      });
    }
  };

  getCities = async (pageNumber) => {
    try {
      // const response = await api_axios(
      //   "get",
      //   `/cities?page=${pageNumber}&per_page=${this.state.per_page}`,
      //   null
      // );
      const response = await api_axios("get", `/cities`, null);
      if (this._isMounted) {
        const cities = response.data;
        // const { current_page, total } = response.data.meta;
        // this.setState({
        //   cities,
        //   current_page,
        //   total,
        //   loading: false,
        // });
        this.setState({
          cities,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
      handleErrors(error);
    }
  };

  submitForm = async () => {
    // if (this.state.name !== "") {
    try {
      if (this._isMounted) {
        const response = await api_axios(
          "post",
          `/cities?name=${this.state.name}`,
          null
        );
        this.toggle();
        this.setState({
          name: "",
          cities: [...this.state.cities, response.data],
        });
      }
    } catch (error) {
      this.setState({
        errorText: "Neophodno je da unese naziv za grad!",
      });
      this.toggleError();
      console.log(error);
      handleErrors(error);
    }
    // } else {
    //     this.setState({
    //         errorText: "Neophodno je da unese naziv za grad!",
    //     });
    //     this.toggleError();
    // }
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    if (this._isMounted) {
      this.setState({
        [name]: value,
      });
    }
  };

  deleteItem = async (id) => {
    try {
      if (this._isMounted) {
        await api_axios("delete", `/cities/${id}`, null);
        this.setState({
          cities: [...this.state.cities.filter((city) => city.id !== id)],
        });
      }
    } catch (error) {
      this.setState({
        errorText: error.response.data.error,
      });
      this.toggleError();
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this.getCities();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <>
        <AddCityModal
          modal={this.state.modal}
          toggle={this.toggle}
          submitForm={this.submitForm}
          handleChange={this.handleChange}
          toggleError={this.toggleError}
          errorModal={this.state.errorModal}
          errorText={this.state.errorText}
        />
        <ErrorModal
          modal={this.state.errorModal}
          toggle={this.toggleError}
          text={this.state.errorText}
        />
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Row style={{ width: "100%", margin: 0 }}>
            <Col xs="2" className="px-0">
              <NavigationAdmin />
            </Col>
            <Col xs="10" className="px-0">
              <Header />
              <div className="top-banner">
                <p>Gradovi</p>

                <div>
                  <button
                    className="btn-primary btn-small"
                    style={{
                      marginRight: "15px",
                      backgroundColor: "#16b841",
                    }}
                    onClick={this.toggle}
                  >
                    <span>
                      <FaPlus />
                    </span>{" "}
                    Novi grad
                  </button>
                </div>

                <Link to="/home-admin/">
                  <button className="btn-primary btn-small">
                    <span>
                      <FaArrowLeft />
                    </span>{" "}
                    Nazad na pregled agencija
                  </button>
                </Link>
              </div>
              {this.state.loading ? (
                <Loading />
              ) : this.state.cities.length === 0 ? (
                <h2 style={{ margin: "20px" }}>
                  Trenutno ne postoji nijedan grad.
                </h2>
              ) : (
                <>
                  {" "}
                  <CityList
                    cities={this.state.cities}
                    deleteItem={this.deleteItem}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Pagination
                      activePage={this.state.current_page}
                      totalItemsCount={this.state.total}
                      itemsCountPerPage={this.state.per_page}
                      onChange={(pageNumber) => this.getCities(pageNumber)}
                      itemClass="page-item"
                      linkClass="page-link"
                      firstPageText="First"
                      lastPageText="Last"
                    />
                  </div>
                </>
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
    cities: state.user.cities,
  };
};

export default connect(mapStateToProps, null)(Cities);
