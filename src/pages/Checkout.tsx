import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, User, Home, Users, Briefcase, MoreHorizontal } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Delhi', 'J&K', 'Ladakh', 'Chandigarh', 'Puducherry',
];

const saveAsOptions = [
    { label: 'Home', icon: <Home size={16} /> },
    { label: 'Friends', icon: <Users size={16} /> },
    { label: 'Work', icon: <Briefcase size={16} /> },
    { label: 'Other', icon: <MoreHorizontal size={16} /> },
];

interface FormData {
    fullName: string; email: string; phone: string;
    pincode: string; address: string; state: string;
    saveAs: string;
}

const Checkout: React.FC = () => {
    const { state: cartState, cartTotal } = useCart();
    const navigate = useNavigate();
    const [form, setForm] = useState<FormData>({
        fullName: '', email: '', phone: '',
        pincode: '', address: '', state: 'Maharashtra',
        saveAs: 'Home',
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const deliveryCharge = cartTotal >= 499 ? 0 : 49;

    const validate = () => {
        const e: Partial<FormData> = {};
        if (!form.fullName.trim()) e.fullName = 'Full name is required';
        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
        if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Valid 10-digit mobile number required';
        if (!form.pincode.match(/^\d{6}$/)) e.pincode = 'Valid 6-digit pincode required';
        if (!form.address.trim() || form.address.trim().length < 10) e.address = 'Please enter your full address (min 10 characters)';
        if (!form.state) e.state = 'Please select your state';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        localStorage.setItem('checkout_address', JSON.stringify(form));
        navigate('/order-summary');
    };

    const handleChange = (field: keyof FormData, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    if (cartState.items.length === 0) {
        return (
            <main className="page-content">
                <div className="container empty-checkout">
                    <div style={{ fontSize: '3rem' }}>🛒</div>
                    <h2>Your cart is empty</h2>
                    <button className="btn btn-primary" onClick={() => navigate('/products')}>Shop Now</button>
                </div>
            </main>
        );
    }

    return (
        <main className="page-content">
            <div className="container">
                <div className="checkout-progress">
                    <div className="step active"><div className="step-num">1</div><span>Delivery Address</span></div>
                    <div className="step-line" />
                    <div className="step"><div className="step-num">2</div><span>Order Summary</span></div>
                    <div className="step-line" />
                    <div className="step"><div className="step-num">3</div><span>Payment</span></div>
                </div>

                <div className="checkout-layout">
                    <div className="checkout-form-wrap">
                        <h2 className="form-title">Delivery Address</h2>
                        <form onSubmit={handleSubmit} className="checkout-form" noValidate>
                            <div className="form-row">
                                <div className={`form-field ${errors.fullName ? 'error' : ''}`}>
                                    <label><User size={14} /> Full Name *</label>
                                    <input type="text" placeholder="Enter your full name" value={form.fullName} onChange={e => handleChange('fullName', e.target.value)} />
                                    {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                                </div>
                            </div>

                            <div className="form-row two-col">
                                <div className={`form-field ${errors.email ? 'error' : ''}`}>
                                    <label><Mail size={14} /> Email Address *</label>
                                    <input type="email" placeholder="you@example.com" value={form.email} onChange={e => handleChange('email', e.target.value)} />
                                    {errors.email && <span className="field-error">{errors.email}</span>}
                                </div>
                                <div className={`form-field ${errors.phone ? 'error' : ''}`}>
                                    <label><Phone size={14} /> Mobile Number *</label>
                                    <div className="phone-field">
                                        <span className="country-code">🇮🇳 +91</span>
                                        <input type="tel" placeholder="10-digit number" maxLength={10} value={form.phone} onChange={e => handleChange('phone', e.target.value.replace(/\D/g, ''))} />
                                    </div>
                                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                                </div>
                            </div>

                            <div className="form-row two-col">
                                <div className={`form-field ${errors.pincode ? 'error' : ''}`}>
                                    <label><MapPin size={14} /> Pincode *</label>
                                    <input type="text" placeholder="6-digit pincode" maxLength={6} value={form.pincode} onChange={e => handleChange('pincode', e.target.value.replace(/\D/g, ''))} />
                                    {errors.pincode && <span className="field-error">{errors.pincode}</span>}
                                </div>
                                <div className={`form-field ${errors.state ? 'error' : ''}`}>
                                    <label>State *</label>
                                    <select value={form.state} onChange={e => handleChange('state', e.target.value)}>
                                        {indianStates.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                    {errors.state && <span className="field-error">{errors.state}</span>}
                                </div>
                            </div>

                            <div className={`form-field ${errors.address ? 'error' : ''}`}>
                                <label>Full Address *</label>
                                <textarea placeholder="House/flat no., building name, street, area, city..." rows={3} value={form.address} onChange={e => handleChange('address', e.target.value)} />
                                {errors.address && <span className="field-error">{errors.address}</span>}
                            </div>

                            <div className="form-field">
                                <label>Save Address As</label>
                                <div className="save-as-options">
                                    {saveAsOptions.map(opt => (
                                        <button
                                            key={opt.label}
                                            type="button"
                                            className={`save-as-btn ${form.saveAs === opt.label ? 'active' : ''}`}
                                            onClick={() => handleChange('saveAs', opt.label)}
                                        >
                                            {opt.icon} {opt.label}
                                        </button>
                                    ))}
                                </div>
                                <p className="save-as-note">🔒 This address will be secured with OTP on AmmaFoods checkouts. <span>View Terms and conditions and Privacy Policy</span></p>
                            </div>

                            <button type="submit" className="submit-btn">Save & Continue →</button>
                        </form>
                    </div>

                    {/* Mini order summary */}
                    <div className="checkout-sidebar">
                        <h3>Order Summary</h3>
                        <div className="mini-order">
                            {cartState.items.map(item => (
                                <div key={`${item.id}-${item.pack}`} className="mini-item">
                                    <img src={item.image} alt={item.name} />
                                    <div>
                                        <span className="mini-name">{item.name}</span>
                                        <span className="mini-pack">{item.pack} × {item.quantity}</span>
                                    </div>
                                    <span className="mini-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                        <div className="checkout-totals">
                            <div className="total-row"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
                            <div className="total-row"><span>Delivery</span><span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span></div>
                            <div className="total-row grand"><span>Total</span><span>₹{(cartTotal + deliveryCharge).toLocaleString()}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Checkout;
