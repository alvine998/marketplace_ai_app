import api from '../config/api';

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  seller: {
    id: string;
    username: string;
  };
}

export interface ApiCartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  product: CartProduct;
}

export interface GetCartResponse {
  data: ApiCartItem[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

/**
 * Get user cart items
 * GET /cart
 */
export const getCart = async (
  userId: string,
  page: number = 1,
  limit: number = 10,
): Promise<ApiCartItem[]> => {
  try {
    const response = await api.get<any>('/cart', {
      params: {
        userId,
        page,
        limit,
      },
    });

    // Check if the response matches GetCartResponse structure
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }

    // Fallback if the response is a direct array
    if (Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  } catch (error: any) {
    console.error('getCart error:', error);
    return [];
  }
};

export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export interface AddToCartResponse {
  message?: string;
  data?: ApiCartItem[];
}

/**
 * Add item to cart
 * POST /cart
 */
export const addToCart = async (
  payload: AddToCartPayload,
): Promise<ApiCartItem[]> => {
  try {
    const response = await api.post<AddToCartResponse>('/cart', payload);

    // Check if the response has data array
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }

    // Fallback if the response is a direct array
    if (Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  } catch (error: any) {
    console.error('addToCart error:', error);
    throw error;
  }
};

export interface UpdateCartItemPayload {
  quantity: number;
}

/**
 * Update cart item quantity
 * PUT /cart/:id
 */
export const updateCartItem = async (
  cartItemId: string,
  payload: UpdateCartItemPayload,
): Promise<ApiCartItem | null> => {
  try {
    const response = await api.put<any>(`/cart/${cartItemId}`, payload);

    if (response.data && response.data.data) {
      return response.data.data;
    }

    return response.data;
  } catch (error: any) {
    console.error('updateCartItem error:', error);
    throw error;
  }
};

/**
 * Remove item from cart
 * DELETE /cart/:id
 */
export const removeFromCart = async (cartItemId: string): Promise<boolean> => {
  try {
    await api.delete(`/cart/${cartItemId}`);
    return true;
  } catch (error: any) {
    console.error('removeFromCart error:', error);
    throw error;
  }
};

export default {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
};
