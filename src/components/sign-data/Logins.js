import NavBar from '../NavBar/NavBar';
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useState } from "react";

function Login({ onLogin }) {

    const { values, handleChange, setValues } = useForm({});
    const [formValid, setFormValid] = useState(false);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    function validateForm() {
        const isEmailValid = emailRegex.test(values.email);
        const isFormValid = Object.values(values).every(value => value && value.length >= 2) && isEmailValid;
        setFormValid(isFormValid);
    }

function handleBlur(e) {
    const { name, value } = e.target;
    if (name === 'email' && !emailRegex.test(value)) {
        e.target.setCustomValidity('Пожалуйста, введите корректный адрес электронной почты');
    } else if (value.length < 2) {
        e.target.setCustomValidity('Это поле должно содержать минимум 2 символа');
    } else {
        e.target.setCustomValidity('');
    }
    validateForm();
}

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onLogin(values, setValues)
    }


    return (
        <main className="sign-data">
            <Link className="sign-data__logo-link" to={'/'}><button className="sign-data__logo-button"></button></Link>
            <h1 className="sign-data__title">Рады видеть!</h1>
            <form className="sign-data__form" onSubmit={handleSubmit}>

                <label className="sign-data__label">E-mail</label>
                <input placeholder="E-mail" minLength={2} maxLength={30} required className="sign-data__input" type="email"
                    onChange={handleChange} onBlur={handleBlur} name="email"></input>
                <span className="sign-data__input-error">{document.querySelector('input[name="email"]') &&
                    document.querySelector('input[name="email"]').validationMessage}</span>

                <label className="sign-data__label">Пароль</label>
                <input placeholder="Пароль" minLength={2} maxLength={30} required className="sign-data__input" type="password"
                    onChange={handleChange} onBlur={handleBlur} name="password"
                ></input>
                <span className="sign-data__input-error">
                    {document.querySelector('input[name="password"]') && document.querySelector('input[name="password"]').validationMessage}
                </span>

                <button className="sign-data__submit sign-data__login-submit" type="submit" disabled={!formValid}>Войти</button>
            </form>
            <p className="sign-data__text-under-submit ">Еще не зарегистрированы? <NavBar
                name={"Регистрация"} path={"sign-up"} className={"sign-data__link-under-submit"} />
            </p>
        </main>
    );
}

export default Login;