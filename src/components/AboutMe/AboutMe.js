import { Link } from "react-router-dom";
import studensPhoto from '../../images/studentsPhoto.png';

function AboutMe() {
    return (
        <div className="aboutMe">
            <h2 className="aboutMe__cup">Студент</h2>
            <div className="aboutMe__container">
                <div className="aboutMe__container-info">
                    <h3 className="aboutMe__container-info-title">Виталий</h3>
                    <h4 className="aboutMe__container-info-subtitle">Фронтенд-разработчик, 30 лет</h4>
                    <p className="aboutMe__container-info-text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
                        С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
                        начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <Link className="aboutMe__container-info-link" to="https://github.com/BazhanovRinat">Github</Link>
                </div>
                <img className="aboutMe__container-image" src={studensPhoto} alt="Фотография студента"></img>
            </div>
        </div>
    );
}

export default AboutMe;