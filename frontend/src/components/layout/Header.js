import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { withRouter, Navigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import * as actions from "../../store/actions/index";

import { connect } from "react-redux";

class Header extends Component {
	logout = () => {
		this.props.logout();
		localStorage.removeItem("token");
		this.props.history.push("/");
	};

	componentDidMount() {
		if (!localStorage.token) {
			return <Navigate to="/" />;
		} else {
			this.props.getUserData();
		}
	}

	render() {
		return (
			<>
				<header className="header">
					<Container fluid>
						<Row style={{ width: "100%" }}>
							<Col lg={{ size: "auto", offset: 6 }}>
								<div className="header-right full-height">
									<p>{this.props.user.loggedUser.name}</p>
									<button
										className="btn-primary btn-small"
										onClick={this.logout}
									>
										<span>
											<FaSignOutAlt />
										</span>{" "}
										Logout
									</button>
								</div>
							</Col>
						</Row>
					</Container>
				</header>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(actions.logout()),
		getUserData: () => dispatch(actions.getUserData()),
	};
};

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
export default connect(mapStateToProps, mapDispatchToProps)(Header);
