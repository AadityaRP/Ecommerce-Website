import React from 'react';
import { Link } from 'react-router-dom';
import './MegaMenu.css';

const combos = [
    { name: 'Active Start Combo', img: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=200&q=80', off: '20% OFF', id: 'p6' },
    { name: 'Calm & Balance Combo', img: 'https://images.unsplash.com/photo-1611694300810-c1c3e84bc3f8?w=200&q=80', off: '21% OFF', id: 'p7' },
    { name: 'Gut Reset Combo', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=80', off: '22% OFF', id: 'p8' },
    { name: 'Wellness Starter Pack', img: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=200&q=80', off: '25% OFF', id: 'p9' },
    { name: 'Clean 7 Days Kit', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=200&q=80', off: '20% OFF', id: 'p10' },
];

const MegaMenuCombos: React.FC = () => (
    <div className="mega-menu">
        <div className="container mega-inner">
            <div className="combo-header">
                <h3>🎯 Super Saver Combos</h3>
                <p>Curated wellness bundles at unbeatable prices</p>
            </div>
            <div className="combo-grid">
                {combos.map(c => (
                    <Link to={`/product/${c.id}`} key={c.id} className="combo-card">
                        <div className="combo-img-wrap">
                            <img src={c.img} alt={c.name} />
                            <span className="combo-badge">{c.off}</span>
                        </div>
                        <span className="combo-name">{c.name}</span>
                    </Link>
                ))}
            </div>
            <Link to="/products?category=Super+Saver+Combos" className="view-all-link">View All Combos →</Link>
        </div>
    </div>
);

export default MegaMenuCombos;
