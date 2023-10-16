// import testimage from '../../images/test-image.png';
// import buttnNoLikeImage from '../../images/button-noLike__image.svg'
// import deleteButton from '../../images/delete__button.svg'
// import { Link, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import buttonLikeImage from '../../images/button-like__image.svg'
// import { mainApi } from "../../utils/MainApi";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// function MoviesCard({ movie }) {

//     const [isLiked, setIsLiked] = useState(false)
//     const [likedMovies, setLikedMovies] = useState([]);

//     const [isSaving, setIsSaving] = useState(false); // Флаг для отслеживания сохранения данных

//     function numberToTime(number) {
//         const hours = Math.floor(number / 60);
//         const minutes = number % 60;
//         return `${hours}ч${minutes}м`;
//     }

//     function changeLikeState() {
//       setIsLiked(!isLiked);

//       // Если фильм лайкнут, добавьте его в список лайкнутых карточек
//       if (!isLiked) {
//         setLikedMovies([...likedMovies, movie]);
//       } else {
//         const updatedLikedMovies = likedMovies.filter((likedMovie) => likedMovie.id !== movie.id);
//         setLikedMovies(updatedLikedMovies);
//       }
//     }

//     useEffect(() => {
//       // Если isSaving становится true, значит, нужно отправить данные в mainApi
//       if (isSaving) {
//         mainApi.addMovie(movie)
//           .then((response) => {
//             // Обработка успешного сохранения
//             console.log('Фильм успешно сохранен в mainApi');
//           })
//           .catch((error) => {
//             // Обработка ошибки
//             console.error('Ошибка при сохранении фильма:', error);
//           })
//           .finally(() => {
//             setIsSaving(false); // Сбрасываем флаг после завершения запроса
//           });
//       }
//     }, [isSaving]);

//     useEffect(() => {
//       // Если состояние likedMovies изменяется, устанавливаем флаг isSaving для отправки данных в mainApi
//       setIsSaving(true);
//     }, [likedMovies]);

//     const { pathname } = useLocation()

//     console.log(movie)

//     return (
//         <div className="moviesCard">
//             <Link to={movie.trailerLink} target="_blank">
//                 <img className="moviesCard__image" src={`https://api.nomoreparties.co${movie.image.url}`} alt="Изображение фильма"></img>
//             </Link>
//             <div className="moviesCard__container">
//                 <h2 className="moviesCard__name">{movie.nameRU}</h2>
//                 {
//                     pathname === "/saved-movies"
//                         ? <button className="moviesCard__button"><img src={deleteButton} alt="Изображение сердца"></img></button>
//                         : <button
//                             className="moviesCard__button"><img onClick={changeLikeState} src={isLiked ? buttonLikeImage : buttnNoLikeImage}
//                                 alt="Изображение сердца"></img></button>
//                 }
//             </div>
//             <p className="moviesCard__movie-time">{numberToTime(movie.duration)}</p>
//         </div>
//     );
// }

// export default MoviesCard;


import testimage from '../../images/test-image.png';
import buttnNoLikeImage from '../../images/button-noLike__image.svg'
import deleteButton from '../../images/delete__button.svg'
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import buttonLikeImage from '../../images/button-like__image.svg'
import { mainApi } from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard({ movie }) {

    const [isLiked, setIsLiked] = useState(false)
    const [likedMovies, setLikedMovies] = useState([]);
    const [movieDelete, setMovieDelete] = useState([])

    const profileData = React.useContext(CurrentUserContext)

    useEffect(() => {
        mainApi.getMovies()
            .then(data => {
                const likedMovies = data.some(item => item.movieId === movie.id);
                if (likedMovies) {
                    setIsLiked(true);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [movie.id]);

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
                });
        }
    }

    function deleteMovie(movie) {
        console.log(movie);
        mainApi.deleteMovie(movie._id)
            .then((res) => {
                console.log('Фильм успешно удален');
            })
            .catch((error) => {
                console.log('Ошибка при удалении фильма');
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