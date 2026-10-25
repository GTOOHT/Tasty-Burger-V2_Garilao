import { useMemo, useState } from "react";
import BurgerCard from "./BurgerCard";

function BurgerSection({ burgers, onAddToCart }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("all");
  const categories = ["All", ...new Set(burgers.map((burger) => burger.category))];

  const filteredBurgers = useMemo(() => burgers.filter((burger) => {
    const matchesSearch = burger.name.toLowerCase().includes(search.trim().toLowerCase());
    const matchesCategory = category === "All" || burger.category === category;
    const matchesPrice = priceFilter === "all" || (priceFilter === "under-80" ? burger.price < 80 : priceFilter === "80-100" ? burger.price >= 80 && burger.price <= 100 : burger.price > 100);
    return matchesSearch && matchesCategory && matchesPrice;
  }), [burgers, search, category, priceFilter]);

  return (
    <section className="burger-section" id="menu">
      <h2>OUR CRAZY BURGERS</h2>
      <p className="description" id="about">Get ready for a wild ride of flavors! Our crazy burgers are loaded with juicy patties, bold toppings, and irresistible sauces, all stacked on a perfectly toasted bun. Whether you like it cheesy, or extra meaty, we've got a burger that will blow your mind!</p>
      <div className="product-tools">
        <label className="search-field"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search burgers..." aria-label="Search burger names" /></label>
        <label><span className="filter-label">Category</span><select value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span className="filter-label">Price</span><select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}><option value="all">Any price</option><option value="under-80">Under ₱80</option><option value="80-100">₱80 – ₱100</option><option value="over-100">Over ₱100</option></select></label>
      </div>
      <p className="results-count">{filteredBurgers.length} burger{filteredBurgers.length === 1 ? "" : "s"} found</p>
      {filteredBurgers.length ? <div className="burger-container">{filteredBurgers.map((burger) => <BurgerCard key={burger.id} burger={burger} onAddToCart={onAddToCart} />)}</div> : <div className="no-results"><h3>No burgers found</h3><p>Try another name or change your filters.</p><button onClick={() => { setSearch(""); setCategory("All"); setPriceFilter("all"); }}>Clear filters</button></div>}
      <div id="contact" className="contact-anchor" />
    </section>
  );
}
export default BurgerSection;
