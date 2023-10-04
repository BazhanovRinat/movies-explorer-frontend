import promo__image from '../../images/promo__image.svg';

function Promo() {
    return (
        <div className="promo">
            <div className="promo__container">
                <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
                <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <button className="promo__navtab">Узнать больше</button>
            </div>
            <img className="promo__image" src={promo__image} alt="Изображание планеты словами web" />
        </div>
    );
}

export default Promo;