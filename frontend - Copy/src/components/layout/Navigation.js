import React, { useState } from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import {
    // FaChartBar,
    FaCar,
    FaPlus,
    // FaQuestionCircle,
    // FaHandsHelping,
    FaBookOpen,
    FaCartPlus,
    FaExpandArrowsAlt,
    FaGasPump,
    FaChartLine,
} from "react-icons/fa";
import AddVehicleModal from "../modals/AddVehicleModal";

export default function Navigation() {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    return (
        <>
            <AddVehicleModal modal={modal} toggle={toggle} />
            <div className="navbar">
                <nav className="navbar__nav">
                    <div className="navbar-logo">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <ul className="navbar__list">
                        <li className="navbar__item">
                            <Link to="/home-agency/" className="navbar__link">
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
                                className="navbar__link"
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
                                className="navbar__link"
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
                                className="navbar__link"
                            >
                                <span>
                                    <FaExpandArrowsAlt />
                                </span>
                                Velicine
                            </Link>
                        </li>
                        <li className="navbar__item">
                            <Link
                                to="/home-agency/fuel/"
                                className="navbar__link"
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
                                className="navbar__link"
                            >
                                <span>
                                    <FaChartLine />
                                </span>
                                Izvestaji
                            </Link>
                        </li>
                        {/* <li className="navbar__item">
                            <button className="navbar__link">
                                <span>
                                    <FaChartBar />
                                </span>
                                Statistika
                            </button>
                        </li> */}
                        {/* <hr />
                        <li className="navbar__item">
                            <button className="navbar__link">
                                <span>
                                    <FaQuestionCircle />
                                </span>
                                Help
                            </button>
                        </li>
                        <li className="navbar__item">
                            <button className="navbar__link">
                                <span>
                                    <FaHandsHelping />
                                </span>
                                Podrska
                            </button>
                        </li> */}
                    </ul>
                </nav>
            </div>
        </>
    );
}
