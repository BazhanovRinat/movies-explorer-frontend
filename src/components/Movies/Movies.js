import React, { useState, useEffect } from 'react';
import { moviesApi } from "../../utils/MoviesApi";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { mainApi } from "../../utils/MainApi";

function Movies({ openPopupError }) {

    const [renderMovies, setRenderMovies] = useState([]);
    const [allMovies, setAllMovies] = useState([]);
    const [shortMovies, setShortMovies] = useState([]);
    const [maxVisibleMovies, setMaxVisibleMovies] = useState(16);
    const [savedMovies, setSavedMovies] = useState([])
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [usersMovies, setUsersMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const [searched, setSearched] = useState(false);
    const [extaSearched, setExtraSearched] = useState(false)

    const [isShortMovies, setIsShortMovies] = useState(localStorage.getItem('isShortMovies')) || false

    const [startMaxMovies, setStartMaxMovies] = useState(16)

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const storedValue = localStorage.getItem('isShortMovies');
        if (storedValue === 'true') {
            setIsShortMovies(true);
        } else {
            setIsShortMovies(false);
        }
    }, []);

    useEffect(() => {
        if (isShortMovies !== null) {
            localStorage.setItem('isShortMovies', isShortMovies.toString());
        }
    }, [isShortMovies]);

    useEffect(() => {
        setUsersMovies(JSON.parse(localStorage.getItem('allMovies')));
        if (usersMovies) {
            setSearched(true);
            let filteredMovies;
            if (isShortMovies) {
                filteredMovies = usersMovies.filter(({ duration }) => duration <= 40);
            } else {
                filteredMovies = usersMovies;
            }

            if (screenWidth <= 1149) {
                setStartMaxMovies(15);
            }
            if (screenWidth <= 1024) {
                setStartMaxMovies(8);
            }
            if (screenWidth <= 749) {
                setStartMaxMovies(5);
            }
            const updatedRenderMovies = filteredMovies.slice(0, startMaxMovies);
            setRenderMovies(updatedRenderMovies);
        }
    }, [isShortMovies, maxVisibleMovies])

    useEffect(() => {
        mainApi.getMovies()
            .then((data) => {
                setSavedMovies(data);
            })
            .catch((err) => {
                console.log(err);
                openPopupError(true);
            });
    }, [isShortMovies]);

    useEffect(() => {
        console.log(isShortMovies)
    }, [isShortMovies]);

    function findMovie(filter) {
        setIsLoading(true);
        moviesApi.getMovies()
            .then((data) => {
                let filteredMovies = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(filter.toLowerCase()));
                setAllMovies(filteredMovies);
                setShortMovies(filteredMovies.filter(({ duration }) => duration <= 40))
                localStorage.setItem('allMovies', JSON.stringify(filteredMovies));

                if (isShortMovies === true) {
                    setRenderMovies(allMovies)
                } else {
                    setRenderMovies(shortMovies)
                }

                if (screenWidth <= 1149) {
                    setMaxVisibleMovies(15);
                }
                if (screenWidth <= 1024) {
                    setMaxVisibleMovies(8);
                }
                if (screenWidth <= 749) {
                    setMaxVisibleMovies(5);
                }

                setSearched(true);
                setExtraSearched(true)
            })
            .catch((error) => {
                console.log(`${error}`);
                openPopupError(true)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    function handleCheckboxChange() {
        setIsShortMovies(!isShortMovies);
        if (isShortMovies === true) {
            setRenderMovies(allMovies)
        } else {
            setRenderMovies(shortMovies)
        }
    }

    function loadMoreMovies() {
        let cardsToAdd = 4;
        if (screenWidth <= 1150) {
            cardsToAdd = 3;
        }
        if (screenWidth <= 1025) {
            cardsToAdd = 2;
        }
        setMaxVisibleMovies((currentMaxVisibleMovies) => currentMaxVisibleMovies + cardsToAdd);
        setStartMaxMovies(startMaxMovies + cardsToAdd);
    }

    function updateVisibleMovies() {
        if (!isShortMovies) {
            const moviesToShow = allMovies.slice(0, maxVisibleMovies);
            return moviesToShow;
        } else {
            const moviesToShow = shortMovies.slice(0, maxVisibleMovies);
            return moviesToShow;
        }
    }

    useEffect(() => {
        if (searched && extaSearched) {
            const updatedRenderMovies = updateVisibleMovies();
            setRenderMovies(updatedRenderMovies);
        }
    }, [maxVisibleMovies, searched, isShortMovies, allMovies, shortMovies]);

    return (
        <main className="movies">
        <SearchForm findMovie={findMovie} handleCheckboxChange={handleCheckboxChange} isShortMovies={isShortMovies} />
        {isLoading ? (
            <div className="preloader">
                <span className="loader"></span>
            </div>
        ) : (
            <>
                {searched && extaSearched && renderMovies.length === 0 ? (
                    <p>Фильм не найден</p>
                ) : (
                    <>
                        {searched && <MoviesCardList movies={renderMovies} savedMovies={savedMovies} openPopupError={openPopupError} />}
                        {searched && usersMovies && (
                            (isShortMovies && renderMovies.length < usersMovies.filter(({ duration }) => duration <= 40).length) ||
                            (!isShortMovies && renderMovies.length < usersMovies.length)
                        ) && (
                            <button className="movies__moreMovies-btn" onClick={loadMoreMovies}>Еще</button>
                        )}
                    </>
                )}
            </>
        )}
    </main>
    );
}

export default Movies;
