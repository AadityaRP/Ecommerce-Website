import React from 'react';
import './PromotionalBar.css';

const messages = [
    '🚚 FREE Delivery on all orders across India',
    '💊 Flat 12% OFF on your first order',
    '🎁 Buy 2 Get 1 FREE on selected combos',
    '🌿 100% Natural & Authentic Ayurvedic Products',
    '💳 Cash on Delivery (COD) Available PAN-India',
    '⭐ Trusted by 5 Lakh+ Happy Customers',
    '🔥 Up to 25% OFF on Super Saver Combos',
    '📦 Free shipping on orders above ₹499',
];

const PromotionalBar: React.FC = () => {
    const doubled = [...messages, ...messages];
    return (
        <div className="promo-bar">
            <div className="promo-track">
                {doubled.map((msg, i) => (
                    <span key={i} className="promo-item">
                        {msg} <span className="promo-dot">·</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default PromotionalBar;
