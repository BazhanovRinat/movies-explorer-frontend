import testimage from '../../images/test-image.png';
import buttnNoLikeImage from '../../images/button-noLike__image.svg'


function MoviesCard() {
    return (
        <div className="moviesCard">
            <img className="moviesCard__image" src={testimage} alt="Изображение фильма"></img>
            <div className="moviesCard__container">
                <h2 className="moviesCard__name">33 слова о дизайне</h2>
                <button className="moviesCard__button"><img src={buttnNoLikeImage} alt="Изображение сердца"></img></button>
            </div>
            <p className="moviesCard__movie-time">1ч42м</p>
        </div>
    );
}

export default MoviesCard;