import React from 'react';
import NavBar from '../NavBar/NavBar';
import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Header(props) {

    const { pathname } = useLocation()


    return (
        <header className={`header ${pathname === '/' || pathname === '/movies-explorer-frontend/' ? "" : "header_white"} ${pathname === "/404" ||
            pathname === "/sign-up" ||
            pathname === "/*" ||
            pathname === "/sign-in" ? "header_display-none" : ""}`}>
            <Link to="/" className="header__logo-link"><button className="header__logo-button"></button></Link>
            {props.loggedIn ? (
                <>
                    <nav className="header__container header__container_display-none">
                        <NavLink
                            to="/movies"
                            className={`header__authorized-link ${pathname === '/movies' ? 'active-link' : ''}
                            ${pathname === '/' ? "" : "header_black-text"}`}
                        >
                            Фильмы
                        </NavLink>
                        <NavLink
                            to="/saved-movies"
                            className={`header__authorized-link ${pathname === '/saved-movies' ? 'active-link' : ''}
                            ${pathname === '/' ? "" : "header_black-text"}`}
                        >
                            Сохраненные фильмы
                        </NavLink>
                    </nav>

                </>
            ) : (
                <>
                    <nav className="header__container">
                        <NavBar name={"Регистрация"} path={"sign-up"} className={`header__unauthorized-link`} />
                        <NavBar name={"Войти"} path={"sign-in"} className={"header__unauthorized-button"} />
                    </nav>
                </>
            )}

            {
                props.loggedIn ? (
                    <>
                        <Link className="header__profile-link" to="/profile">
                            <button className={`header__profile-link-image ${pathname === '/' ? "header__profile-link-image_green" : ""}`}></button>
                        </Link>

                        <button onClick={props.openPopupProfile}
                            className={`header__menu-button ${pathname === '/' ? "" : "header__menu-button_black"}`}></button>
                    </>
                ) : (
                    <>

                    </>
                )
            }
        </header >
    );
}

export default Header;
