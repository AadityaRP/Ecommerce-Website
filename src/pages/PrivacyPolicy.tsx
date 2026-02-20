import React from 'react';
import { Link } from 'react-router-dom';
import './PolicyPage.css';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="policy-page">
            <div className="policy-container">
                <div className="policy-header">
                    <Link to="/" className="policy-back-link">← Back to Home</Link>
                    <div className="policy-tag">Legal</div>
                    <h1>Privacy Policy</h1>
                    <p className="policy-date">Last updated: January 1, 2026</p>
                </div>

                <p className="policy-intro">
                    At AmmaFoods, your privacy is our priority. This Privacy Policy explains how we collect, use,
                    store, and protect your personal information when you visit our website or make a purchase.
                    By using our website, you agree to the practices described in this policy.
                </p>

                <div className="policy-section">
                    <h2>1. Information We Collect</h2>
                    <p>We collect the following types of information to process your orders and improve your experience:</p>
                    <ul>
                        <li><strong>Personal Information:</strong> Name, email address, phone number, and delivery address when you place an order or create an account.</li>
                        <li><strong>Payment Information:</strong> We do not store card details. Payments are processed securely through our payment gateway partners.</li>
                        <li><strong>Usage Data:</strong> Pages visited, products viewed, and time spent on the website, collected via cookies and analytics tools.</li>
                        <li><strong>Device Information:</strong> Browser type, IP address, and device type for security and performance purposes.</li>
                    </ul>
                </div>

                <div className="policy-section">
                    <h2>2. How We Use Your Information</h2>
                    <p>The information we collect is used to:</p>
                    <ul>
                        <li>Process and deliver your orders accurately and on time.</li>
                        <li>Send order confirmations, shipping updates, and customer support communications.</li>
                        <li>Personalise your shopping experience with relevant product recommendations.</li>
                        <li>Improve website performance and fix any technical issues.</li>
                        <li>Send promotional offers, discounts, and newsletters — only if you have opted in.</li>
                        <li>Comply with legal obligations and prevent fraudulent activity.</li>
                    </ul>
                </div>

                <div className="policy-section">
                    <h2>3. Sharing of Information</h2>
                    <p>We do not sell, trade, or rent your personal information to third parties. We may share your data with:</p>
                    <ul>
                        <li><strong>Delivery Partners:</strong> Your name, address, and phone number are shared with courier services solely for the purpose of delivering your order.</li>
                        <li><strong>Payment Processors:</strong> Secure third-party payment gateways for processing transactions.</li>
                        <li><strong>Service Providers:</strong> Trusted tools that help us run the website (e.g., analytics, email services), bound by strict confidentiality agreements.</li>
                        <li><strong>Legal Authorities:</strong> When required by law or to protect the rights and safety of our customers and business.</li>
                    </ul>
                </div>

                <div className="policy-section">
                    <h2>4. Cookies</h2>
                    <p>
                        Our website uses cookies to enhance your browsing experience. Cookies are small files stored
                        on your device that help us remember your preferences and understand how you use our site.
                        You may disable cookies through your browser settings; however, some features of the website
                        may not function properly without them.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>5. Data Security</h2>
                    <p>
                        We take the security of your personal information seriously. We use industry-standard
                        encryption (SSL/TLS) to protect data transmitted between your browser and our servers.
                        Access to your personal data is restricted to authorised personnel only.
                    </p>
                    <p>
                        While we take all reasonable precautions, no method of online transmission is 100% secure.
                        We encourage you to use strong passwords and keep your account credentials confidential.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>6. Data Retention</h2>
                    <p>
                        We retain your personal information for as long as necessary to fulfil the purposes outlined
                        in this policy, unless a longer retention period is required by law. Order data is typically
                        retained for 7 years for accounting and legal purposes.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>7. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access the personal data we hold about you.</li>
                        <li>Request correction of inaccurate or incomplete data.</li>
                        <li>Request deletion of your personal data (subject to legal retention requirements).</li>
                        <li>Withdraw consent for marketing communications at any time by clicking "Unsubscribe" in our emails.</li>
                    </ul>
                    <p>To exercise any of these rights, please contact us using the details below.</p>
                </div>

                <div className="policy-section">
                    <h2>8. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. When we do, we will revise the
                        "Last updated" date at the top of this page. We encourage you to review this policy
                        periodically to stay informed about how we are protecting your information.
                    </p>
                </div>

                <div className="policy-contact-box">
                    <h3>Questions About Your Privacy?</h3>
                    <p>If you have any questions or concerns about this Privacy Policy, please reach out to us:</p>
                    <p>📧 Email: <a href="mailto:support@ammafoods.com">support@ammafoods.com</a></p>
                    <p>📞 Phone: <a href="tel:+919876543210">+91 98765 43210</a></p>
                    <p>📍 Address: AmmaFoods, Mumbai, Maharashtra, India</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
