import api from '../config/api';

export interface HomeCounts {
  unreadNotifications: number;
  cartItems: number;
  unreadChats: number;
}

export interface HomeCountsResponse {
  success: boolean;
  data: HomeCounts;
}

/**
 * Get dashboard home counts (unread notifications, cart items, unread chats)
 * GET /dashboard/home-counts
 */
export const getHomeCounts = async (): Promise<HomeCountsResponse> => {
  try {
    const response = await api.get<HomeCountsResponse>(
      '/dashboard/home-counts',
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

export default {
  getHomeCounts,
};
