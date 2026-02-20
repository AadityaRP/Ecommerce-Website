import React from 'react';
import { Link } from 'react-router-dom';
import './PolicyPage.css';

const RefundPolicy: React.FC = () => {
    return (
        <div className="policy-page">
            <div className="policy-container">
                <div className="policy-header">
                    <Link to="/" className="policy-back-link">← Back to Home</Link>
                    <div className="policy-tag">Customer Care</div>
                    <h1>Refund &amp; Return Policy</h1>
                    <p className="policy-date">Last updated: January 1, 2026</p>
                </div>

                <p className="policy-intro">
                    At AmmaFoods, we stand behind every product we sell. If you are not completely satisfied
                    with your purchase, we are here to help. Please read our refund and return policy carefully
                    to understand your options.
                </p>

                <div className="policy-section">
                    <h2>1. Eligibility for Returns</h2>
                    <p>You may request a return or refund if:</p>
                    <ul>
                        <li>The product you received is <strong>damaged</strong>, <strong>defective</strong>, or <strong>expired</strong>.</li>
                        <li>You received the <strong>wrong product</strong> that does not match your order.</li>
                        <li>The product <strong>packaging is tampered</strong> or the seal is broken upon delivery.</li>
                    </ul>
                    <p>
                        Return requests must be raised within <strong>7 days</strong> of the delivery date.
                        Requests raised after this period will not be eligible for a refund or replacement.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>2. Non-Returnable Items</h2>
                    <p>For hygiene and safety reasons, the following items are <strong>not eligible</strong> for return:</p>
                    <ul>
                        <li>Opened or partially consumed products.</li>
                        <li>Products purchased under special clearance or flash sale offers (unless defective).</li>
                        <li>Items that have been used or show signs of misuse.</li>
                        <li>Products without original packaging or labels.</li>
                    </ul>
                </div>

                <div className="policy-section">
                    <h2>3. How to Initiate a Return</h2>
                    <p>To request a return, please follow these steps:</p>
                    <ul>
                        <li><strong>Step 1:</strong> Email us at <strong>support@ammafoods.com</strong> within 7 days of delivery.</li>
                        <li><strong>Step 2:</strong> Include your <strong>order number</strong>, the <strong>reason for return</strong>, and <strong>clear photographs</strong> of the product (and any damage).</li>
                        <li><strong>Step 3:</strong> Our customer support team will review your request within <strong>2 business days</strong> and guide you on the next steps.</li>
                        <li><strong>Step 4:</strong> If approved, we will arrange a pickup or provide a return address. Please pack the product securely in its original packaging.</li>
                    </ul>
                </div>

                <div className="policy-section">
                    <h2>4. Refund Process</h2>
                    <p>
                        Once we receive and inspect the returned product, we will notify you of the approval
                        or rejection of your refund within <strong>2–3 business days</strong>.
                    </p>
                    <p>If approved, refunds will be processed as follows:</p>
                    <ul>
                        <li><strong>Original Payment Method:</strong> The refund will be credited to the original payment source (credit/debit card, UPI, net banking) within <strong>5–7 business days</strong>, depending on your bank.</li>
                        <li><strong>Store Credit:</strong> As an alternative, we can issue instant store credit (AmmaFoods wallet) which can be used on your next purchase.</li>
                    </ul>
                    <p>Shipping charges are non-refundable unless the return is due to our error.</p>
                </div>

                <div className="policy-section">
                    <h2>5. Replacement Option</h2>
                    <p>
                        Instead of a refund, you may opt for a <strong>free replacement</strong> of the same
                        product (subject to availability). Replacement orders are dispatched within
                        3–5 business days after the return is approved.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>6. Cancellations</h2>
                    <p>
                        Orders can be cancelled before they are dispatched. To cancel, contact us within
                        <strong> 12 hours</strong> of placing the order. Once shipped, the order cannot be
                        cancelled. In that case, please follow the return process after receiving the package.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>7. Damaged in Transit</h2>
                    <p>
                        If your package arrives damaged, please <strong>do not accept the delivery</strong>
                        and mark it as "Refused — Damaged" with the courier. Take photos and notify us
                        immediately at support@ammafoods.com. We will dispatch a replacement at no cost.
                    </p>
                </div>

                <div className="policy-contact-box">
                    <h3>Need Help With a Return?</h3>
                    <p>Our team is happy to assist you. Reach out to us anytime:</p>
                    <p>📧 Email: <a href="mailto:support@ammafoods.com">support@ammafoods.com</a></p>
                    <p>📞 Phone: <a href="tel:+919876543210">+91 98765 43210</a> (Mon–Sat, 9 AM – 6 PM)</p>
                    <p>📍 Address: AmmaFoods, Mumbai, Maharashtra, India</p>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicy;
