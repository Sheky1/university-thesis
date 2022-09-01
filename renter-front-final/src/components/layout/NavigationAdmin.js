import React, { useState } from "react";
import logo from "../../images/renter_full_color.png";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import {
    FaPlus,
    FaHeadset,
    FaCity,
    FaChartLine,
    FaDollarSign,
} from "react-icons/fa";
import AddAgencyModal from "../modals/AddAgencyModal";

export default function NavigationAdmin(props) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const classForButton = window.location.pathname;

    return (
        <>
            <AddAgencyModal modal={modal} toggle={toggle} />
            <div className="navbar">
                <nav className="navbar__nav">
                    <Button onClick={props.toggle} className="close">
                        x
                    </Button>
                    <div className="navbar-logo">
                        <Link to="/home-admin/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <ul className="navbar__list">
                        <li className="navbar__item">
                            <Link
                                to="/home-admin/"
                                className={
                                    classForButton === "/home-admin/"
                                        ? "navbar__link navbar__link__active"
                                        : "navbar__link"
                                }
                            >
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
                                className={
                                    classForButton === "/home-admin/cities/"
                                        ? "navbar__link navbar__link__active"
                                        : "navbar__link"
                                }
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
                                className={
                                    classForButton === "/home-admin/currencies/"
                                        ? "navbar__link navbar__link__active"
                                        : "navbar__link"
                                }
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
                                className={
                                    classForButton === "/home-admin/reports/"
                                        ? "navbar__link navbar__link__active"
                                        : "navbar__link"
                                }
                                onClick={
                                    classForButton === "/home-admin/reports/"
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
