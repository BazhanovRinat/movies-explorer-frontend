import NavBar from '../NavBar/NavBar';
import signDataLogo from '../../images/header__logo.svg';
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useState } from "react";

function Register({ onRegister }) {
    const { values, handleChange, setValues } = useForm({});
    const [formValid, setFormValid] = useState(false);

    function validateForm() {
        const isFormValid = Object.values(values).every(value => value && value.length >= 2);
        setFormValid(isFormValid);
    }

    function handleBlur(evt) {
        const { name, value } = evt.target;
        if (value.length < 2) {
            evt.target.setCustomValidity('Это поле должно содержать минимум 2 символа');
        } else {
            evt.target.setCustomValidity('');
        }
        validateForm();
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister(values, setValues);
    }

    return (
        <main className="sign-data">
            <Link className="sign-data__logo-link" to={'/'}><img src={signDataLogo} className="sign-data__logo" alt="Логотип"></img></Link>
            <h1 className="sign-data__title">Добро пожаловать!</h1>
            <form onSubmit={handleSubmit} className="sign-data__form">

                <label className="sign-data__label">Имя</label>
                <input
                    onChange={handleChange} onBlur={handleBlur} name="name" placeholder="Имя" minLength={2}
                    maxLength={30} required className="sign-data__input"
                ></input>
                <span className="sign-data__input-error">{document.querySelector('input[name="name"]') &&
                    document.querySelector('input[name="name"]').validationMessage}</span>

                <label className="sign-data__label">E-mail</label>
                <input onChange={handleChange} onBlur={handleBlur} name="email" placeholder="E-mail" minLength={2} maxLength={30} required
                    className="sign-data__input" type="email"
                ></input>
                <span className="sign-data__input-error">{document.querySelector('input[name="email"]')
                    && document.querySelector('input[name="email"]').validationMessage}</span>

                <label className="sign-data__label">Пароль</label>
                <input onChange={handleChange} onBlur={handleBlur} name="password" placeholder="Пароль" minLength={2} maxLength={30} required
                    className="sign-data__input" type="password"
                ></input>
                <span className="sign-data__input-error">{document.querySelector('input[name="password"]') &&
                    document.querySelector('input[name="password"]').validationMessage}</span>

                <button className="sign-data__submit" type="submit" disabled={!formValid}>Зарегистрироваться</button>
            </form>
            <p className="sign-data__text-under-submit">Уже зарегистрированы? <NavBar
                name={"Войти"} path={"sign-in"} className={"sign-data__link-under-submit"} />
            </p>
        </main>
    );
}

export default Register;