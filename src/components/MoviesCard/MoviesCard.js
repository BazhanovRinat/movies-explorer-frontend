import buttnNoLikeImage from '../../images/button-noLike__image.svg'
import deleteButton from '../../images/delete__button.svg'
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import buttonLikeImage from '../../images/button-like__image.svg'
import { mainApi } from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard({ movie, savedMovies, openPopupError, updateMoviesList}) {

    const [isLiked, setIsLiked] = useState(false)
    const [likedMovies, setLikedMovies] = useState([]);
    const [movieDelete, setMovieDelete] = useState([])

    const profileData = React.useContext(CurrentUserContext)

    useEffect(() => {
        if (savedMovies && savedMovies.length > 0) {
          const likedMovies = savedMovies.some(item => item.movieId === movie.id);
          if (likedMovies) {
            setIsLiked(true);
          }
        }
      }, [movie.id, savedMovies]);
      

    function numberToTime(number) {
        const hours = Math.floor(number / 60);
        const minutes = number % 60;
        return `${hours}ч${minutes}м`;
    }

    function changeLikeState() {
        setIsLiked(!isLiked);

        const movieDublicate = {
            image: `https://api.nomoreparties.co${movie.image.url}`,
            trailerLink: movie.trailerLink,
            thumbnail: 'https://api.nomoreparties.co' + movie.image.url,
            movieId: movie.id,
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            owner: profileData._id
        }

        if (!isLiked) {
            setLikedMovies(prevLikedMovies => [...prevLikedMovies, movieDublicate]);
            mainApi.addMovie(movieDublicate)
                .then((res) => {
                    console.log('Фильм успешно добавлен');
                })
                .catch((error) => {
                    console.log('Ошибка при добавлении фильма');
                    openPopupError(true)
                });
        } else {
            mainApi.getMovies()
                .then(async (data) => {
                    const isMovieInData = data.find(item => item.movieId === movieDublicate.movieId);
                    if (isMovieInData) {
                        await mainApi.deleteMovie(isMovieInData._id);
                        setLikedMovies(prevLikedMovies => prevLikedMovies.filter(item => item.movieId !== isMovieInData.movieId));
                        console.log('Фильм успешно удален');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    openPopupError(true)
                });
        }
    }

    function deleteMovie(movie) {
        console.log(movie);
        mainApi.deleteMovie(movie._id)
            .then((res) => {
                updateMoviesList(movie)
                console.log('Фильм успешно удален');
            })
            .catch((error) => {
                console.log('Ошибка при удалении фильма');
                openPopupError(true)
            });
    }

    const { pathname } = useLocation()

    return (
        <div className="moviesCard">
            <Link to={movie.trailerLink} target="_blank">
                <img className="moviesCard__image" src={pathname === "/movies" ? `https://api.nomoreparties.co${movie.image.url}`
                    : `${movie.image}`}
                    alt="Изображение фильма"></img>
            </Link>
            <div className="moviesCard__container">
                <h2 className="moviesCard__name">{movie.nameRU}</h2>
                {
                    pathname === "/saved-movies"
                        ? <button className="moviesCard__button"><img src={deleteButton} onClick={() => deleteMovie(movie)}
                            alt="Изображение крестика"></img></button>
                        : <button
                            className="moviesCard__button"><img onClick={changeLikeState} src={isLiked ? buttonLikeImage : buttnNoLikeImage}
                                alt="Изображение сердца"></img></button>
                }
            </div>
            <p className="moviesCard__movie-time">{numberToTime(movie.duration)}</p>
        </div>
    );
}

export default MoviesCard;