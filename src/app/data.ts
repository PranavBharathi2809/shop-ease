// data.ts
export type FashionItem = {
  image: string;
  price: string;
};

export type FashionCollection = {
  title: string;
  items: FashionItem[];
};

export const Gents: FashionCollection = {
  title: "Gents Fashion",
  items: [
    { image: "Assets/men/1.jpg", price: "559 INR" },
    { image: "Assets/men/2.jpg", price: "459 INR" },
    { image: "Assets/men/3.jpg", price: "659 INR" },
    { image: "Assets/men/4.jpg", price: "759 INR" },
    { image: "Assets/men/5.jpg", price: "859 INR" },
    { image: "Assets/men/6.jpg", price: "959 INR" },
  ],
};

export const Ladies: FashionCollection = {
  title: "Ladies Fashion",
  items: [
    { image: "Assets/Woman/1w.jpg", price: "1559 INR" },
    { image: "Assets/Woman/2w.jpg", price: "1459 INR" },
    { image: "Assets/Woman/3w.jpg", price: "1659 INR" },
    { image: "Assets/Woman/4w.jpg", price: "1759 INR" },
    { image: "Assets/Woman/5w.jpg", price: "1859 INR" },
    { image: "Assets/Woman/6w.jpg", price: "1959 INR" },
  ],
};
