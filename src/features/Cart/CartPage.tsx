import React from 'react';
import { useCart } from './cartContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Cart.css';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // Dummy login check (adjust for your auth system)
  const isLoggedIn = !!localStorage.getItem('user');

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // if (!isLoggedIn) {
    //   alert('Please log in or sign up to place an order.');
    //   navigate('/signin', { state: { from: '/payment' } });
    //   return;
    // }

    navigate('/payment');
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <nav className="cart-navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/women" className="nav-link">Women</Link>
        <Link to="/men" className="nav-link">Men</Link>
        <Link to="/children" className="nav-link">Children</Link>
        <Link to="/beauty" className="nav-link">Beauty</Link>
        <Link to="/order-history" className="nav-link">Order History</Link>
        <Link to="/wishlist" className="nav-link">Wishlist</Link>
      </nav>

      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-grid">
            {cart.map((item) => (
              <div key={item.id} className="cart-card">
                <img src={item.pimg?`http://localhost:3002/prodimgs/${item.pimg}`: item.image } 
                 // assuming item.pimg exists
                    alt={item.name}
                    className="cart-img"/>

                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p><strong>Price:</strong> ${item.price}</p>

                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>

                  <p><strong>Total:</strong> ${(item.price * item.quantity).toFixed(2)}</p>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
