import React, { useEffect, useState } from "react";
import logo from "../../images/renter_full_color.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { connect, useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import ErrorModal from "../../components/modals/ErrorModal";
import { useNavigate } from "react-router-dom";
import { initiateLogin } from "../../store/actions/index";

// class Login extends React.Component {
// 	state = {
// 		username: "",
// 		password: "",
// 		errorModal: false,
// 	};

// 	toggleError = () => this.setErrorModal(!this.state.errorModal);

// 	setErrorModal = (errorModal) => {
// 		this.setState({
// 			errorModal,
// 		});
// 	};

// 	handleChange = (event) => {
// 		const { name, value } = event.target;

// 		this.setState({
// 			[name]: value,
// 		});
// 	};

// 	onLogin = (event) => {
// 		event.preventDefault();
// 		this.props.initiateLogin({
// 			username: this.state.username,
// 			password: this.state.password,
// 		});
// 		setTimeout(() => {
// 			if (this.props.user.isLogged === false) this.toggleError();
// 		}, 1200);
// 	};

// 	componentDidMount() {
// 		var htmlInput = document.getElementById("unos-ime");
// 		htmlInput.oninvalid = function (e) {
// 			e.target.setCustomValidity("Neophodno je uneti korisničko ime.");
// 		};
// 		htmlInput.oninput = function (e) {
// 			e.target.setCustomValidity("");
// 		};
// 		var htmlInput2 = document.getElementById("unos-sifra");
// 		htmlInput2.oninvalid = function (e) {
// 			e.target.setCustomValidity("Neophodno je uneti šifru.");
// 		};
// 		htmlInput2.oninput = function (e) {
// 			e.target.setCustomValidity("");
// 		};
// 	}

// 	render() {
// 		return (
// 			<>
// 				<ErrorModal
// 					modal={this.state.errorModal}
// 					toggle={this.toggleError}
// 					text="Podaci koje ste uneli nisu validni."
// 				/>
// 				<div className="login">
// 					<Container
// 						fluid
// 						style={{ paddingLeft: 0, paddingRight: 0 }}
// 					>
// 						<Row className="width-100">
// 							<Col lg="12" className="px-0">
// 								<div className="login-logo">
// 									<img
// 										src={logo}
// 										alt=""
// 										className="login-logo"
// 									/>
// 								</div>
// 								<form
// 									action=""
// 									className="login-form"
// 									onSubmit={(event) => this.onLogin(event)}
// 								>
// 									{/* <h1>Renter login</h1>
//                                     <div className="login-line"></div>
//                                     <h4>Dobrodošli!</h4> */}

// 									<input
// 										type="text"
// 										name="username"
// 										id="unos-ime"
// 										placeholder="Unesite korisničko ime"
// 										onChange={this.handleChange}
// 										required
// 									/>

// 									<input
// 										type="password"
// 										name="password"
// 										id="unos-sifra"
// 										placeholder="Unesite šifru"
// 										onChange={this.handleChange}
// 										required
// 									/>

// 									<button
// 										className="btn-primary"
// 										type="submit"
// 									>
// 										Potvrdi
// 									</button>
// 								</form>
// 							</Col>
// 						</Row>
// 					</Container>
// 				</div>
// 			</>
// 		);
// 	}
// }

// const mapStateToProps = (state) => {
// 	return {
// 		user: state.user,
// 	};
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		initiateLogin: (user) => dispatch(actions.initiateLogin(user)),
// 	};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const [errorModal, setErrorModal] = useState(false);

	const [initialState, setInitialState] = useState({
		username: "",
		password: "",
	});

	const toggleError = () => setErrorModal(!errorModal);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setInitialState({
			...initialState,
			[name]: value,
		});
	};

	const loginUser = (event) => {
		event.preventDefault();
		dispatch(
			initiateLogin({
				...initialState,
				navigate: navigate,
			})
		);
		setTimeout(() => {
			if (user.isLogged === false) toggleError();
		}, 200);
	};

	useEffect(() => {
		var htmlInput = document.getElementById("unos-ime");
		htmlInput.oninvalid = function (e) {
			e.target.setCustomValidity("Neophodno je uneti korisničko ime.");
		};
		htmlInput.oninput = function (e) {
			e.target.setCustomValidity("");
		};
		var htmlInput2 = document.getElementById("unos-sifra");
		htmlInput2.oninvalid = function (e) {
			e.target.setCustomValidity("Neophodno je uneti šifru.");
		};
		htmlInput2.oninput = function (e) {
			e.target.setCustomValidity("");
		};
	}, []);

	return (
		<>
			<ErrorModal
				modal={errorModal}
				toggle={toggleError}
				text="Podaci koje ste uneli nisu validni."
			/>
			<div className="login">
				<Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
					<Row className="width-100">
						<Col lg="12" className="px-0">
							<div className="login-logo">
								<img src={logo} alt="" className="login-logo" />
							</div>
							<form
								action=""
								className="login-form"
								onSubmit={loginUser}
							>
								{/* <h1>Renter login</h1>
                                            <div className="login-line"></div>
                                            <h4>Dobrodošli!</h4> */}

								<input
									type="text"
									name="username"
									id="unos-ime"
									placeholder="Unesite korisničko ime"
									onChange={handleChange}
									required
								/>

								<input
									type="password"
									name="password"
									id="unos-sifra"
									placeholder="Unesite šifru"
									onChange={handleChange}
									required
								/>

								<button className="btn-primary" type="submit">
									Potvrdi
								</button>
							</form>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
};

export default Login;
