import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

const CartDrawer: React.FC = () => {
    const { state, closeCart, removeFromCart, updateQuantity, cartTotal, cartSavings } = useCart();
    const navigate = useNavigate();

    if (!state.isOpen) return null;

    const handleCheckout = () => {
        closeCart();
        navigate('/checkout');
    };

    return (
        <>
            <div className="overlay" onClick={closeCart} />
            <div className="cart-drawer">
                <div className="cart-header">
                    <div className="cart-title">
                        <ShoppingBag size={20} />
                        <span>My Cart</span>
                        {state.items.length > 0 && (
                            <span className="cart-count-badge">{state.items.reduce((s, i) => s + i.quantity, 0)}</span>
                        )}
                    </div>
                    <button className="cart-close" onClick={closeCart} aria-label="Close cart">
                        <X size={20} />
                    </button>
                </div>

                {state.items.length === 0 ? (
                    <div className="cart-empty">
                        <div className="empty-icon">🛒</div>
                        <h3>Your cart is empty</h3>
                        <p>Add some healthy products to get started!</p>
                        <button className="btn btn-primary" onClick={() => { closeCart(); navigate('/products'); }}>
                            Shop Now
                        </button>
                    </div>
                ) : (
                    <>
                        {cartSavings > 0 && (
                            <div className="savings-banner">
                                🎉 You're saving <strong>₹{cartSavings.toLocaleString()}</strong> on this order!
                            </div>
                        )}
                        <div className="cart-items">
                            {state.items.map(item => (
                                <div key={`${item.id}-${item.pack}`} className="cart-item">
                                    <Link to={`/product/${item.id}`} onClick={closeCart} className="cart-item-img">
                                        <img src={item.image} alt={item.name} />
                                    </Link>
                                    <div className="cart-item-info">
                                        <Link to={`/product/${item.id}`} onClick={closeCart} className="cart-item-name">
                                            {item.name}
                                        </Link>
                                        <span className="cart-item-pack">{item.pack}</span>
                                        <div className="cart-item-price">
                                            <span className="price-current">₹{item.price}</span>
                                            <span className="price-original">₹{item.originalPrice}</span>
                                        </div>
                                        <div className="cart-item-actions">
                                            <div className="qty-ctrl">
                                                <button onClick={() => updateQuantity(item.id, item.pack, item.quantity - 1)} aria-label="Decrease">
                                                    <Minus size={12} />
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.pack, item.quantity + 1)} aria-label="Increase">
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                            <span className="item-subtotal">₹{(item.price * item.quantity).toLocaleString()}</span>
                                            <button className="remove-btn" onClick={() => removeFromCart(item.id, item.pack)} aria-label="Remove">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-footer">
                            <div className="cart-summary">
                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>
                                {cartSavings > 0 && (
                                    <div className="summary-row green">
                                        <span>Savings</span>
                                        <span>-₹{cartSavings.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="summary-row">
                                    <span>Delivery</span>
                                    <span className="free-tag">{cartTotal >= 499 ? 'FREE 🎉' : '₹49'}</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total</span>
                                    <span>₹{(cartTotal + (cartTotal >= 499 ? 0 : 49)).toLocaleString()}</span>
                                </div>
                            </div>
                            <button className="checkout-btn" onClick={handleCheckout}>
                                Proceed to Checkout →
                            </button>
                            <button className="continue-btn" onClick={() => { closeCart(); navigate('/products'); }}>
                                Continue Shopping
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
