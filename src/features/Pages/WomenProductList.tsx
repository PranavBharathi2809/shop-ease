import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { fetchProducts } from '../product/ProductSlice';
import { useCart } from '../Cart/cartContext';
import Navbar from '../components/Navbar';
import '../styles/WomenProducts.css';
import { Product } from '../../types/Product';

const WomenProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { addToCart } = useCart();

  const { products, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const womenProducts = products.filter(
    (product) => product.cat?.toLowerCase() === 'women'
  );
  console.log(womenProducts)

  const handleAddToCart = (product: Product) => {
    addToCart({
      ...product,
      id: product._id, // required if your cart expects an 'id' field
      quantity: 1,
    });
    alert(`Added ${product.name} to cart`);
  };

  const handleAddToWishlist = (product: Product) => {
    alert(`(Placeholder) Added ${product.name} to wishlist`);
  };

  return (
    <div className="women-products">
      <Navbar />
      <h2>Women Products</h2>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    

      <div className="cart-grid">
        
        {womenProducts.length > 0 ? (
          womenProducts.map((product) => (
            <div key={product._id} className="cart-card">
              <img
                src={`http://localhost:3002/prodimgs/${product.pimg}`}
                alt={product.name}
                className="cart-img"
              />
              <div className="cart-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ₹{product.price}</p>
                <p>Category: {product.cat}</p>
                <p>Brand: {product.brand}</p>
                <p>Color: {product.color}</p>
              </div>
              <div className="card-buttons">
                <button className="add-btn" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
                <button
                  className="add-btn"
                  style={{ backgroundColor: '#dc3545' }}
                  onClick={() => handleAddToWishlist(product)}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No women products found.</p>
        )}
      </div>
    </div>
  );
};

export default WomenProductList;
