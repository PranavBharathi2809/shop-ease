import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { fetchProductsAPI } from './Apis/ProductApis';
import { Product } from '../types/Product';
import { useCart } from './Cart/cartContext'; // Import CartContext hook
import '../features/styles/Product.css';

const ProductPage: React.FC = () => {
  const { category } = useParams(); // gets category from URL
  const dispatch = useDispatch<AppDispatch>();
  const { addToCart } = useCart(); // Access addToCart from CartContext
  const { products, loading, error} = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchProductsAPI());
  }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      ...product,
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      
    });
    alert(`Added ${product.name} to cart`);
  };

  const handleAddToWishlist = (product: Product) => {
    alert(`(Placeholder) Added ${product.name} to wishlist`);
    // Add your wishlist logic here
  };

  const filteredProducts = category
    ? products.filter((product) => product.cat.toLowerCase() === category.toLowerCase())
    : products;

  return (
    <div className="women-products">
      <h2>{category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}</h2>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      

      <div className="cart-grid">
        {filteredProducts.map((product) => (
          <div key={product._id} className="cart-card">
            <img src={product.pimg} alt={product.name} className="cart-img" />
            <div className="cart-details">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Category: {product.cat}</p>
              <p>Brand: {product.brand}</p>
              <p>Color: {product.color}</p>
            </div>
            <div className="card-buttons">
              <button className="add-btn" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
              <button className="add-btn" style={{ backgroundColor: '#dc3545' }} onClick={() => handleAddToWishlist(product)}>
                Add to Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
