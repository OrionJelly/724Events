import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const {data } = useData();
  const [index, setIndex] = useState(0);
  // inverser l'opérateur de tri, si condition validée
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 0
  );
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc?.length - 1 ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard()
  });


  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
      ))}
      <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc?.map((_, radioIdx) => (
                <input
                  key={`f-${radioIdx}`}
                  type="radio"
                  name="radio-button"
                  onChange={() => null}
                  // ajout de la variable index pour changer la position de l'input checked correspondant à la position de l'index de l'image
                  checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
    </div>
  );
};

export default Slider;
