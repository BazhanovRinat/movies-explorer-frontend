import React from 'react';
import NavBar from '../NavBar/NavBar';
import header__logo from '../../images/header__logo.svg';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Header(props) {

    const { pathname } = useLocation()

    return (
        <header className={`header ${pathname === '/' ? "" : "header_white"} ${pathname === "/404" ? "header_display-none" : ""}`}>
            <NavBar name={""} path={""} className={"header__logo"} />
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
                        <NavBar path={"profile"} className={"header__profile-link"} />
                        <button onClick={props.openPopupProfile}
                            className={`header__menu-button ${pathname === '/' ? "" : "header__menu-button_black"}`}></button>
                    </>
                )
            }
        </header >
    );
}

export default Header;
