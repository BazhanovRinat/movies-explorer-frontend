import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__copyright">&copy;&nbsp;{new Date().getFullYear()}</p>
                <ul className="footer__links">
                    <li className="footer__link"><Link className="footer__link-item">Яндекс.Практикум</Link></li>
                    <li className="footer__link"><Link className="footer__link-item">Github</Link></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;