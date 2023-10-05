import NavBar from '../NavBar/NavBar';

function Profile() {
    return (
        <main className="profile">
            <h2 className="profile__title">Привет, Виталий!</h2>
            <div className="profile__info">
                <h3 className="profile__info-type">Имя</h3>
                <p className="profile__info-item profile__info-name">Виталий</p>
            </div>
            <div className="profile__info">
                <h3 className="profile__info-type">E-mail</h3>
                <p className="profile__info-item profile__info-email">pochta@yandex.ru</p>
            </div>
            <button className="profile__button">Редактировать</button>
            <NavBar name={"Выйти из аккаунта"} path={""} className={"profile__link"} />
        </main>
    );
}

export default Profile;