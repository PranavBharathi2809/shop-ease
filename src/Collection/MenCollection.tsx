import React from "react";
import "../features/styles/Collections.css"
import { FashionCollection } from "../app/data";
type MenCollectionProps = {
  gentsfashion: FashionCollection;
};

const MenCollection: React.FC<MenCollectionProps> = ({ gentsfashion }) => {
  const { title, items } = gentsfashion;

  return (
    <div className="collectionSection">
      <h2>{title}</h2>

      <div className="carousel">
        <div className="carousel-track">
          {items.concat(items).map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={`Gents Fashion ${index}`}
              title={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenCollection;
