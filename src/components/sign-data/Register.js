import NavBar from '../NavBar/NavBar';
import signDataLogo from '../../images/header__logo.svg';

function Register() {
    return (
        <main className="sign-data">
            <img src={signDataLogo} className="sign-data__logo" alt="Логотип"></img>
            <h2 className="sign-data__title">Добро пожаловать!</h2>
            <form className="sign-data__form">
                <label className="sign-data__label">Имя</label>
                <input minLength={2} maxLength={30} required className="sign-data__input"   ></input>
                <span className="sign-data__input-error"></span>
                <label className="sign-data__label">E-mail</label>
                <input minLength={2} maxLength={30} required className="sign-data__input" type="email"></input>
                <span className="sign-data__input-error"></span>
                <label className="sign-data__label">Пароль</label>
                <input minLength={2} maxLength={30} required className="sign-data__input" type="password"></input>
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