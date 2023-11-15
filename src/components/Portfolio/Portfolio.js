import { Link } from "react-router-dom";

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            {/* <Link target="_blank" className="portfolio__link-contrainer" to="https://bazhanovrinat.github.io/how-to-learn/">
                <p className="portfolio__text-link">Статичный сайт</p>
                <button className="portfolio__arrow-link"></button>
            </Link> */}
            <Link target="_blank" className="portfolio__link-contrainer" to="https://bazhanovrinat.github.io/russian-travel/">
                <p className="portfolio__text-link">Адаптивный сайт</p>
                <button className="portfolio__arrow-link"></button>
            </Link>
            <Link target="_blank" className="portfolio__link-contrainer" to="https://bazhanovrinat.github.io/react-mesto-auth/">
                <p className="portfolio__text-link">Одностраничное приложение</p>
                <button className="portfolio__arrow-link"></button>
            </Link>
        </section>
    );
}

export default Portfolio;