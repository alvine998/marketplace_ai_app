import api from '../config/api';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'promo' | string;
  isRead: boolean;
  createdAt: string;
}

export interface GetNotificationsResponse {
  totalItems: number;
  data: Notification[];
  totalPages: number;
  currentPage: number;
}

export interface GetNotificationsParams {
  page?: number;
  limit?: number;
  isRead?: boolean;
  userId: string;
}

/**
 * Get user notifications
 * GET /notifications
 */
export const getNotifications = async (
  params: GetNotificationsParams,
): Promise<GetNotificationsResponse> => {
  try {
    const response = await api.get<GetNotificationsResponse>('/notifications', {
      params,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Mark notification as read
 * PATCH /notifications/:id
 */
export const markAsRead = async (id: string): Promise<any> => {
  try {
    const response = await api.patch(`/notifications/${id}`, { isRead: true });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

export default {
  getNotifications,
  markAsRead,
};
