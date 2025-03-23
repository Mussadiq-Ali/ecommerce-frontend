import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { loadStripe } from "@stripe/stripe-js";

// 🛍️ Your Stripe public key
const stripePromise = loadStripe(
  "pk_test_51QxA8jQCDajt1BsgqEABMf65kjwuWA9wNqMOyXkqyHftggC2qHmgs4peEtjzn7pHrdlvoxOr9q8vvCNlioLnV6IP00hfwpTiou"
);

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);

  // 🛒 Payment Integration
  const makePayment = async () => {
    try {
      const stripe = await stripePromise;

      // Prepare products for Stripe Checkout
      const body = {
        products: all_product
          .filter((e) => cartItems[e.id] > 0)
          .map((e) => ({
            name: e.name,
            image: e.image,
            price: e.new_price,
            quantity: cartItems[e.id],
          })),
      };

      console.log("🟢 Products sent to backend:", body.products);

      const response = await fetch(
        "http://localhost:4000/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        console.error(
          "🔴 Failed to create checkout session. Status:",
          response.status
        );
        const errorData = await response.json();
        console.error("🔴 Error from backend:", errorData.message);
        return;
      }

      const session = await response.json();
      console.log("🟢 Stripe session created:", session);

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error("🔴 Stripe Redirect Error:", result.error.message);
      }
    } catch (error) {
      console.error("🔴 Payment Error:", error.message);
      alert("Payment could not be processed. Please try again.");
    }
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img
                  src={e.image}
                  alt={e.name}
                  className="carticon-product-icon"
                />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>${(e.new_price || 0) * cartItems[e.id]}</p>
                <img
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt="Remove"
                  className="cartitems-remove-icon"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>${getTotalCartAmount()}</h3>
              </div>
            </div>
            <button onClick={makePayment} className="btn-cart">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
