import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FaList, FaSignOutAlt } from "react-icons/fa";

import { useSelector } from "react-redux";

// class Header extends Component {
//     logout = () => {
//         this.props.logout();
//         localStorage.removeItem("token");
//         this.props.history.push("/");
//     };

//     componentDidMount() {
//         if (!localStorage.token) {
//             return <Redirect to="/" />;
//         } else {
//             this.props.getUserData();
//         }
//     }

//     render() {
//         return (
//             <>
//                 <header className="header">
//                     <Container fluid>
//                         <Row style={{ width: "100%" }}>
//                             <Col xs="6">
//                                 <button
//                                     color="primary"
//                                     onClick={this.props.toggle}
//                                     className="btn-primary btn-small btn-hidden"
//                                     style={{
//                                         marginBottom: "1rem",
//                                         padding: "5px 10px",
//                                     }}
//                                 >
//                                     <FaList />
//                                 </button>
//                             </Col>
//                             <Col xs="6">
//                                 <div className="header-right full-height">
//                                     <p>{this.props.user.loggedUser.username}</p>
//                                     <button
//                                         className="btn-primary btn-small"
//                                         onClick={this.logout}
//                                     >
//                                         <span>
//                                             <FaSignOutAlt />
//                                         </span>{" "}
//                                         Logout
//                                     </button>
//                                 </div>
//                             </Col>
//                         </Row>
//                     </Container>
//                 </header>
//             </>
//         );
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         user: state.user,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         logout: () => dispatch(actions.logout()),
//         getUserData: () => dispatch(actions.getUserData()),
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));

const Header = ({ toggle }) => {
	//   const dispatch = useDispatch();
	const navigate = useNavigate();
	const [user, setUser] = useState({});

	const logoutUser = () => {
		// dispatch(logout());
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		navigate("/");
	};

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/");
		} else {
			setUser(JSON.parse(localStorage.getItem("user")));
		}
	}, []);

	return (
		<>
			<header className="header">
				<Container fluid>
					<Row style={{ width: "100%" }}>
						<Col xs="6">
							<button
								color="primary"
								onClick={toggle}
								className="btn-primary btn-small btn-hidden"
								style={{
									marginBottom: "1rem",
									padding: "5px 10px",
								}}
							>
								<FaList />
							</button>
						</Col>
						<Col xs="6">
							<div className="header-right full-height">
								<p>{user.username}</p>
								<button
									className="btn-primary btn-small"
									onClick={logoutUser}
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
};

export default Header;
