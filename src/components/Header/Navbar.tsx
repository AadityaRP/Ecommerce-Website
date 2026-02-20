import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Truck, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import MegaMenuCategory from './MegaMenu/MegaMenuCategory';
import MegaMenuCondition from './MegaMenu/MegaMenuCondition';
import MegaMenuCombos from './MegaMenu/MegaMenuCombos';
import MegaMenuGoal from './MegaMenu/MegaMenuGoal';
import ammaLogo from '../../assets/amma_foods_logo.jpg';
import './Navbar.css';

const navItems = [
    { label: 'Shop By Category', menu: 'category' },
    { label: 'Shop By Condition', menu: 'condition' },
    { label: 'Super Saver Combos', menu: 'combos' },
    { label: 'Shop By Goal', menu: 'goal' },
];

const Navbar: React.FC = () => {
    const { cartCount, toggleCart } = useCart();
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [search, setSearch] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleMenuEnter = (menu: string) => {
        if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
        setActiveMenu(menu);
    };
    const handleMenuLeave = () => {
        timeoutRef.current = window.setTimeout(() => setActiveMenu(null), 150);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) navigate(`/products?q=${encodeURIComponent(search.trim())}`);
    };

    const renderMegaMenu = () => {
        if (!activeMenu) return null;
        switch (activeMenu) {
            case 'category': return <MegaMenuCategory />;
            case 'condition': return <MegaMenuCondition />;
            case 'combos': return <MegaMenuCombos />;
            case 'goal': return <MegaMenuGoal />;
            default: return null;
        }
    };

    return (
        <>
            <div className={`header-wrapper ${scrolled ? 'scrolled' : ''}`} ref={menuRef}>
                {/* Main Header */}
                <header className="main-header">
                    <div className="container header-inner">
                        {/* Logo */}
                        <Link to="/" className="logo">
                            <div className="logo-icon">
                                <img src={ammaLogo} alt="AmmaFoods Logo" style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '50%' }} />
                            </div>
                            <div className="logo-text">
                                <span className="logo-name">AmmaFoods</span>
                                <span className="logo-tag">Herbal · Healthy · Tasty</span>
                            </div>
                        </Link>

                        {/* Search */}
                        <form className="search-form hide-mobile" onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Search herbs, supplements, teas..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="search-input"
                            />
                            <button type="submit" className="search-btn">
                                <Search size={18} />
                            </button>
                        </form>

                        {/* Right Icons */}
                        <div className="header-actions">
                            <div
                                className="action-icon delivery-icon hide-mobile"
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            >
                                <Truck size={22} />
                                {showTooltip && (
                                    <div className="delivery-tooltip">
                                        <strong>Free PAN-India Delivery</strong>
                                        <span>On orders above ₹499</span>
                                        <span>COD Available</span>
                                    </div>
                                )}
                            </div>

                            <button className="action-icon cart-btn" onClick={toggleCart} aria-label="Open cart">
                                <ShoppingCart size={22} />
                                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                            </button>

                            <button
                                className="hamburger hide-desktop"
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label="Toggle menu"
                            >
                                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Nav Bar */}
                <nav className="primary-nav hide-mobile">
                    <div className="container nav-inner">
                        {navItems.map(item => (
                            <div
                                key={item.menu}
                                className={`nav-item ${activeMenu === item.menu ? 'active' : ''}`}
                                onMouseEnter={() => handleMenuEnter(item.menu)}
                                onMouseLeave={handleMenuLeave}
                            >
                                <span className="nav-label">
                                    {item.label}
                                    <ChevronDown size={14} className="nav-chevron" />
                                </span>
                                {activeMenu === item.menu && (
                                    <div
                                        className="mega-menu-wrapper"
                                        onMouseEnter={() => handleMenuEnter(item.menu)}
                                        onMouseLeave={handleMenuLeave}
                                    >
                                        {renderMegaMenu()}
                                    </div>
                                )}
                            </div>
                        ))}
                        <Link to="/products" className="nav-item nav-link-plain">All Products</Link>
                        <Link to="/products?tag=bestseller" className="nav-item nav-link-plain nav-highlight">🔥 Best Sellers</Link>
                        <Link to="/maruthompal" className="nav-item nav-link-plain nav-maruthompal">🌿 Maruthompal</Link>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="mobile-menu">
                    <form className="search-form mobile-search" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-btn"><Search size={18} /></button>
                    </form>
                    {navItems.map(item => (
                        <div key={item.menu} className="mobile-nav-item">
                            <button
                                className="mobile-nav-btn"
                                onClick={() => setActiveMenu(activeMenu === item.menu ? null : item.menu)}
                            >
                                {item.label}
                                <ChevronDown size={14} style={{ transform: activeMenu === item.menu ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                            </button>
                        </div>
                    ))}
                    <Link to="/products" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>All Products</Link>
                    <Link to="/products?tag=bestseller" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Best Sellers</Link>
                    <Link to="/maruthompal" className="mobile-nav-link mobile-maruthompal" onClick={() => setMobileOpen(false)}>🌿 Maruthompal</Link>
                </div>
            )}
        </>
    );
};

export default Navbar;
