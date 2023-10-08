import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Footer() {

    const { pathname } = useLocation()

    return (
        <footer className={`footer ${pathname === "/profile" ||
            pathname === "/404" ||
            pathname === "/sign-up" ||
            pathname === "/sign-in" ? "footer_display-none" : ""}`}>
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__copyright">&copy;&nbsp;{new Date().getFullYear()}</p>
                <ul className="footer__links">
                    <li className="footer__link">
                        <Link target="_blank" to="https://practicum.yandex.ru/ " className="footer__link-item">Яндекс.Практикум</Link>
                    </li>
                    <li className="footer__link">
                        <Link target="_blank" to="https://github.com/" className="footer__link-item">Github</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;