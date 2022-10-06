import React, { useState } from "react";
import logo from "../../images/renter_full_color.png";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import {
    FaCar,
    FaPlus,
    FaBookOpen,
    FaCartPlus,
    FaExpandArrowsAlt,
    FaGasPump,
    FaChartLine,
} from "react-icons/fa";
import AddVehicleModal from "../modals/AddVehicleModal";

export default function Navigation(props) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const classForButton = window.location.pathname;

    return (
        <>
            <AddVehicleModal modal={modal} toggle={toggle} />
            <div className="navbar">
                <nav className="navbar__nav">
                    <Button onClick={props.toggle} className="close">
                        x
                    </Button>
                    <div className="navbar-logo">
                        <Link to="/home-agency/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <ul className="navbar__list">
                        <li className="navbar__item">
                            <Link
                                to="/home-agency/"
                                className={
                                    classForButton === "/home-agency/"
                                        ? "navbar__link navbar__link__active"
                                        : "navbar__link"
                                }
                            >
                                <span>
                                    <FaCar />
                                </span>
                                Sva vozila
                            </Link>
                        </li>
                        <li className="navbar__item">
                            <button className="navbar__link" onClick={toggle}>
                                <span>
                                    <FaPlus />
                                </span>
                                Dodaj vozilo
                            </button>
                        </li>
                        <hr />
                        <li className="navbar__item">
                            <Link
                                to="/home-agency/reservations/"
                                className={
                                    classForButton ===
                                    "/home-agency/reservations/"
                                        ? "navbar__link navbar__link__active"
                                        : "navbar__link"
                                }
                                onClick={
                                    classForButton ===
                                    "/home-agency/reservations/"
                                        ? () => {
                                              window.location.reload();
                                          }
                                        : () => {}
                                }
                            >
                                <span>
                                    <FaBookOpen />
                                </span>
                                Rezervacije
                            </Link>
                        </li>
                        <hr />
                        <li className="navbar__item">
                            <Link
                                to="/home-agency/additions/"
                                className={
                                    classForButton === "/home-agency/additions/"
                                        ? "navbar__link navbar__link__active"
                                        : "navbar__link"
                                }
                            >
                                <span>
                                    <FaCartPlus />
                                </span>
                                Dodaci
                            </Link>
                        </li>
                        <li className="navbar__item">
                            <Link
                                to="/home-agency/sizes/"
                                className={
                                    classForButton === "/home-agency/sizes/"
                                        ? "navbar__link navbar__link__active"
                                        : "navbar__link"
                                }
                            >
                                <span>
                                    <FaExpandArrowsAlt />
                                </span>
                                Veličine
                            </Link>
                        </li>
                        <li className="navbar__item">
                            <Link
                                to="/home-agency/fuel/"
                                className={
                                    classForButton === "/home-agency/fuel/"
                                        ? "navbar__link navbar__link__active"
                                        : "navbar__link"
                                }
                            >
                                <span>
                                    <FaGasPump />
                                </span>
                                Vrste goriva
                            </Link>
                        </li>
                        <hr />
                        <li className="navbar__item">
                            <Link
                                to="/home-agency/reports/"
                                className={
                                    classForButton === "/home-agency/reports/"
                                        ? "navbar__link navbar__link__active"
                                        : "navbar__link"
                                }
                                onClick={
                                    classForButton === "/home-agency/reports/"
                                        ? () => {
                                              window.location.reload();
                                          }
                                        : () => {}
                                }
                            >
                                <span>
                                    <FaChartLine />
                                </span>
                                Izveštaji
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
