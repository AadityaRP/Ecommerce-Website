import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import ammaLogo from '../../assets/amma_foods_logo.jpg';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="container footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <div className="footer-logo-icon"><img src={ammaLogo} alt="AmmaFoods" style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '50%' }} /></div>
                            <span>AmmaFoods</span>
                        </Link>
                        <p>India's trusted source for premium herbal supplements, organic foods, and natural wellness products. 100% natural, lab-tested, and FSSAI certified.</p>
                        <div className="footer-social">
                            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
                            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
                            <a href="#" aria-label="YouTube"><Youtube size={18} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            {[['/', 'Home'], ['/products', 'All Products'], ['/products?tag=bestseller', 'Best Sellers'], ['/products?category=Super+Saver+Combos', 'Combos'], ['/products?category=Detox+Programs', 'Detox Programs']].map(([to, label]) => (
                                <li key={label}><Link to={to}>{label}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="footer-col">
                        <h4>Categories</h4>
                        <ul>
                            {['Herbal Supplements', 'Teas & Infusions', 'Organic Foods', 'Oils & Ghee', 'Sugar Alternatives', 'Gym Diet'].map(cat => (
                                <li key={cat}><Link to={`/products?category=${encodeURIComponent(cat)}`}>{cat}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h4>Contact Us</h4>
                        <div className="footer-contact">
                            <div className="contact-item"><Phone size={14} /> <span>+91 98765 43210</span></div>
                            <div className="contact-item"><Mail size={14} /> <span>support@ammafoods.com.au</span></div>
                            <div className="contact-item"><MapPin size={14} /> <span>Mumbai, Maharashtra, India</span></div>
                        </div>
                        <div className="footer-trust">
                            <span>🌿 FSSAI Certified</span>
                            <span>🔬 Lab Tested</span>
                            <span>🏆 ISO 9001</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container footer-bottom-inner">
                    <span>© 2024 AmmaFoods. All rights reserved.</span>
                    <div className="footer-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms & Conditions</a>
                        <a href="#">Refund Policy</a>
                        <a href="#">Shipping Policy</a>
                    </div>
                </div>
            </div>


        </footer>
    );
};

export default Footer;
