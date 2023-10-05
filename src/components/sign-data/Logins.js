import NavBar from '../NavBar/NavBar';
import signDataLogo from '../../images/header__logo.svg';

function Login() {
    return (
        <section className="sign-data">
            <img src={signDataLogo} className="sign-data__logo" alt="Логотип"></img>
            <h2 className="sign-data__title">Рады видеть!</h2>
            <form className="sign-data__form">
                <label className="sign-data__label">E-mail</label>
                <input className="sign-data__input"></input>
                <span className="sign-data__input-error"></span>
                <label className="sign-data__label">Пароль</label>
                <input className="sign-data__input"></input>
                <span className="sign-data__input-error"></span>
                <button className="sign-data__submit sign-data__login-submit" type="submit">Войти</button>
            </form>
            <p className="sign-data__text-under-submit ">Еще не зарегистрированы? <NavBar
                name={"Регистрация"} path={"sign-up"} className={"sign-data__link-under-submit"} />
            </p>
        </section>
    );
}

export default Login;