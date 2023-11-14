import React, { useState, useEffect } from 'react';
import useForm from "../../hooks/useForm";
import { useLocation } from 'react-router-dom';

function SearchForm({ findMovie, isShortMovies, handleCheckboxChange }) {

    const { values, handleChange, setValues } = useForm({ searchForm: '' });
    const location = useLocation();

    useEffect(() => {
        const SearchFormValueData = localStorage.getItem('searchFormValue');
        if (SearchFormValueData && location.pathname !== '/saved-movies') {
            setValues({ searchForm: SearchFormValueData });
        }
    }, [location]);

    function handleSubmit(e) {
        e.preventDefault();
        if (values.searchForm === '') {
            console.log('Введите запрос');
        } else {
            if (location.pathname !== '/saved-movies') {
                localStorage.setItem('searchFormValue', values.searchForm);
            }
            findMovie(values.searchForm);
        }
    }

    return (
        <div className="searchForm">
            <form className="searchForm__form" action="" method="get" onSubmit={handleSubmit}>
                <input className="searchForm__input" name="searchForm" placeholder="Фильм" type="search" onChange={handleChange}
                    value={values.searchForm} />
                <button className="searchForm__submit" type="submit">Найти</button>
            </form>
            <div className="movies__switch-container">
                <input className="movies__switch" id="switch" type="checkbox" checked={isShortMovies}
                    onChange={handleCheckboxChange} />
                <label className="movies__switch-active" for="switch"></label>
                <label className="movies__switch-lable">Короткометражки</label>
            </div>
        </div>
    );
}

export default SearchForm;

