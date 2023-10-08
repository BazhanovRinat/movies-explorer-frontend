import NavBar from '../NavBar/NavBar';
import signDataLogo from '../../images/header__logo.svg';
import { Link } from "react-router-dom";

function Register() {
    return (
        <main className="sign-data">
            <Link className="sign-data__logo-link" to={'/'}><img src={signDataLogo} className="sign-data__logo" alt="Логотип"></img></Link>
            <h1 className="sign-data__title">Добро пожаловать!</h1>
            <form className="sign-data__form">
                <label className="sign-data__label">Имя</label>
                <input placeholder="Имя" minLength={2} maxLength={30} required className="sign-data__input"   ></input>
                <span className="sign-data__input-error"></span>
                <label className="sign-data__label">E-mail</label>
                <input placeholder="E-mail" minLength={2} maxLength={30} required className="sign-data__input" type="email"></input>
                <span className="sign-data__input-error"></span>
                <label className="sign-data__label">Пароль</label>
                <input placeholder="Пароль" minLength={2} maxLength={30} required className="sign-data__input" type="password"></input>
                <span className="sign-data__input-error">Что-то пошло не так...</span>
                <button className="sign-data__submit" type="submit">Зарегистрироваться</button>
            </form>
            <p className="sign-data__text-under-submit">Уже зарегистрированы? <NavBar
                name={"Войти"} path={"sign-in"} className={"sign-data__link-under-submit"} />
            </p>

        </main>
    );
}

export default Register;