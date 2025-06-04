import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import "../styles/OrderPage.css" // Custom CSS file below
import Navbar from "../components/Navbar";

const OrderHistoryPage: React.FC = () => {
  const email = useSelector((state: RootState) => state.auth.email);
  const orders = useSelector((state: RootState) =>
    state.order.history.filter((order) => order.email === email)
  );

  return (
<>
<Navbar/>
    <div className="order-history-container">
    
      <h1 className="order-history-title">Your Order History</h1>

      {orders.length === 0 ? (
        <p className="no-orders-message">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              <div>
                <span className="label">Invoice No:</span> #{order.invoiceNo}
                <span className="label"> Date:</span> {order.date}
                <span className="label"> Total:</span> ${order.totalAmount.toFixed(2)}
              </div>
              {/* <span className="status-badge">
                {order.status ?? "Pending"}
              </span> */}
            </div>
            <hr className="divider" />
            <div className="order-items">
              {order.items.map((item) => (
                <p key={item.id}>
                  <strong>{item.name}</strong> — Quantity: {item.quantity}
                </p>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
    </>
  );
};

export default OrderHistoryPage;
