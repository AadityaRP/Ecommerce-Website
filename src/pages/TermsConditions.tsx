import React from 'react';
import { Link } from 'react-router-dom';
import './PolicyPage.css';

const TermsConditions: React.FC = () => {
    return (
        <div className="policy-page">
            <div className="policy-container">
                <div className="policy-header">
                    <Link to="/" className="policy-back-link">← Back to Home</Link>
                    <div className="policy-tag">Legal</div>
                    <h1>Terms &amp; Conditions</h1>
                    <p className="policy-date">Last updated: January 1, 2026</p>
                </div>

                <p className="policy-intro">
                    Please read these Terms &amp; Conditions carefully before using the AmmaFoods website
                    or placing any order. By accessing our website or making a purchase, you agree to be
                    bound by these terms. If you do not agree, please do not use our services.
                </p>

                <div className="policy-section">
                    <h2>1. About AmmaFoods</h2>
                    <p>
                        AmmaFoods is an online retailer specialising in premium herbal supplements, organic
                        foods, and natural wellness products. We are committed to delivering authentic,
                        lab-tested, and FSSAI-certified products directly to your doorstep.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>2. Eligibility</h2>
                    <p>
                        By using our website, you confirm that you are at least 18 years of age, or accessing
                        the site under the supervision of a parent or legal guardian. You agree to provide
                        accurate and complete information when creating an account or placing an order.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>3. Products and Descriptions</h2>
                    <p>
                        We make every effort to display our products as accurately as possible, including
                        images, descriptions, and ingredients. However:
                    </p>
                    <ul>
                        <li>Product colours may vary slightly due to screen display differences.</li>
                        <li>All health claims on product pages are informational and not medical advice.</li>
                        <li>We recommend consulting a qualified healthcare professional before using any herbal supplement, especially if you are pregnant, nursing, or on medication.</li>
                        <li>AmmaFoods reserves the right to modify product descriptions and prices at any time without prior notice.</li>
                    </ul>
                </div>

                <div className="policy-section">
                    <h2>4. Pricing and Payment</h2>
                    <p>
                        All prices listed on our website are in Indian Rupees (₹) and are inclusive of applicable
                        taxes unless stated otherwise. We reserve the right to update prices at any time. The
                        price at the time of order confirmation will apply to your purchase.
                    </p>
                    <p>
                        We accept payments via UPI, debit/credit cards, net banking, and other methods available
                        at checkout. All transactions are processed securely through our payment partners.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>5. Order Confirmation and Cancellation</h2>
                    <p>
                        Once you place an order, you will receive an email confirmation. Your order is only
                        confirmed after successful payment. We reserve the right to cancel any order due to
                        product unavailability, pricing errors, or suspected fraudulent activity. In such cases,
                        a full refund will be issued promptly.
                    </p>
                    <p>
                        If you wish to cancel your order, please contact us within <strong>12 hours</strong> of
                        placing it. Once an order has been dispatched, it cannot be cancelled.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>6. Intellectual Property</h2>
                    <p>
                        All content on this website — including text, images, logos, product descriptions, and
                        graphics — is the property of AmmaFoods and is protected by applicable intellectual
                        property laws. You may not reproduce, distribute, or use our content without prior
                        written permission.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>7. Limitation of Liability</h2>
                    <p>
                        AmmaFoods shall not be liable for any indirect, incidental, or consequential damages
                        arising from the use of our products or website. Our total liability to you shall not
                        exceed the amount paid for the specific order in question.
                    </p>
                    <p>
                        We are not responsible for delays caused by courier partners, natural
                        disasters, strikes, or other circumstances beyond our control.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>8. Governing Law</h2>
                    <p>
                        These Terms &amp; Conditions are governed by the laws of India. Any disputes arising
                        from your use of our website or services shall be subject to the exclusive jurisdiction
                        of the courts in Mumbai, Maharashtra.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>9. Changes to These Terms</h2>
                    <p>
                        We may revise these Terms &amp; Conditions from time to time. Continued use of our
                        website after any changes constitutes your acceptance of the updated terms. We recommend
                        reviewing this page periodically.
                    </p>
                </div>

                <div className="policy-contact-box">
                    <h3>Have a Question?</h3>
                    <p>If you have questions about these Terms &amp; Conditions, please contact us:</p>
                    <p>📧 Email: <a href="mailto:support@ammafoods.com">support@ammafoods.com</a></p>
                    <p>📞 Phone: <a href="tel:+919876543210">+91 98765 43210</a></p>
                    <p>📍 Address: AmmaFoods, Mumbai, Maharashtra, India</p>
                </div>
            </div>
        </div>
    );
};

export default TermsConditions;
