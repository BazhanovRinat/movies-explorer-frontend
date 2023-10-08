import testimage from '../../images/test-image.png';
import buttnNoLikeImage from '../../images/button-noLike__image.svg'
import deleteButton from '../../images/delete__button.svg'
import { useLocation } from "react-router-dom";


function MoviesCard() {

    const { pathname } = useLocation()

    return (
        <div className="moviesCard">
            <img className="moviesCard__image" src={testimage} alt="Изображение фильма"></img>
            <div className="moviesCard__container">
                <h2 className="moviesCard__name">33 слова о дизайне</h2>
                {
                    pathname === "/saved-movies"
                        ? <button className="moviesCard__button"><img src={deleteButton} alt="Изображение сердца"></img></button>
                        : <button className="moviesCard__button"><img src={buttnNoLikeImage} alt="Изображение сердца"></img></button>
                }
            </div>
            <p className="moviesCard__movie-time">1ч42м</p>
        </div>
    );
}

export default MoviesCard;