import { useMemo, useState } from "react";
import Navbar from "./assets/components/Navbar";
import BurgerSection from "./assets/components/BurgerSection";
import burger1 from "./assets/components/images/burger1.png";
import burger2 from "./assets/components/images/burger2.png";
import burger3 from "./assets/components/images/burger3.png";
import burger4 from "./assets/components/images/burger4.png";
import "./App.css";

const burgers = [
  { id: 1, image: burger1, name: "Classic Cheese Bai-ger", description: "A traditional, balanced burger with fresh toppings", price: 99.15, rating: "★★★★★", category: "Classic" },
  { id: 2, image: burger2, name: "Bai-beque Burger", description: "Rich, smoky and savory with a heavy bacon topping", price: 99.32, rating: "★★★★☆", category: "Specialty" },
  { id: 3, image: burger3, name: "Spicy Bai-ger", description: "Designed for people who enjoy heat and bold flavors", price: 69.15, rating: "★★★★☆", category: "Spicy" },
  { id: 4, image: burger4, name: "Double Bai One Take One Burger", description: "Extra-meaty option with two beef patties and two layers of cheese", price: 99.25, rating: "★★★★☆", category: "Specialty" },
];

const money = (value) => `₱${Number(value).toFixed(2)}`;

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", payment: "Cash on Delivery" });

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (burger, quantity = 1) => {
    setCart((current) => {
      const found = current.find((item) => item.id === burger.id);
      if (found) return current.map((item) => item.id === burger.id ? { ...item, quantity: item.quantity + quantity } : item);
      return [...current, { ...burger, quantity }];
    });
  };

  const changeQuantity = (id, amount) => {
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item));
  };
  const removeItem = (id) => setCart((current) => current.filter((item) => item.id !== id));

  const submitOrder = (event) => {
    event.preventDefault();
    setCart([]);
    setCheckoutOpen(false);
    setCartOpen(false);
    setOrderComplete(true);
  };

  return (
    <>
      <Navbar cartCount={itemCount} onCartClick={() => setCartOpen(true)} />
      <main>
        <BurgerSection burgers={burgers} onAddToCart={addToCart} />
      </main>

      {cartOpen && <div className="modal-backdrop" onClick={() => setCartOpen(false)}>
        <section className="cart-panel" role="dialog" aria-modal="true" aria-label="Shopping cart" onClick={(event) => event.stopPropagation()}>
          <div className="panel-heading"><h2>Your Shopping Cart</h2><button className="icon-close" onClick={() => setCartOpen(false)} aria-label="Close cart">×</button></div>
          {cart.length === 0 ? <div className="empty-cart"><span>🛍️</span><h3>Your cart is empty</h3><p>Add a delicious burger to get started.</p><button className="primary-button" onClick={() => setCartOpen(false)}>Browse burgers</button></div> :
            <>
              <div className="cart-items">{cart.map((item) => <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info"><h3>{item.name}</h3><p>{money(item.price)} each</p><div className="cart-quantity"><button onClick={() => changeQuantity(item.id, -1)} aria-label={`Decrease ${item.name} quantity`}>−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label={`Increase ${item.name} quantity`}>+</button></div></div>
                <div className="cart-item-end"><strong>{money(item.price * item.quantity)}</strong><button className="remove-button" onClick={() => removeItem(item.id)}>Remove</button></div>
              </article>)}</div>
              <div className="cart-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Delivery fees, if any, are calculated separately.</p><button className="primary-button" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>Proceed to checkout</button></div>
            </>}
        </section>
      </div>}

      {checkoutOpen && <div className="modal-backdrop" onClick={() => setCheckoutOpen(false)}>
        <section className="checkout-panel" role="dialog" aria-modal="true" aria-label="Checkout" onClick={(event) => event.stopPropagation()}>
          <div className="panel-heading"><h2>Checkout</h2><button className="icon-close" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout">×</button></div>
          <form onSubmit={submitOrder} className="checkout-form">
            <h3>Customer details</h3>
            <label>Full name<input required value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} placeholder="Enter your full name" /></label>
            <label>Phone number<input required type="tel" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} placeholder="e.g. 09XX XXX XXXX" /></label>
            <label>Delivery address<textarea required value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} placeholder="House number, street, barangay, city" rows="3" /></label>
            <h3>Payment method</h3>
            <label className="payment-option"><input type="radio" name="payment" value="Cash on Delivery" checked={customer.payment === "Cash on Delivery"} onChange={(e) => setCustomer({ ...customer, payment: e.target.value })} /> Cash on Delivery</label>
            <label className="payment-option"><input type="radio" name="payment" value="GCash (demo)" checked={customer.payment === "GCash (demo)"} onChange={(e) => setCustomer({ ...customer, payment: e.target.value })} /> GCash (demo)</label>
            <div className="order-review"><h3>Order review</h3>{cart.map((item) => <div key={item.id}><span>{item.name} × {item.quantity}</span><strong>{money(item.price * item.quantity)}</strong></div>)}<div className="review-total"><span>Subtotal</span><strong>{money(subtotal)}</strong></div></div>
            <p className="demo-note">Demo checkout only. No payment will be collected.</p>
            <button className="primary-button" type="submit">Place order · {money(subtotal)}</button>
          </form>
        </section>
      </div>}

      {orderComplete && <div className="modal-backdrop" onClick={() => setOrderComplete(false)}><section className="success-panel" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}><div className="success-mark">✓</div><h2>Thank you for your order!</h2><p>Your demo order has been received. No payment was processed.</p><button className="primary-button" onClick={() => setOrderComplete(false)}>Continue shopping</button></section></div>}
    </>
  );
}

export default App;
