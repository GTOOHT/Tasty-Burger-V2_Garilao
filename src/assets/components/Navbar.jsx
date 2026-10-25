import logo from "./images/logo.png";

function Navbar({ cartCount = 0, onCartClick = () => {} }) {
  return (
    <header className="navbar">
      <a className="logo" href="#" aria-label="Devil's Burger home"><img src={logo} alt="BAI - BURGER" /></a>
      <nav>
        <a href="#about">ABOUT</a>
        <a href="#menu">OUR MENU</a>
        <a href="#menu">SHOP</a>
        <a href="#contact">CONTACT</a>
        <button className="cart cart-trigger" onClick={onCartClick} aria-label={`Open shopping cart with ${cartCount} items`}>
          🛍️<span>{cartCount}</span>
        </button>
      </nav>
    </header>
  );
}
export default Navbar;
