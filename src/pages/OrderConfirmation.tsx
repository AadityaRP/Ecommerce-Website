import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation: React.FC = () => {
    const [orderId] = useState(() => `HN${Date.now().toString().slice(-8)}`);
    const [show, setShow] = useState(false);

    useEffect(() => { setTimeout(() => setShow(true), 100); }, []);

    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 5);
    const dateStr = estDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

    return (
        <main className="page-content">
            <div className="container">
                <div className={`oc-wrapper ${show ? 'visible' : ''}`}>
                    <div className="oc-success-icon">
                        <div className="oc-circle">✓</div>
                    </div>
                    <h1 className="oc-title">Order Placed Successfully!</h1>
                    <p className="oc-sub">Thank you for shopping with AmmaFoods! 🌿</p>

                    <div className="oc-order-card">
                        <div className="oc-row"><span>Order ID</span><strong>#{orderId}</strong></div>
                        <div className="oc-row"><span>Estimated Delivery</span><strong>{dateStr}</strong></div>
                        <div className="oc-row"><span>Status</span><span className="oc-status">Confirmed ✅</span></div>
                    </div>

                    <div className="oc-steps">
                        {[
                            { icon: '📦', label: 'Order Confirmed', done: true },
                            { icon: '🏭', label: 'Being Packed', done: false },
                            { icon: '🚚', label: 'Out for Delivery', done: false },
                            { icon: '🏠', label: 'Delivered', done: false },
                        ].map((s, i) => (
                            <div key={i} className={`oc-step ${s.done ? 'done' : ''}`}>
                                <div className="oc-step-icon">{s.icon}</div>
                                <span>{s.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="oc-actions">
                        <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
                        <Link to="/" className="btn btn-outline">Back to Home</Link>
                    </div>

                    <p className="oc-note">You will receive an SMS and email confirmation shortly. For support, contact support@ammafoods.com.au</p>
                </div>
            </div>
        </main>
    );
};

export default OrderConfirmation;
