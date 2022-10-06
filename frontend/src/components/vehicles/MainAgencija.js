import React, { Component } from "react";
import Vehicles from "./Vehicles";
import { FaPlus } from "react-icons/fa";
import Loading from "../layout/Loading";
import AddVehicleModal from "../modals/AddVehicleModal";

import { connect } from "react-redux";
import { api_axios, params_axios } from "../../api/api";
import * as actions from "../../store/actions/index";
import { handleErrors } from "../../store/utilities";
import Pagination from "react-js-pagination";

class MainAgencija extends Component {
	_isMounted = false;
	state = {
		loading: true, // pogledaj redux projekat na yt ima na 4+ sati o tome (kada se cekaju api calls)
		modal: false,
		modalEdit: false,
		current_page: 1,
		total: 1,
		per_page: 12,
		last_page: 0,
	};

	toggle = () => this.setModal(!this.state.modal);

	setModal = (modal) => {
		if (this._isMounted) {
			this.setState({
				modal,
			});
		}
	};

	getVehicles = async (pageNumber) => {
		try {
			if (this._isMounted) {
				// const params = {
				//     page: pageNumber,
				//     per_page: this.state.per_page,
				//     sort_column: "created_at",
				//     sort_direction: "desc",
				// };
				// const response = await params_axios(`/vehicles`, params);
				// const response = await api_axios(
				//     "get",
				//     `/vehicles?page=${pageNumber}&per_page=${this.state.per_page}`,
				//     null
				// );
				const response = await api_axios("get", `/vehicles`, null);
				this.props.getVehicles(response.data);
				// const { current_page, total, last_page } = response.data.meta;
				this.setState({
					// current_page,
					// total,
					// last_page,
					loading: false,
				});
			}
		} catch (error) {
			console.log(error);
			handleErrors(error);
		}
	};

	componentDidMount() {
		this._isMounted = true;
		this.getVehicles();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return (
			<>
				<AddVehicleModal
					modal={this.state.modal}
					toggle={this.toggle}
				/>
				<main className="main">
					<div className="top-banner">
						<p>Prikaz svih vozila</p>
						<button
							className="btn-primary btn-small"
							style={{
								backgroundColor: "#16b841",
								gridColumn: "2",
							}}
							onClick={this.toggle}
						>
							<span>
								<FaPlus />
							</span>{" "}
							Dodaj vozilo
						</button>
					</div>
					{this.state.loading ? (
						<Loading />
					) : (
						<>
							<Vehicles vehicles={this.props.vehicles} />
							{this.props.vehicles.length > 1 ? (
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
										onChange={(pageNumber) =>
											this.getVehicles(pageNumber)
										}
										itemClass="page-item"
										linkClass="page-link"
										firstPageText="Prva Stranica"
										lastPageText="Poslednja stranica"
									/>
								</div>
							) : (
								<></>
							)}
						</>
					)}
				</main>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		vehicles: state.vehicles,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getVehicles: (vehicles) => dispatch(actions.getVehicles(vehicles)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainAgencija);
