import React, { useState } from "react";
import logo from "../../images/logo.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { connect, useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";
import { useNavigate } from "react-router-dom";
import { initiateLogin } from "../../store/actions/index";

// class Login extends React.Component {
//   state = {
//     username: "",
//     password: "",
//   };

//   handleChange = (event) => {
//     const { name, value } = event.target;

//     this.setState({
//       [name]: value,
//     });
//   };

//   render() {
//     return (
//       <>
//         <div className="login">
//           <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
//             <Row className="width-100">
//               <Col lg="12" className="px-0">
//                 <div className="login-logo">
//                   <img src={logo} alt="" className="login-logo" />
//                 </div>
//                 <form
//                   action=""
//                   className="login-form"
//                   onSubmit={(event) => {
//                     event.preventDefault();
//                     return this.props.initiateLogin({
//                       username: this.state.username,
//                       password: this.state.password,
//                       history: this.props.history,
//                     });
//                   }}
//                 >
//                   <h1>Renter login</h1>
//                   <div className="login-line"></div>
//                   <h4>Dobrodosli!</h4>

//                   <input
//                     type="text"
//                     name="username"
//                     placeholder="Unesite korisnicko ime"
//                     onChange={this.handleChange}
//                     required
//                   />

//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="Unesite sifru"
//                     onChange={this.handleChange}
//                     required
//                   />

//                   <button className="btn-primary" type="submit">
//                     Potvrdi
//                   </button>
//                 </form>
//               </Col>
//             </Row>
//           </Container>
//         </div>
//       </>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     initiateLogin: (user) => dispatch(actions.initiateLogin(user)),
//   };
// };

// export default connect(null, mapDispatchToProps)(Login);

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [initialState, setInitialState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInitialState({
      ...initialState,
      [name]: value,
    });
  };

  return (
    <>
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
                onSubmit={(event) => {
                  event.preventDefault();
                  dispatch(
                    initiateLogin({
                      ...initialState,
                      navigate: navigate,
                    })
                  );
                }}
              >
                <h1>Renter login</h1>
                <div className="login-line"></div>
                <h4>Dobrodosli!</h4>

                <input
                  type="text"
                  name="username"
                  placeholder="Unesite korisnicko ime"
                  onChange={handleChange}
                  required
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Unesite sifru"
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
