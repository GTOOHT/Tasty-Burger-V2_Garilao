import { useState } from "react";

const money = (value) => `₱${Number(value).toFixed(2)}`;

function BurgerCard({ burger, onAddToCart }) {
  const { image, name, description, price, rating } = burger;
  const [showDetails, setShowDetails] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const totalPrice = price * quantity;

  const addToCart = () => {
    onAddToCart(burger, quantity);
    setAddedToCart(true);
    window.setTimeout(() => setAddedToCart(false), 1800);
  };

  return <>
    <article className="burger-card" onClick={() => setShowDetails(true)} tabIndex="0" onKeyDown={(e) => { if (e.key === "Enter") setShowDetails(true); }}>
      <img src={image} alt={name} className="burger-image" />
      <div className="card-content">
        <div className="card-top"><div className="stars">{rating}</div><span className="heart" aria-hidden="true">♡</span></div>
        <h3>{name}</h3><p>{description}</p>
        <button onClick={(event) => { event.stopPropagation(); setShowDetails(true); }}>{money(price)}</button>
      </div>
    </article>
    {showDetails && <div className="product-overlay" onClick={() => setShowDetails(false)}>
      <div className="product-details" role="dialog" aria-modal="true" aria-label={`${name} details`} onClick={(event) => event.stopPropagation()}>
        <button className="close-button" onClick={() => setShowDetails(false)} aria-label="Close product details">×</button>
        <img src={image} alt={name} className="product-image" />
        <div className="product-info">
          <h2>{name}</h2><div className="product-rating">{rating}<span> 4.8</span></div><h3 className="product-price">{money(price)}</h3><p>{description}</p>
          <div className="quantity"><span>Quantity</span><button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button><span className="quantity-number">{quantity}</span><button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">+</button></div>
          <p className="total-price">Total: {money(totalPrice)}</p>
          <div className="product-buttons"><button className="add-cart" onClick={addToCart}>{addedToCart ? "Added to Cart ✓" : "Add to Cart"}</button><button className="buy-now" onClick={() => { addToCart(); setShowDetails(false); }}>Add & Keep Shopping</button></div>
          <div className="reviews"><h3>Customer Reviews</h3><div className="review"><strong>★★★★★</strong><p>Delicious burger and great flavor!</p></div><div className="review"><strong>★★★★☆</strong><p>Good burger. I would order again.</p></div></div>
        </div>
      </div>
    </div>}
  </>;
}
export default BurgerCard;
