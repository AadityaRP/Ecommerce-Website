import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import PromotionalBar from './components/PromotionalBar/PromotionalBar';
import Navbar from './components/Header/Navbar';
import CartDrawer from './components/Cart/CartDrawer';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderSummary from './pages/OrderSummary';
import Payment from './pages/Payment';
import OrderConfirmation from './pages/OrderConfirmation';
import MaruthompalPage from './pages/MaruthompalPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import './index.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <PromotionalBar />
        <Navbar />
        <CartDrawer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-confirmed" element={<OrderConfirmation />} />
          <Route path="/maruthompal" element={<MaruthompalPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
