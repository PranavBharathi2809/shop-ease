import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../app/store";
import { addOrder } from "../order/orderSlice";
import { useCart } from "../Cart/cartContext";
import { sendTransaction } from "./paymentSlice";
import { useAppDispatch } from "../../app/hook";

const PaymentPage: React.FC = () => {
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const reduxEmail = useSelector((state: RootState) => state.auth.email);
  const email = reduxEmail ?? localStorage.getItem("userEmail") ?? "";

  const paymentState = useSelector((state: RootState) => state.payment);
  const { cart: cartItems, clearCart } = useCart();

  const totalAmount = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const generateInvoiceNo = () => {
    return "INV-" + Math.floor(Math.random() * 1000000);
  };

  const handleApprove = async (paypalDetails: any) => {
    if (!email) {
      alert("❌ Email not found. Please login again.");
      return;
    }

    const transactionId = paypalDetails.id;

    try {
      console.log("Sending transaction:", { email, transaction: { id: transactionId } });
      await dispatch(
        sendTransaction({
          email,
          transaction: { id: transactionId },
        })
      ).unwrap();

      console.log("✅ Transaction saved to microservice");

      const orderId = uuidv4();
      dispatch(
        addOrder({
          id: orderId,
          invoiceNo: generateInvoiceNo(),
          date: new Date().toISOString(),
          totalAmount: Number(totalAmount),
          items: cartItems.map((item) => ({
            ...item,
            id: String(item.id),
          })),
          email,
        })
      );

      clearCart();
      setIsPaid(true);
      setTimeout(() => navigate("/order"), 3000);
    } catch (error) {
      console.error("❌ Failed to save transaction:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      {isPaid ? (
        <h2 style={{ color: "green", fontSize: "24px" }}>
          ✅ Order placed successfully!
        </h2>
      ) : (
        <>
          <h2>Complete Your Payment</h2>
          <p>Total: ${totalAmount}</p>

          {paymentState.loading && (
            <p style={{ color: "blue" }}>Processing payment...</p>
          )}

          {paymentState.error && (
            <p style={{ color: "red" }}>
              ❌ {paymentState.error}
            </p>
          )}

          <div style={{ maxWidth: "400px", width: "100%" }}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: totalAmount,
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                if (actions.order) {
                  const details = await actions.order.capture();
                  handleApprove(details);
                }
              }}
              onError={(err) => {
                console.error("PayPal payment error:", err);
                alert("Payment failed. Please try again.");
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentPage;
