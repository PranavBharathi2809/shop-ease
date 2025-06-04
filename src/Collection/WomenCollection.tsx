import React from "react";
import "../features/styles/Collections.css"
import { FashionCollection } from "../app/data";

type WomenCollectionProps = {
  ladiesfashion: FashionCollection;
};

const WomenCollection: React.FC<WomenCollectionProps> = ({ ladiesfashion }) => {
  const { title, items } = ladiesfashion;

  return (
    <div className="collectionSection">
      <h2>{title}</h2>

      <div className="bannerbox">
        <img src="Assets/LadiesBanner.gif" alt="banner" />
      </div>

      <div className="carousel">
        <div className="carousel-track">
          {items.concat(items).map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={`Ladies Fashion ${index}`}
              title={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WomenCollection;
