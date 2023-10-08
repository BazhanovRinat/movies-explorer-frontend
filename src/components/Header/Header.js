import React from 'react';
import NavBar from '../NavBar/NavBar';
import header__logo from '../../images/header__logo.svg';
import profileGreen from '../../images/profile-green.svg'
import profileWhite from "../../images/profile-white.svg"
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Header(props) {

    const { pathname } = useLocation()
  
    return (
        <header className={`header ${pathname === '/' ? "" : "header_white"} ${pathname === "/404" ||
            pathname === "/sign-up" ||
            pathname === "/sign-in" ? "header_display-none" : ""}`}>
            <Link to="/" className="header__logo-link"><button className="header__logo-button"></button></Link>
            {props.loggedIn ? (
                <>
                    <nav className="header__container">
                        <NavBar name={"Регистрация"} path={"sign-up"} className={`header__unauthorized-link`} />
                        <NavBar name={"Войти"} path={"sign-in"} className={"header__unauthorized-button"} />
                    </nav>
                </>
            ) : (
                <>
                    <nav className="header__container header__container_display-none">
                        <NavBar name={"Фильмы"} path={"movies"} className={
                            `header__authorized-link ${pathname === '/' ? "" : "header_black-text"}`
                        } />
                        <NavBar name={"Сохраненные фильмы"} path={"saved-movies"} className={
                            `header__authorized-link ${pathname === '/' ? "" : "header_black-text"}`
                        } />
                    </nav>
                </>
            )}

            {
                props.loggedIn ? (
                    <>
                    </>
                ) : (
                    <>
                        <Link className="header__profile-link" to="/profile">
                            <button className={`header__profile-link-image ${pathname === '/' ? "header__profile-link-image_green" : ""}`}></button>
                        </Link>

                        <button onClick={props.openPopupProfile}
                            className={`header__menu-button ${pathname === '/' ? "" : "header__menu-button_black"}`}></button>
                    </>
                )
            }
        </header >
    );
}

export default Header;
