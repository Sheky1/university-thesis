import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

import { useSelector } from "react-redux";

const Header = () => {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const logoutUser = () => {
    // dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <header className="header">
        <Container fluid>
          <Row style={{ width: "100%" }}>
            <Col lg={{ size: "auto", offset: 6 }}>
              <div className="header-right full-height">
                <p>{user.loggedUser.name}</p>
                <button className="btn-primary btn-small" onClick={logoutUser}>
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
