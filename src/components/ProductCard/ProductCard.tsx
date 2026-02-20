import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../data/products';
import './ProductCard.css';

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const { addToCart } = useCart();
    const [selectedPack, setSelectedPack] = useState(product.packs[0]);
    const [added, setAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            quantity: 1,
            pack: selectedPack,
            discount: product.discount,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
    };

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="card-img-link">
                <div className="card-img-wrap">
                    <img src={product.image} alt={product.name} loading="lazy" />
                    {product.discount > 0 && (
                        <span className="card-discount">{product.discount}% OFF</span>
                    )}
                    {product.tag && product.tag !== `${product.discount}% OFF` && (
                        <span className="card-tag">{product.tag}</span>
                    )}
                </div>
            </Link>

            <div className="card-body">
                <div className="card-rating">
                    <Star size={12} fill="#f9a825" color="#f9a825" />
                    <span>{product.rating}</span>
                    <span className="rating-count">({product.reviews.toLocaleString()})</span>
                </div>

                <Link to={`/product/${product.id}`} className="card-name">{product.name}</Link>

                <div className="card-price">
                    <span className="price-now">₹{product.price}</span>
                    <span className="price-was">₹{product.originalPrice}</span>
                    <span className="price-save">Save ₹{product.originalPrice - product.price}</span>
                </div>

                {product.packs.length > 1 && (
                    <div className="card-packs">
                        {product.packs.map(p => (
                            <button
                                key={p}
                                className={`pack-btn ${selectedPack === p ? 'active' : ''}`}
                                onClick={() => setSelectedPack(p)}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                )}

                <button
                    className={`card-atc ${added ? 'added' : ''}`}
                    onClick={handleAddToCart}
                >
                    {added ? (
                        <><Check size={15} /> Added!</>
                    ) : (
                        <><ShoppingCart size={15} /> Add to Cart</>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
