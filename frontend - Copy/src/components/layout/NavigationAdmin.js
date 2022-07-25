import React, { useState } from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import {
    // FaChartBar,
    FaPlus,
    // FaQuestionCircle,
    // FaHandsHelping,
    FaHeadset,
    FaCity,
    FaChartLine,
    FaDollarSign,
} from "react-icons/fa";
import AddAgencyModal from "../modals/AddAgencyModal";

export default function NavigationAdmin() {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    return (
        <>
            <AddAgencyModal modal={modal} toggle={toggle} />
            <div className="navbar">
                <nav className="navbar__nav">
                    <div className="navbar-logo">
                        <Link to="/home-admin/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <ul className="navbar__list">
                        <li className="navbar__item">
                            <Link to="/home-admin/" className="navbar__link">
                                <span>
                                    <FaHeadset />
                                </span>
                                Sve agencije
                            </Link>
                        </li>
                        <li className="navbar__item">
                            <button className="navbar__link" onClick={toggle}>
                                <span>
                                    <FaPlus />
                                </span>
                                Dodaj agenciju
                            </button>
                        </li>
                        <hr />
                        <li className="navbar__item">
                            <Link
                                to="/home-admin/cities/"
                                className="navbar__link"
                            >
                                <span>
                                    <FaCity />
                                </span>
                                Gradovi
                            </Link>
                        </li>
                        <li className="navbar__item">
                            <Link
                                to="/home-admin/currencies/"
                                className="navbar__link"
                            >
                                <span>
                                    <FaDollarSign />
                                </span>
                                Valute
                            </Link>
                        </li>
                        <hr />
                        <li className="navbar__item">
                            <Link
                                to="/home-admin/reports/"
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
                        </li>
                        <hr />
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
