import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    quantity: number;
    pack: string;
    discount: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: { id: string; pack: string } }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; pack: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'TOGGLE_CART' }
    | { type: 'OPEN_CART' }
    | { type: 'CLOSE_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingIndex = state.items.findIndex(
                item => item.id === action.payload.id && item.pack === action.payload.pack
            );
            if (existingIndex >= 0) {
                const updatedItems = [...state.items];
                updatedItems[existingIndex] = {
                    ...updatedItems[existingIndex],
                    quantity: updatedItems[existingIndex].quantity + action.payload.quantity,
                };
                return { ...state, items: updatedItems, isOpen: true };
            }
            return { ...state, items: [...state.items, action.payload], isOpen: true };
        }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(
                    item => !(item.id === action.payload.id && item.pack === action.payload.pack)
                ),
            };
        case 'UPDATE_QUANTITY': {
            if (action.payload.quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(
                        item => !(item.id === action.payload.id && item.pack === action.payload.pack)
                    ),
                };
            }
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id && item.pack === action.payload.pack
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };
        }
        case 'CLEAR_CART':
            return { ...state, items: [] };
        case 'TOGGLE_CART':
            return { ...state, isOpen: !state.isOpen };
        case 'OPEN_CART':
            return { ...state, isOpen: true };
        case 'CLOSE_CART':
            return { ...state, isOpen: false };
        default:
            return state;
    }
};

interface CartContextType {
    state: CartState;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string, pack: string) => void;
    updateQuantity: (id: string, pack: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    cartCount: number;
    cartTotal: number;
    cartSavings: number;
}

const CartContext = createContext<CartContextType | null>(null);

const getInitialState = (): CartState => {
    try {
        const saved = localStorage.getItem('ammafoods_cart');
        if (saved) {
            return { items: JSON.parse(saved), isOpen: false };
        }
    } catch { }
    return { items: [], isOpen: false };
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, getInitialState());

    useEffect(() => {
        localStorage.setItem('ammafoods_cart', JSON.stringify(state.items));
    }, [state.items]);

    const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartSavings = state.items.reduce(
        (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
        0
    );

    return (
        <CartContext.Provider value={{
            state,
            addToCart: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
            removeFromCart: (id, pack) => dispatch({ type: 'REMOVE_ITEM', payload: { id, pack } }),
            updateQuantity: (id, pack, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, pack, quantity } }),
            clearCart: () => dispatch({ type: 'CLEAR_CART' }),
            toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
            openCart: () => dispatch({ type: 'OPEN_CART' }),
            closeCart: () => dispatch({ type: 'CLOSE_CART' }),
            cartCount,
            cartTotal,
            cartSavings,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
};
