import React, { useState } from 'react';
import Promo from '../Promo/Promo'
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

function Main() {

    function scrollToElement(scrollElemet) {
        if (scrollElemet) {
            scrollElemet.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <main className="main">
            <Promo onScroll={scrollToElement} />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </main>
    );
}

export default Main;