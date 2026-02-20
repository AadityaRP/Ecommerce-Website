import React from 'react';
import { Link } from 'react-router-dom';
import './MegaMenu.css';

const categories = [
    {
        icon: '🌿', name: 'Herbal Supplements', sub: ['Single Herb', 'Multi-Herb', 'Condition Specific'], cat: 'Herbal Supplements',
    },
    { icon: '🌾', name: 'Organic Foods', sub: ['Pulses & Dals', 'Salt & Spices', 'Oats & Quinoa'], cat: 'Organic Foods' },
    { icon: '🍵', name: 'Teas & Infusions', sub: ['Green Teas', 'Herbal Infusions', 'Black Tea', 'Detox Teas'], cat: 'Teas & Infusions' },
    { icon: '🧘', name: 'Detox Programs', sub: ['Kits', 'Shakes', 'Colon Cleanse'], cat: 'Detox Programs' },
    { icon: '🍯', name: 'Sugar Alternatives', sub: ['Honey', 'Jaggery', 'Stevia', 'Khandsari Sugar'], cat: 'Sugar Alternatives' },
    { icon: '🫒', name: 'Oils & Ghee', sub: ['Cow Ghee', 'Cold Pressed Oils'], cat: 'Oils & Ghee' },
    { icon: '☕', name: 'Coffee', sub: ['Filter Coffee', 'Herbal Coffee', 'Cold Brew'], cat: 'Coffee' },
    { icon: '🎁', name: 'Gift Boxes', sub: ['Wellness Kits', 'Festival Combos'], cat: 'Gift Boxes' },
    { icon: '💪', name: 'Gym Diet', sub: ['Plant Proteins', 'Fitness Supplements', 'Energy Foods'], cat: 'Gym Diet', isNew: true },
];

const MegaMenuCategory: React.FC = () => (
    <div className="mega-menu">
        <div className="container mega-inner">
            <div className="mega-grid">
                {categories.map(cat => (
                    <div className="mega-cat" key={cat.name}>
                        <Link to={`/products?category=${encodeURIComponent(cat.cat)}`} className="mega-cat-title">
                            <span className="mega-cat-icon">{cat.icon}</span>
                            {cat.name}
                            {cat.isNew && <span className="mega-new-badge">NEW</span>}
                        </Link>
                        <ul className="mega-sub-list">
                            {cat.sub.map(s => (
                                <li key={s}>
                                    <Link to={`/products?category=${encodeURIComponent(cat.cat)}&sub=${encodeURIComponent(s)}`}>
                                        {s}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default MegaMenuCategory;
