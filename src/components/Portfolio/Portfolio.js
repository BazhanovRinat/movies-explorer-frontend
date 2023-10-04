import { Link } from "react-router-dom";
import portfolio__arrow from '../../images/portfolio__arrow.svg';

function Portfolio() {
    return (
        <div className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <Link className="portfolio__link-contrainer" to="https://bazhanovrinat.github.io/how-to-learn/">
                <p className="portfolio__text-link">Статичный сайт</p>
                <img className="portfolio__arrow-link" src={portfolio__arrow} alt="Ссылка ввиде стеркли"></img>
            </Link>
            <Link className="portfolio__link-contrainer" to="https://bazhanovrinat.github.io/russian-travel/">
                <p className="portfolio__text-link">Адаптивный сайт</p>
                <img className="portfolio__arrow-link" src={portfolio__arrow} alt="Ссылка ввиде стеркли"></img>
            </Link>
            <Link className="portfolio__link-contrainer" to="https://bazhanovrinat.github.io/react-mesto-auth/">
                <p className="portfolio__text-link">Одностраничное приложение</p>
                <img className="portfolio__arrow-link" src={portfolio__arrow} alt="Ссылка ввиде стеркли"></img>
            </Link>
        </div>
    );
}

export default Portfolio;