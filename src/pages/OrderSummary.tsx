import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './OrderSummary.css';

const OrderSummary: React.FC = () => {
    const { state: cartState, cartTotal, cartSavings } = useCart();
    const navigate = useNavigate();
    const address = JSON.parse(localStorage.getItem('checkout_address') || '{}');
    const deliveryCharge = cartTotal >= 499 ? 0 : 49;
    const grandTotal = cartTotal + deliveryCharge;

    if (cartState.items.length === 0) {
        navigate('/');
        return null;
    }

    return (
        <main className="page-content">
            <div className="container">
                <div className="checkout-progress">
                    <div className="step done"><div className="step-num">✓</div><span>Delivery Address</span></div>
                    <div className="step-line active-line" />
                    <div className="step active"><div className="step-num">2</div><span>Order Summary</span></div>
                    <div className="step-line" />
                    <div className="step"><div className="step-num">3</div><span>Payment</span></div>
                </div>

                <div className="os-layout">
                    <div className="os-main">
                        <div className="os-card">
                            <h2>Order Items</h2>
                            {cartState.items.map(item => (
                                <div key={`${item.id}-${item.pack}`} className="os-item">
                                    <img src={item.image} alt={item.name} />
                                    <div className="os-item-info">
                                        <span className="os-item-name">{item.name}</span>
                                        <span className="os-item-pack">Pack: {item.pack}</span>
                                        <span className="os-item-qty">Qty: {item.quantity}</span>
                                    </div>
                                    <div className="os-item-prices">
                                        <span className="os-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                                        <span className="os-was">₹{(item.originalPrice * item.quantity).toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="os-card">
                            <h2>Delivery Address</h2>
                            <div className="address-display">
                                <strong>{address.fullName}</strong>
                                <p>{address.address}</p>
                                <p>{address.state} – {address.pincode}</p>
                                <p>📞 +91 {address.phone}</p>
                                <p>📧 {address.email}</p>
                                <span className="address-type-tag">{address.saveAs || 'Home'}</span>
                            </div>
                            <button className="change-btn" onClick={() => navigate('/checkout')}>Change Address</button>
                        </div>
                    </div>

                    <div className="os-sidebar">
                        <div className="os-totals-card">
                            <h3>Price Details</h3>
                            <div className="os-total-rows">
                                <div className="os-row"><span>Price ({cartState.items.reduce((s, i) => s + i.quantity, 0)} items)</span><span>₹{(cartTotal + cartSavings).toLocaleString()}</span></div>
                                {cartSavings > 0 && <div className="os-row green"><span>Discount</span><span>-₹{cartSavings.toLocaleString()}</span></div>}
                                <div className="os-row"><span>Delivery Charges</span><span className={deliveryCharge === 0 ? 'free-label' : ''}>{deliveryCharge === 0 ? '🎉 FREE' : `₹${deliveryCharge}`}</span></div>
                                <div className="os-row grand"><span>Total Payable</span><span>₹{grandTotal.toLocaleString()}</span></div>
                                {cartSavings > 0 && <div className="os-savings-note">🎉 You will save ₹{cartSavings.toLocaleString()} on this order</div>}
                            </div>
                            <button className="proceed-btn" onClick={() => navigate('/payment')}>
                                Proceed to Pay ₹{grandTotal.toLocaleString()} →
                            </button>
                            <div className="secure-note">🔒 100% Safe & Secure Payments</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default OrderSummary;
