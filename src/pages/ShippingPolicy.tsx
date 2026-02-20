import React from 'react';
import { Link } from 'react-router-dom';
import './PolicyPage.css';

const ShippingPolicy: React.FC = () => {
    return (
        <div className="policy-page">
            <div className="policy-container">
                <div className="policy-header">
                    <Link to="/" className="policy-back-link">← Back to Home</Link>
                    <div className="policy-tag">Delivery</div>
                    <h1>Shipping Policy</h1>
                    <p className="policy-date">Last updated: January 1, 2026</p>
                </div>

                <p className="policy-intro">
                    We know you can't wait to receive your AmmaFoods products! We are committed to processing
                    and shipping your orders as quickly as possible. Here is everything you need to know about
                    our shipping process.
                </p>

                <div className="policy-section">
                    <h2>1. Order Processing Time</h2>
                    <p>
                        All orders placed on AmmaFoods are processed within <strong>1–2 business days</strong>
                        (Monday to Saturday, excluding public holidays). Orders placed after 3:00 PM IST or on
                        Sundays/public holidays will be processed the next business day.
                    </p>
                    <p>
                        You will receive an order confirmation email immediately after placing your order, and a
                        separate shipping confirmation email with a tracking number once your order is dispatched.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>2. Shipping Destinations</h2>
                    <p>We currently ship to all major cities and towns across India, including:</p>
                    <ul>
                        <li>Metro cities: Mumbai, Delhi, Bengaluru, Chennai, Hyderabad, Kolkata, Pune</li>
                        <li>Tier 2 and Tier 3 cities across all states</li>
                        <li>Remote pin codes may take additional 2–3 days for delivery</li>
                    </ul>
                    <p>
                        We do not currently offer international shipping. We hope to expand to more regions
                        in the near future.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>3. Estimated Delivery Times</h2>
                    <p>Delivery timelines vary by location:</p>
                    <ul>
                        <li><strong>Metro Cities:</strong> 2–4 business days after dispatch</li>
                        <li><strong>Tier 2 / Tier 3 Cities:</strong> 4–6 business days after dispatch</li>
                        <li><strong>Remote / Rural Areas:</strong> 6–10 business days after dispatch</li>
                    </ul>
                    <p>
                        These are estimated timelines and may vary due to peak seasons, festivals, bad weather,
                        or other unforeseen circumstances. We appreciate your patience during such times.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>4. Shipping Charges</h2>
                    <ul>
                        <li><strong>Free Shipping:</strong> On all orders above ₹499.</li>
                        <li><strong>Standard Shipping:</strong> ₹49 for orders below ₹499.</li>
                        <li><strong>Express Shipping:</strong> Available at checkout for select pin codes at an additional charge.</li>
                    </ul>
                    <p>Shipping charges (if applicable) are non-refundable unless the return is due to our error.</p>
                </div>

                <div className="policy-section">
                    <h2>5. Order Tracking</h2>
                    <p>
                        Once your order is dispatched, you will receive an SMS and email containing your
                        <strong> tracking number</strong> and the name of the courier partner. You can use
                        this to track your shipment on the courier's website in real time.
                    </p>
                    <p>
                        If you face any difficulty tracking your order, please contact our customer support
                        with your order number and we will assist you.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>6. Delivery Attempts</h2>
                    <p>
                        Our courier partners will attempt delivery up to <strong>3 times</strong>. If the
                        package cannot be delivered after 3 attempts (due to incorrect address, no one available
                        to receive, etc.), it will be returned to our warehouse.
                    </p>
                    <p>
                        In such cases, you may request a re-dispatch at an additional shipping charge, or we can
                        issue a refund for the product cost (shipping charges excluded).
                    </p>
                </div>

                <div className="policy-section">
                    <h2>7. Incorrect Address</h2>
                    <p>
                        Please ensure your delivery address is complete and accurate at the time of placing the
                        order. AmmaFoods is not responsible for non-delivery due to an incorrect or incomplete
                        address provided by the customer. Address changes can only be made before the order is
                        dispatched.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>8. Damaged or Lost Packages</h2>
                    <p>
                        If your package appears damaged upon delivery, please refuse to accept it and inform our
                        support team immediately. If a package is confirmed lost in transit by the courier, we
                        will arrange a full replacement or refund at no extra cost to you.
                    </p>
                </div>

                <div className="policy-section">
                    <h2>9. Shipping During Festive Seasons</h2>
                    <p>
                        During major festivals (Diwali, Pongal, Holi, etc.), courier services may experience
                        higher-than-usual volumes, which can cause delays. We recommend placing your orders
                        at least <strong>10 days in advance</strong> during the festive season to ensure
                        timely delivery.
                    </p>
                </div>

                <div className="policy-contact-box">
                    <h3>Shipping Support</h3>
                    <p>For any shipping-related queries, feel free to get in touch with us:</p>
                    <p>📧 Email: <a href="mailto:support@ammafoods.com">support@ammafoods.com</a></p>
                    <p>📞 Phone: <a href="tel:+919876543210">+91 98765 43210</a> (Mon–Sat, 9 AM – 6 PM IST)</p>
                    <p>📍 Address: AmmaFoods, Mumbai, Maharashtra, India</p>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
