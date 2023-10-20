import React, { useEffect, useState } from "react";
import NavBar from '../NavBar/NavBar';
import useForm from "../../hooks/useForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

function Profile(props) {
    const [profileChange, setProfileChange] = useState(false);
    const { values, setValues } = useForm({});
    const [formValid, setFormValid] = useState(false);
    const [formErr, setFormErr] = useState("");

    const profileData = React.useContext(CurrentUserContext);

    function isEmailValid(email) {
        return emailRegex.test(email);
    }

    function isNameValid(name) {
        return typeof name === 'string' && name.length >= 2;
    }

    function validateForm(email, name) {
        const isEmail = isEmailValid(email);
        const isName = isNameValid(name)
        return isEmail && isName;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    function changeProfile() {
        setProfileChange(true);
        setValues({ name: profileData.name, email: profileData.email });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (values.email && !emailRegex.test(values.email)) {
            setFormErr("Введите корректный email");
            return;
        }
        props.onUpdateUser({
            name: values.name,
            email: values.email,
        });
        setProfileChange(false);
    }

    useEffect(() => {
        const isFormValid = validateForm(values.email, values.name);
        setFormValid(isFormValid);
    }, [values.email, values.name]);

    useEffect(() => {
        if (profileChange) {
            if (values.name === profileData.name && values.email === profileData.email) {
                setFormErr("Одинаковые данные");
                setFormValid(true);
            } else {
                setFormErr("");
                setFormValid(false);
            }
        }

        if(!emailRegex.test(values.email)) {
            setFormErr("Некорректная почта");
            setFormValid(true);
        } else {
            setFormErr("");
            setFormValid(false);
        }
    }, [values.name, values.email, profileChange, profileData]);

    return (
        <main className="profile">
            <h1 className="profile__title">Привет, {profileData.name || 'Виталий'}!</h1>
            <form className={profileChange ? "profile__form profile__form_margin" : "profile__form"} onSubmit={handleSubmit}>
                <div className="profile__info">
                    <h2 className="profile__info-type">Имя</h2>
                    {profileChange ? <input onChange={handleChange} name="name" maxLength={30} minLength={2} required
                        className="profile__info-item profile__info-name profile__input"
                        placeholder={"Имя"} value={values.name || ""}>
                    </input>
                        : <p className="profile__info-item profile__info-name">{profileData.name || 'Виталий'}</p>}
                </div>
                <div className="profile__info">
                    <h3 className="profile__info-type">E-mail</h3>
                    {profileChange ? <input onChange={handleChange} value={values.email || ""} type="email"
                        name="email" maxLength={30} minLength={2} required
                        className="profile__info-item profile__info-name profile__input" placeholder={"E-mail"}></input>
                        : <p className="profile__info-item profile__info-email">{profileData.email || "pochta@yandex.ru"}</p>}
                </div>
                {profileChange ? <span className="sign-data__input-error profile-data__input-error">
                    {formErr}
                </span> : ""}
                {profileChange ? <button className="profile__form-submit"
                    disabled={formValid}>Сохранить</button> : ""}
            </form>
            {profileChange ? "" : <div className="profile__under-submit-container">
                {profileChange ? "" : <button className="profile__button" onClick={changeProfile}>Редактировать</button>}
                <NavBar name={"Выйти из аккаунта"} path={""} className={"profile__link"} signOut={props.signOut} />
            </div>}
        </main>
    );
}

export default Profile;