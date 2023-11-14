import { Link } from "react-router-dom";
import studensPhoto from '../../images/studentsPhoto.jpg';

function AboutMe() {
    return (
        <section className="aboutMe">
            <h2 className="aboutMe__cup">Студент</h2>
            <div className="aboutMe__container">
                <div className="aboutMe__container-info">
                    <h3 className="aboutMe__container-info-title">Ринат</h3>
                    <h4 className="aboutMe__container-info-subtitle">Фронтенд-разработчик, 26 лет</h4>
                    <p className="aboutMe__container-info-text">Я родился и живу в Москве, закончил факультет экономики МИИТ.
                        Люблю слушать музыку, а ещё увлекаюсь спортом. Недавно начал кодить.
                        С 2023 года прошёл курс по веб-разработке и начал заниматься фриланс-заказами.
                    </p>
                    <Link target="_blank" className="aboutMe__container-info-link" to="https://github.com/BazhanovRinat">Github</Link>
                </div>
                <img className="aboutMe__container-image" src={studensPhoto} alt="Фотография студента"></img>
            </div>
        </section>
    );
}

export default AboutMe;