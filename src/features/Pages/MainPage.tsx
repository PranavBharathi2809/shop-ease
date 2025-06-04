import React, { useState } from 'react';
import Header from '../components/Header';
 import Banner from '../components/Banner';
import Product from '../Product';
import Collections from '../../Collection/MenCollection';
// import Footer from '../components/Footer';
 import WomenCollection from '../../Collection/WomenCollection';
 import type { FashionCollection } from '../../app/data';
import { Gents ,Ladies } from '../../app/data';

// // Define the type for a fashion item (based on your Gents and Ladies data shape)
// interface FashionItem {
//   id: number;
//   name: string;
//   image: string;
//   price: number;
//   [key: string]: any; // Add this if there are additional dynamic fields
// }

const Mainpage: React.FC = () => {
  const [gentsfashion, setGentsFashion] = useState<FashionCollection>(Gents);
  const [ladiesfashion, setLadiesFashion] = useState<FashionCollection>(Ladies);

  return (
    <div>
      <Header />
        <Banner />
    <Collections gentsfashion={gentsfashion} />
      <WomenCollection ladiesfashion={ladiesfashion} />
       {/* <Footer /> 
       <Product/>  */}
    </div>
  );
};

export default Mainpage;
