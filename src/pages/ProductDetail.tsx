import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart, Check, Star, Minus, Plus, Truck, Shield, RefreshCw } from 'lucide-react';
import { getProductById, getAllProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard/ProductCard';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product = getProductById(id || '');
    const { addToCart } = useCart();
    const [mainImg, setMainImg] = useState(0);
    const [selectedPack, setSelectedPack] = useState(product?.packs[0] || '');
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);
    const [tab, setTab] = useState('description');

    if (!product) {
        return (
            <main className="page-content">
                <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
                    <div style={{ fontSize: '3rem' }}>😕</div>
                    <h2>Product not found</h2>
                    <Link to="/products" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>Browse Products</Link>
                </div>
            </main>
        );
    }

    const related = getAllProducts().filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    const handleAddToCart = () => {
        addToCart({ id: product.id, name: product.name, price: product.price, originalPrice: product.originalPrice, image: product.image, quantity: qty, pack: selectedPack, discount: product.discount });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <main className="page-content">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <Link to={`/products?category=${encodeURIComponent(product.category)}`}>{product.category}</Link> / <span>{product.name}</span>
                </nav>

                <div className="pdp-layout">
                    {/* Gallery */}
                    <div className="pdp-gallery">
                        <div className="main-img-wrap">
                            <img src={product.images[mainImg]} alt={product.name} />
                            {product.images.length > 1 && (
                                <>
                                    <button className="gallery-arrow left" onClick={() => setMainImg(i => (i - 1 + product.images.length) % product.images.length)}><ChevronLeft size={18} /></button>
                                    <button className="gallery-arrow right" onClick={() => setMainImg(i => (i + 1) % product.images.length)}><ChevronRight size={18} /></button>
                                </>
                            )}
                            {product.discount > 0 && <span className="pdp-discount-badge">{product.discount}% OFF</span>}
                        </div>
                        <div className="thumbnails">
                            {product.images.map((img, i) => (
                                <button key={i} className={`thumb ${i === mainImg ? 'active' : ''}`} onClick={() => setMainImg(i)}>
                                    <img src={img} alt={`${product.name} view ${i + 1}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="pdp-info">
                        <div className="pdp-category-tag">{product.category}</div>
                        <h1 className="pdp-title">{product.name}</h1>

                        <div className="pdp-rating">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={16} fill={i < Math.round(product.rating) ? '#f9a825' : 'none'} color={i < Math.round(product.rating) ? '#f9a825' : '#ccc'} />
                            ))}
                            <span className="rating-val">{product.rating}</span>
                            <span className="rating-rev">({product.reviews.toLocaleString()} reviews)</span>
                        </div>

                        <div className="pdp-price-block">
                            <span className="pdp-price">₹{product.price}</span>
                            <span className="pdp-was">₹{product.originalPrice}</span>
                            <span className="pdp-saving">You save ₹{product.originalPrice - product.price} ({product.discount}%)</span>
                        </div>

                        <div className="pdp-free-delivery">
                            <Truck size={16} /> <span>Free delivery on orders above ₹499 · COD Available</span>
                        </div>

                        {/* Pack Selector */}
                        <div className="pdp-section-label">Choose Pack Size</div>
                        <div className="pdp-packs">
                            {product.packs.map(p => (
                                <button key={p} className={`pdp-pack ${selectedPack === p ? 'active' : ''}`} onClick={() => setSelectedPack(p)}>{p}</button>
                            ))}
                        </div>

                        {/* Qty */}
                        <div className="pdp-section-label">Quantity</div>
                        <div className="pdp-qty">
                            <button onClick={() => setQty(q => Math.max(1, q - 1))}><Minus size={16} /></button>
                            <span>{qty}</span>
                            <button onClick={() => setQty(q => q + 1)}><Plus size={16} /></button>
                        </div>

                        {/* CTA */}
                        <button className={`pdp-atc ${added ? 'added' : ''}`} onClick={handleAddToCart}>
                            {added ? <><Check size={18} /> Added to Cart!</> : <><ShoppingCart size={18} /> Add to Cart</>}
                        </button>

                        {/* Trust */}
                        <div className="pdp-trust">
                            <div className="trust-item"><Shield size={16} /><span>100% Natural & Authentic</span></div>
                            <div className="trust-item"><RefreshCw size={16} /><span>7-Day Easy Returns</span></div>
                            <div className="trust-item"><Truck size={16} /><span>PAN-India Delivery</span></div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="pdp-tabs">
                    {['description', 'benefits', 'howToUse', 'ingredients'].map(t => (
                        <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                            {t === 'howToUse' ? 'How to Use' : t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="tab-content">
                    {tab === 'description' && <p>{product.description}</p>}
                    {tab === 'benefits' && <ul className="benefits-list">{product.benefits.map(b => <li key={b}>✅ {b}</li>)}</ul>}
                    {tab === 'howToUse' && <p>{product.howToUse}</p>}
                    {tab === 'ingredients' && <p>{product.ingredients}</p>}
                </div>

                {/* Related */}
                {related.length > 0 && (
                    <section className="related-section">
                        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 20 }}>You May Also Like</h2>
                        <div className="related-grid">
                            {related.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
};

export default ProductDetail;
