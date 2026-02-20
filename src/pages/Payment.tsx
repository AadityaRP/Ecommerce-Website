import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Payment.css';

const banks = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank', 'Bank of Baroda', 'Yes Bank', 'Canara Bank', 'Union Bank'];

const Payment: React.FC = () => {
    const { cartTotal, clearCart } = useCart();
    const [method, setMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
    const [upiId, setUpiId] = useState('');
    const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' });
    const [bank, setBank] = useState(banks[0]);
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();
    const deliveryCharge = cartTotal >= 499 ? 0 : 49;
    const grandTotal = cartTotal + deliveryCharge;

    const handlePay = () => {
        setProcessing(true);
        setTimeout(() => {
            clearCart();
            navigate('/order-confirmed');
        }, 2000);
    };

    const formatCard = (val: string) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    const formatExpiry = (val: string) => {
        const d = val.replace(/\D/g, '').slice(0, 4);
        return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
    };

    return (
        <main className="page-content">
            <div className="container">
                <div className="checkout-progress">
                    <div className="step done"><div className="step-num">✓</div><span>Delivery Address</span></div>
                    <div className="step-line active-line" />
                    <div className="step done"><div className="step-num">✓</div><span>Order Summary</span></div>
                    <div className="step-line active-line" />
                    <div className="step active"><div className="step-num">3</div><span>Payment</span></div>
                </div>

                <div className="payment-layout">
                    <div className="payment-methods">
                        <h2>Choose Payment Method</h2>

                        {/* Method Tabs */}
                        <div className="method-tabs">
                            {([['upi', '📲 UPI'], ['card', '💳 Card'], ['netbanking', '🏦 Net Banking'], ['cod', '🚚 Cash on Delivery']] as const).map(([val, label]) => (
                                <button key={val} className={`method-tab ${method === val ? 'active' : ''}`} onClick={() => setMethod(val)}>
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* UPI */}
                        {method === 'upi' && (
                            <div className="method-content">
                                <div className="upi-apps">
                                    {['Google Pay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                                        <div key={app} className="upi-app-btn">{app === 'Google Pay' ? '🎨' : app === 'PhonePe' ? '💜' : app === 'Paytm' ? '🔵' : '🇮🇳'} {app}</div>
                                    ))}
                                </div>
                                <div className="divider-or"><span>or enter UPI ID</span></div>
                                <div className="upi-input-wrap">
                                    <input
                                        type="text"
                                        placeholder="yourname@upi"
                                        value={upiId}
                                        onChange={e => setUpiId(e.target.value)}
                                        className="pay-input"
                                    />
                                    <button className="verify-btn">Verify</button>
                                </div>
                            </div>
                        )}

                        {/* Card */}
                        {method === 'card' && (
                            <div className="method-content">
                                <div className="card-visual">
                                    <div className="card-num-display">{card.number || '•••• •••• •••• ••••'}</div>
                                    <div className="card-bottom">
                                        <div><div className="card-lbl">CARD HOLDER</div><div>{card.name || 'YOUR NAME'}</div></div>
                                        <div><div className="card-lbl">EXPIRES</div><div>{card.expiry || 'MM/YY'}</div></div>
                                    </div>
                                </div>
                                <div className="card-fields">
                                    <div className="form-field">
                                        <label>Card Number</label>
                                        <input type="text" className="pay-input" placeholder="1234 5678 9012 3456" maxLength={19} value={card.number} onChange={e => setCard(p => ({ ...p, number: formatCard(e.target.value) }))} />
                                    </div>
                                    <div className="form-field">
                                        <label>Name on Card</label>
                                        <input type="text" className="pay-input" placeholder="Full name as on card" value={card.name} onChange={e => setCard(p => ({ ...p, name: e.target.value }))} />
                                    </div>
                                    <div className="card-row-two">
                                        <div className="form-field">
                                            <label>Expiry Date</label>
                                            <input type="text" className="pay-input" placeholder="MM/YY" maxLength={5} value={card.expiry} onChange={e => setCard(p => ({ ...p, expiry: formatExpiry(e.target.value) }))} />
                                        </div>
                                        <div className="form-field">
                                            <label>CVV</label>
                                            <input type="password" className="pay-input" placeholder="•••" maxLength={3} value={card.cvv} onChange={e => setCard(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) }))} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Net Banking */}
                        {method === 'netbanking' && (
                            <div className="method-content">
                                <label className="form-field">
                                    <span>Select Your Bank</span>
                                    <select className="pay-input" value={bank} onChange={e => setBank(e.target.value)}>
                                        {banks.map(b => <option key={b}>{b}</option>)}
                                    </select>
                                </label>
                                <p className="nb-note">You will be redirected to your bank's secure portal to complete the payment.</p>
                            </div>
                        )}

                        {/* COD */}
                        {method === 'cod' && (
                            <div className="method-content cod-content">
                                <div className="cod-icon">🚚</div>
                                <h3>Cash on Delivery</h3>
                                <p>Pay in cash when your order arrives at your doorstep. No additional charges.</p>
                                <ul>
                                    <li>✅ No extra COD fees</li>
                                    <li>✅ Available PAN-India</li>
                                    <li>✅ Pay only after inspection</li>
                                </ul>
                            </div>
                        )}

                        <button className="pay-now-btn" onClick={handlePay} disabled={processing}>
                            {processing ? (
                                <><span className="spinner" /> Processing...</>
                            ) : (
                                `${method === 'cod' ? 'Place Order' : 'Pay Now'} ₹${grandTotal.toLocaleString()}`
                            )}
                        </button>
                        <p className="secure-label">🔒 Your payment is safe & secured with 256-bit SSL encryption</p>
                    </div>

                    <div className="payment-summary">
                        <h3>Order Total</h3>
                        <div className="pay-rows">
                            <div className="pay-row"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
                            <div className="pay-row"><span>Delivery</span><span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span></div>
                            <div className="pay-row grand"><span>Total</span><span>₹{grandTotal.toLocaleString()}</span></div>
                        </div>
                        <div className="payment-badges">
                            <span>🔒 SSL Secured</span>
                            <span>🏦 RBI Compliant</span>
                            <span>✅ PCI DSS</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Payment;
