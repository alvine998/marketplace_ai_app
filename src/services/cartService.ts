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
    const response = await api.get<ApiCartItem[]>('/cart', {
      params: {
        userId,
        page,
        limit,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

export default {
  getCart,
};
