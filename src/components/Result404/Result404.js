import { Link } from "react-router-dom";


function Result404() {

  return (
    <section className="result404">
      <div className="result404__container">
        <h1 className="result404__title">404</h1>
        <h2 className="result404__subtitle">Страница не найдена</h2>
        <Link to="/" className="result404__link">Назад</Link>
      </div>
    </section>
  );
}

export default Result404;