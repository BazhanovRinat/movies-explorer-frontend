import NavBar from '../NavBar/NavBar';
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";

function Login({ onLogin }) {

    const { values, setValues } = useForm({});
    const [formValid, setFormValid] = useState(false);
    const [emailError, setEmailError] = useState('');
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    function isEmailValid(email) {
        const isValid = emailRegex.test(email);
        if (!isValid) {
            setEmailError('Некорректный email');
        } else {
            setEmailError('');
        }
        return isValid;
    }

    function isPasswordValid(password) {
        return typeof password === 'string' && password.length >= 2;
    }

    function validateForm(email, password) {
        const isEmail = isEmailValid(email);
        const isPassword = isPasswordValid(password);
        return isEmail && isPassword;
    }

    useEffect(() => {
        const isFormValid = validateForm(values.email, values.password);
        setFormValid(isFormValid);
    }, [values.email, values.password]);

    function handleChange(e) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        if (name === 'email') {
            isEmailValid(value);
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        isEmailValid(values.email)
        onLogin(values, setValues);
    }


    return (
        <main className="sign-data">
            <Link className="sign-data__logo-link" to={'/'}><button className="sign-data__logo-button"></button></Link>
            <h1 className="sign-data__title">Рады видеть!</h1>
            <form className="sign-data__form" onSubmit={handleSubmit}>

                <label className="sign-data__label">E-mail</label>
                <input placeholder="E-mail" minLength={2} maxLength={30} required className="sign-data__input" type="email"
                    onChange={handleChange} name="email"></input>
                <span className="sign-data__input-error">
                    {emailError || (document.querySelector('input[name="email"]') &&
                        document.querySelector('input[name="email"]').validationMessage)}
                </span>
                <label className="sign-data__label">Пароль</label>
                <input placeholder="Пароль" minLength={2} maxLength={30} required className="sign-data__input" type="password"
                    onChange={handleChange} name="password"
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