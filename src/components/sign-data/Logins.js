import NavBar from '../NavBar/NavBar';
import signDataLogo from '../../images/header__logo.svg';
import { Link } from "react-router-dom";

function Login() {
    return (
        <main className="sign-data">
            <Link className="sign-data__logo-link" to={'/'}><button className="sign-data__logo-button"></button></Link>
            <h1 className="sign-data__title">Рады видеть!</h1>
            <form className="sign-data__form">
                <label className="sign-data__label">E-mail</label>
                <input placeholder="E-mail" minLength={2} maxLength={30} required className="sign-data__input" type="email"></input>
                <span className="sign-data__input-error"></span>
                <label className="sign-data__label">Пароль</label>
                <input placeholder="Пароль" minLength={2} maxLength={30} required className="sign-data__input" type="password"></input>
                <span className="sign-data__input-error"></span>
                <button className="sign-data__submit sign-data__login-submit" type="submit">Войти</button>
            </form>
            <p className="sign-data__text-under-submit ">Еще не зарегистрированы? <NavBar
                name={"Регистрация"} path={"sign-up"} className={"sign-data__link-under-submit"} />
            </p>
        </main>
    );
}

export default Login;