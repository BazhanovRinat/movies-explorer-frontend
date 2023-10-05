import React from 'react';
import NavBar from '../NavBar/NavBar';
import header__logo from '../../images/header__logo.svg';

function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={header__logo} alt="Логотип" />

            {props.loggedIn ? (
                <>
                    <nav className="header__container">
                        <NavBar name={"Регистрация"} path={"sign-up"} className={"header__unauthorized-link"} />
                        <NavBar name={"Войти"} path={"sign-in"} className={"header__unauthorized-button"} />
                    </nav>
                </>
            ) : (
                <>
                    <nav className="header__container header__container_display-none">
                        <NavBar name={"Фильмы"} path={"movies"} className={"header__authorized-link"} />
                        <NavBar name={"Сохраненные фильмы"} path={"saved-movies"} className={"header__authorized-link"} />
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
                        <button className="header__menu-button"></button>
                    </>
                )
            }
        </header >
    );
}

export default Header;
