function AboutProject() {
    return (
        <section className="aboutProject">
            <h2 className="aboutProject__title">О проекте</h2>
            <div className="aboutProject__container">
                <div className="aboutProject__child-container">
                    <h3 className="aboutProject__title-container">Дипломный проект включал 5 этапов</h3>
                    <p className="aboutProject__subtitle">Составление плана, работу над бэкендом, вёрстку,
                        добавление функциональности и финальные доработки.</p>
                </div>
                <div className="aboutProject__child-container">
                    <h3 className="aboutProject__title-container">На выполнение диплома ушло 5 недель</h3>
                    <p className="aboutProject__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
                        чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="aboutProject__container aboutProject__container_row-480p">
                <div className="aboutProject__container-week">
                    <p className="aboutProject__one-week">1 неделя</p>
                    <p className="aboutProject__text-weeks">Back-end</p></div>
                <div className="aboutProject__container-weeks">
                    <p className="aboutProject__four-week">4 недели</p>
                    <p className="aboutProject__text-weeks">Fornt-end</p></div>
            </div>
        </section>
    );
}

export default AboutProject;