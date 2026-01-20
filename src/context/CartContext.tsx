import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getCart, ApiCartItem } from '../services/cartService';
import { useAuth } from './AuthContext';

export interface CartItem {
    id: string;
    title: string;
    price: string;
    priceAmount: number;
    imageUrl: string;
    quantity: number;
    shopName: string;
    productId: string;
}

interface CartContextType {
    cartItems: CartItem[];
    isLoading: boolean;
    fetchCart: () => Promise<void>;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    totalAmount: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const { user, isLoggedIn } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const mapApiToCartItem = (apiItem: ApiCartItem): CartItem => ({
        id: apiItem.id,
        productId: apiItem.productId,
        title: apiItem.product.name,
        priceAmount: apiItem.product.price,
        price: `Rp ${apiItem.product.price.toLocaleString('id-ID')}`,
        imageUrl: apiItem.product.imageUrl,
        quantity: apiItem.quantity,
        shopName: apiItem.product.seller.username,
    });

    const fetchCart = async () => {
        if (!isLoggedIn || !user?.id) return;

        setIsLoading(true);
        try {
            const data = await getCart(user.id);
            setCartItems(data.map(mapApiToCartItem));
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchCart();
        } else {
            setCartItems([]);
        }
    }, [isLoggedIn, user?.id]);

    const addToCart = (newItem: CartItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === newItem.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...newItem, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => setCartItems([]);

    const totalAmount = cartItems.reduce((total, item) => {
        return total + item.priceAmount * item.quantity;
    }, 0);

    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                isLoading,
                fetchCart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalAmount,
                itemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
