import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard/ProductCard';
import { products, bestSellers } from '../data/products';
import './Home.css';

const heroBanners = [
    {
        title: 'Nature\'s Best for Your Health',
        sub: 'Premium Herbal Supplements, Organic Foods & Teas',
        cta: 'Shop Now',
        link: '/products',
        bg: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%)',
        img: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80',
    },
    {
        title: 'Super Saver Combos',
        sub: 'Curated wellness bundles – Up to 25% OFF',
        cta: 'Explore Combos',
        link: '/products?category=Super+Saver+Combos',
        bg: 'linear-gradient(135deg, #e65100 0%, #f57c00 100%)',
        img: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80',
    },
    {
        title: 'PAN-India Free Delivery',
        sub: 'COD Available · Authentic Products · 5 Lakh+ Customers',
        cta: 'Browse Products',
        link: '/products',
        bg: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
        img: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&q=80',
    },
];

const goalCarousel = [
    { icon: '⚡', label: 'Energy', color: '#ff6b35' },
    { icon: '🧘', label: 'Calm', color: '#7b68ee' },
    { icon: '🫃', label: 'Digestion', color: '#2e7d32' },
    { icon: '🛡️', label: 'Immunity', color: '#e65100' },
    { icon: '🚿', label: 'Detox', color: '#00838f' },
    { icon: '💪', label: 'Fitness', color: '#1565c0' },
    { icon: '😴', label: 'Sleep', color: '#4a148c' },
    { icon: '⚖️', label: 'Weight', color: '#bf360c' },
];

const goalProducts = products.slice(0, 6);
const bestSellerItems = bestSellers.slice(0, 8);

const testimonials = [
    { name: 'Priya S.', loc: 'Mumbai', rating: 5, text: 'The Moringa Powder has transformed my energy levels. I feel so much more active!', avatar: 'P' },
    { name: 'Raj K.', loc: 'Delhi', rating: 5, text: 'Liver & Kidney Care capsules are incredible. My liver enzymes are back to normal.', avatar: 'R' },
    { name: 'Ananya M.', loc: 'Bangalore', rating: 5, text: 'Chamomile Tea is my nightly ritual now. Deep, restful sleep every night!', avatar: 'A' },
];

const Home: React.FC = () => {
    const [heroCurrent, setHeroCurrent] = useState(0);
    const [goalStart, setGoalStart] = useState(0);
    const [bsStart, setBsStart] = useState(0);
    const heroTimer = useRef<number | null>(null);

    React.useEffect(() => {
        heroTimer.current = window.setInterval(() => setHeroCurrent(c => (c + 1) % heroBanners.length), 5000);
        return () => { if (heroTimer.current !== null) clearInterval(heroTimer.current); };
    }, []);

    const visibleGoal = goalProducts.slice(goalStart, goalStart + 4);
    const visibleBs = bestSellerItems.slice(bsStart, bsStart + 4);

    return (
        <main className="page-content">
            {/* Hero */}
            <section className="hero-section">
                <div className="hero-slider">
                    {heroBanners.map((b, i) => (
                        <div
                            key={i}
                            className={`hero-slide ${i === heroCurrent ? 'active' : ''}`}
                            style={{ background: b.bg }}
                        >
                            <div className="hero-img-wrap">
                                <img src={b.img} alt={b.title} />
                            </div>
                            <div className="hero-content">
                                <h1 className="hero-title">{b.title}</h1>
                                <p className="hero-sub">{b.sub}</p>
                                <div className="hero-ctas">
                                    <Link to={b.link} className="btn btn-accent">{b.cta}</Link>
                                    <Link to="/products" className="btn btn-outline hero-outline">View All Products</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="hero-dots">
                        {heroBanners.map((_, i) => (
                            <button key={i} className={`hero-dot ${i === heroCurrent ? 'active' : ''}`} onClick={() => setHeroCurrent(i)} />
                        ))}
                    </div>
                    <button className="hero-arrow left" onClick={() => setHeroCurrent(c => (c - 1 + heroBanners.length) % heroBanners.length)}>
                        <ChevronLeft size={20} />
                    </button>
                    <button className="hero-arrow right" onClick={() => setHeroCurrent(c => (c + 1) % heroBanners.length)}>
                        <ChevronRight size={20} />
                    </button>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="badges-section">
                <div className="container badges-inner">
                    <div className="trust-badge"><Truck size={22} /><span>Free PAN-India Delivery</span></div>
                    <div className="trust-badge"><ShieldCheck size={22} /><span>100% Authentic Products</span></div>
                    <div className="trust-badge"><Star size={22} /><span>5 Lakh+ Happy Customers</span></div>
                    <div className="trust-badge"><RefreshCw size={22} /><span>Easy Returns & Refunds</span></div>
                </div>
            </section>

            {/* Goal Tiles */}
            <section className="section goals-section">
                <div className="container">
                    <h2 className="section-title">Shop By Goal</h2>
                    <p className="section-sub">Find the right products tailored to your health goals</p>
                    <div className="goal-tiles">
                        {goalCarousel.map(g => (
                            <Link key={g.label} to={`/products?goal=${g.label}`} className="goal-pill" style={{ '--gc': g.color } as React.CSSProperties}>
                                <span className="goal-pill-icon">{g.icon}</span>
                                <span>{g.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Shop By Goal Products */}
            <section className="section carousel-section">
                <div className="container">
                    <div className="section-header">
                        <div>
                            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 0 }}>Featured Products</h2>
                            <p className="section-sub" style={{ textAlign: 'left', marginBottom: 0 }}>Handpicked for your wellness journey</p>
                        </div>
                        <div className="carousel-arrows">
                            <button className="carousel-btn" onClick={() => setGoalStart(Math.max(0, goalStart - 1))} disabled={goalStart === 0}>
                                <ChevronLeft size={18} />
                            </button>
                            <button className="carousel-btn" onClick={() => setGoalStart(Math.min(goalProducts.length - 4, goalStart + 1))} disabled={goalStart >= goalProducts.length - 4}>
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                    <div className="products-grid">
                        {visibleGoal.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                </div>
            </section>

            {/* Best Sellers */}
            <section className="section carousel-section bestsellers-bg">
                <div className="container">
                    <div className="section-header">
                        <div>
                            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 0 }}>⭐ Our Best Sellers</h2>
                            <p className="section-sub" style={{ textAlign: 'left', marginBottom: 0 }}>Most loved by our customers</p>
                        </div>
                        <div className="carousel-arrows">
                            <button className="carousel-btn" onClick={() => setBsStart(Math.max(0, bsStart - 1))} disabled={bsStart === 0}>
                                <ChevronLeft size={18} />
                            </button>
                            <button className="carousel-btn" onClick={() => setBsStart(Math.min(bestSellerItems.length - 4, bsStart + 1))} disabled={bsStart >= bestSellerItems.length - 4}>
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                    <div className="products-grid">
                        {visibleBs.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 28 }}>
                        <Link to="/products?tag=bestseller" className="view-all-cta">View All Best Sellers →</Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section why-section">
                <div className="container">
                    <h2 className="section-title">Why Choose AmmaFoods?</h2>
                    <div className="why-grid">
                        {[
                            { icon: '🌿', title: '100% Natural', desc: 'All products are made from pure, natural ingredients — no synthetic additives.' },
                            { icon: '🔬', title: 'Lab Tested', desc: 'Every batch is tested for quality, purity, and potency by third-party labs.' },
                            { icon: '📜', title: 'FSSAI Certified', desc: 'All products comply with Indian food safety standards and AYUSH guidelines.' },
                            { icon: '🚚', title: 'Free Delivery', desc: 'Free shipping across India on orders above ₹499. COD available.' },
                            { icon: '💚', title: 'Eco-Friendly', desc: 'Sustainable packaging, minimal plastic, and carbon-conscious operations.' },
                            { icon: '🏆', title: '5 Lakh+ Happy Customers', desc: 'Over 5 lakh satisfied customers trust AmmaFoods for their health needs.' },
                        ].map(w => (
                            <div key={w.title} className="why-card">
                                <div className="why-icon">{w.icon}</div>
                                <h3>{w.title}</h3>
                                <p>{w.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section testimonial-section">
                <div className="container">
                    <h2 className="section-title">What Our Customers Say</h2>
                    <div className="testimonials-grid">
                        {testimonials.map(t => (
                            <div key={t.name} className="testimonial-card">
                                <div className="t-stars">
                                    {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} fill="#f9a825" color="#f9a825" />)}
                                </div>
                                <p className="t-text">"{t.text}"</p>
                                <div className="t-author">
                                    <div className="t-avatar">{t.avatar}</div>
                                    <div><strong>{t.name}</strong><span>{t.loc}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
