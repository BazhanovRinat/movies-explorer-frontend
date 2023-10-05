import NavBar from '../NavBar/NavBar';

function PopupMenu() {

    return (
        <div className="popupMenu">
            <div className="popupMenu__container">
            <button className="popupMenu__close"></button>
                <nav className="popupMenu__link-container">
                    <NavBar name={"Главная"} path={"saved-movies"} className={"popupMenu__link"} />
                    <NavBar name={"Фильмы"} path={"movies"} className={"popupMenu__link"} />
                    <NavBar name={"Сохраненные фильмы"} path={"saved-movies"} className={"popupMenu__link"} />
                    <NavBar name={""} path={"profile"} className={"popupMenu__link-profile"} />
                </nav>
            </div>
        </div>
    );
}

export default PopupMenu;