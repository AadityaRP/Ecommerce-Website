import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard/ProductCard';
import { products } from '../data/products';
import './ProductListing.css';

const sortOptions = ['Popularity', 'Price: Low to High', 'Price: High to Low', 'Discount', 'Rating'];
const categories = [...new Set(products.map(p => p.category))];
const goals = [...new Set(products.flatMap(p => p.goal))];

const ProductListing: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [sort, setSort] = useState('Popularity');
    const [selCats, setSelCats] = useState<string[]>([]);
    const [selGoals, setSelGoals] = useState<string[]>([]);
    const [maxPrice, setMaxPrice] = useState(2000);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [localSearch, setLocalSearch] = useState('');

    const q = searchParams.get('q') || '';
    const catParam = searchParams.get('category') || '';
    const goalParam = searchParams.get('goal') || '';
    const condParam = searchParams.get('condition') || '';
    const tagParam = searchParams.get('tag') || '';

    const filtered = useMemo(() => {
        let res = [...products];
        if (q) res = res.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase()));
        if (catParam) res = res.filter(p => p.category === catParam);
        if (goalParam) res = res.filter(p => p.goal.includes(goalParam));
        if (condParam) res = res.filter(p => p.condition.includes(condParam));
        if (tagParam === 'bestseller') res = res.filter(p => p.isBestSeller);
        if (selCats.length) res = res.filter(p => selCats.includes(p.category));
        if (selGoals.length) res = res.filter(p => p.goal.some(g => selGoals.includes(g)));
        res = res.filter(p => p.price <= maxPrice);
        if (localSearch) res = res.filter(p => p.name.toLowerCase().includes(localSearch.toLowerCase()));
        switch (sort) {
            case 'Price: Low to High': res.sort((a, b) => a.price - b.price); break;
            case 'Price: High to Low': res.sort((a, b) => b.price - a.price); break;
            case 'Discount': res.sort((a, b) => b.discount - a.discount); break;
            case 'Rating': res.sort((a, b) => b.rating - a.rating); break;
        }
        return res;
    }, [q, catParam, goalParam, condParam, tagParam, selCats, selGoals, maxPrice, sort, localSearch]);

    const toggleCat = (c: string) => setSelCats(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
    const toggleGoal = (g: string) => setSelGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

    const pageTitle = catParam || goalParam || condParam || (tagParam === 'bestseller' ? 'Best Sellers' : '') || q || 'All Products';

    return (
        <main className="page-content plp-page">
            <div className="container">
                <div className="plp-header">
                    <div>
                        <h1 className="plp-title">{pageTitle}</h1>
                        <p className="plp-count">{filtered.length} products found</p>
                    </div>
                    <div className="plp-controls">
                        <div className="plp-search">
                            <Search size={16} />
                            <input placeholder="Filter products..." value={localSearch} onChange={e => setLocalSearch(e.target.value)} />
                        </div>
                        <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                            {sortOptions.map(o => <option key={o}>{o}</option>)}
                        </select>
                        <button className="filter-btn hide-desktop" onClick={() => setSidebarOpen(true)}>
                            <Filter size={16} /> Filters
                        </button>
                    </div>
                </div>

                <div className="plp-layout">
                    {/* Sidebar */}
                    <aside className={`plp-sidebar ${sidebarOpen ? 'open' : ''}`}>
                        <div className="sidebar-header">
                            <h3>Filters</h3>
                            <button className="sidebar-close hide-desktop" onClick={() => setSidebarOpen(false)}><X size={18} /></button>
                        </div>

                        <div className="filter-group">
                            <h4>Category <ChevronDown size={14} /></h4>
                            {categories.map(c => (
                                <label key={c} className="filter-label">
                                    <input type="checkbox" checked={selCats.includes(c)} onChange={() => toggleCat(c)} />
                                    <span>{c}</span>
                                </label>
                            ))}
                        </div>

                        <div className="filter-group">
                            <h4>Health Goal <ChevronDown size={14} /></h4>
                            {goals.map(g => (
                                <label key={g} className="filter-label">
                                    <input type="checkbox" checked={selGoals.includes(g)} onChange={() => toggleGoal(g)} />
                                    <span>{g}</span>
                                </label>
                            ))}
                        </div>

                        <div className="filter-group">
                            <h4>Max Price: ₹{maxPrice}</h4>
                            <input type="range" min={100} max={2000} step={50} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} className="price-range" />
                            <div className="range-labels"><span>₹100</span><span>₹2000</span></div>
                        </div>

                        <button className="clear-filters" onClick={() => { setSelCats([]); setSelGoals([]); setMaxPrice(2000); setLocalSearch(''); }}>
                            Clear All Filters
                        </button>
                    </aside>
                    {sidebarOpen && <div className="overlay hide-desktop" onClick={() => setSidebarOpen(false)} />}

                    {/* Grid */}
                    <div className="plp-grid">
                        {filtered.length === 0 ? (
                            <div className="no-products">
                                <div style={{ fontSize: '3rem' }}>🔍</div>
                                <h3>No products found</h3>
                                <p>Try different filters or <Link to="/products">browse all products</Link></p>
                            </div>
                        ) : (
                            filtered.map(p => <ProductCard key={p.id} product={p} />)
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductListing;
