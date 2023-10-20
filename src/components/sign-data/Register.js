import NavBar from '../NavBar/NavBar';
import signDataLogo from '../../images/header__logo.svg';
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";

function Register({ onRegister }) {

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

    function isNameValid(name) {
        return typeof name === 'string' && name.length >= 2;
    }

    function validateForm(email, password, name) {
        const isEmail = isEmailValid(email);
        const isPassword = isPasswordValid(password);
        const isName = isNameValid(name)
        return isEmail && isPassword && isName;
    }

    useEffect(() => {
        const isFormValid = validateForm(values.email, values.password, values.name);
        setFormValid(isFormValid);
    }, [values.email, values.password, values.name]);

    function handleChange(e) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        if (name === 'email') {
            isEmailValid(value);
        }
        console.log(emailError)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        isEmailValid(values.email);
        onRegister(values, setValues);
    }

    return (
        <main className="sign-data">
            <Link className="sign-data__logo-link" to={'/'}><img src={signDataLogo} className="sign-data__logo" alt="Логотип"></img></Link>
            <h1 className="sign-data__title">Добро пожаловать!</h1>
            <form onSubmit={handleSubmit} className="sign-data__form">

                <label className="sign-data__label">Имя</label>
                <input
                    onChange={handleChange} name="name" placeholder="Имя" minLength={2}
                    maxLength={30} required className="sign-data__input"
                ></input>
                <span className="sign-data__input-error">{document.querySelector('input[name="name"]') &&
                    document.querySelector('input[name="name"]').validationMessage}</span>

                <label className="sign-data__label">E-mail</label>
                <input onChange={handleChange} name="email" placeholder="E-mail" minLength={2} maxLength={30} required
                    className="sign-data__input" type="email"
                ></input>
                <span className="sign-data__input-error">
                    {emailError || (document.querySelector('input[name="email"]') &&
                        document.querySelector('input[name="email"]').validationMessage)}
                </span>

                <label className="sign-data__label">Пароль</label>
                <input onChange={handleChange} name="password" placeholder="Пароль" minLength={2} maxLength={30} required
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