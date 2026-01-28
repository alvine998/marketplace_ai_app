import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import {
    getCart,
    addToCart as apiAddToCart,
    updateCartItem as apiUpdateCartItem,
    removeFromCart as apiRemoveFromCart,
    ApiCartItem,
    AddToCartPayload,
} from '../services/cartService';
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
    addToCart: (productId: string, quantity?: number) => Promise<void>;
    removeFromCart: (cartItemId: string) => Promise<void>;
    updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
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

    const fetchCart = useCallback(async () => {
        if (!isLoggedIn || !user?.id) return;

        setIsLoading(true);
        try {
            const data = await getCart(user.id);
            if (Array.isArray(data)) {
                setCartItems(data.map(mapApiToCartItem));
            } else {
                setCartItems([]);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setIsLoading(false);
        }
    }, [isLoggedIn, user?.id]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchCart();
        } else {
            setCartItems([]);
        }
    }, [isLoggedIn, user?.id, fetchCart]);

    /**
     * Add item to cart via API
     * POST /cart with { productId, quantity }
     */
    const addToCart = async (productId: string, quantity: number = 1): Promise<void> => {
        if (!isLoggedIn) {
            console.warn('User must be logged in to add items to cart');
            return;
        }

        setIsLoading(true);
        try {
            const payload: AddToCartPayload = { productId, quantity };
            const updatedCart = await apiAddToCart(payload);

            if (Array.isArray(updatedCart)) {
                setCartItems(updatedCart.map(mapApiToCartItem));
            } else {
                // If API doesn't return updated cart, refetch
                await fetchCart();
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Remove item from cart via API
     * DELETE /cart/:id
     */
    const removeFromCart = async (cartItemId: string): Promise<void> => {
        if (!isLoggedIn) {
            console.warn('User must be logged in to remove items from cart');
            return;
        }

        setIsLoading(true);
        try {
            await apiRemoveFromCart(cartItemId);
            // Update local state
            setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Update cart item quantity via API
     * PUT /cart/:id with { quantity }
     */
    const updateQuantity = async (cartItemId: string, quantity: number): Promise<void> => {
        if (!isLoggedIn) {
            console.warn('User must be logged in to update cart');
            return;
        }

        if (quantity < 1) {
            // If quantity is less than 1, remove the item
            await removeFromCart(cartItemId);
            return;
        }

        setIsLoading(true);
        try {
            const updatedItem = await apiUpdateCartItem(cartItemId, { quantity });

            if (updatedItem) {
                setCartItems(prevItems =>
                    prevItems.map(item =>
                        item.id === cartItemId ? { ...item, quantity: updatedItem.quantity } : item
                    )
                );
            } else {
                // If API doesn't return updated item, refetch
                await fetchCart();
            }
        } catch (error) {
            console.error('Error updating cart quantity:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
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
