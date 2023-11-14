import { Link } from "react-router-dom";
import NavBar from '../NavBar/NavBar';

function PopupMenu({ isPopupRender, closePopup }) {

    return (
        <div className={`popupMenu ${isPopupRender ? 'popupMenu_render' : ''}`}>
            <div className="popupMenu__container">
                <button className="popupMenu__close" onClick={closePopup}></button>
                <nav className="popupMenu__link-container">
                    <NavBar name={"Главная"} path={""} className={"popupMenu__link"} />
                    <NavBar name={"Фильмы"} path={"movies"} className={"popupMenu__link"} />
                    <NavBar name={"Сохраненные фильмы"} path={"saved-movies"} className={"popupMenu__link"} />
                    <Link className="popupMenu__profile-link" to="/profile">
                        <button className="popupMenu__profile-link-image"></button>
                    </Link>
                </nav>
            </div>
        </div >
    );
}

export default PopupMenu;