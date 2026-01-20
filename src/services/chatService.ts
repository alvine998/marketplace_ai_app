import api from '../config/api';

export interface Participant {
  id: string;
  username: string;
  name?: string;
  avatar?: string;
}

export interface ChatRoom {
  id: string;
  participant: Participant;
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
}

export interface GetChatRoomsResponse {
  success: boolean;
  data: ChatRoom[];
  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
}

/**
 * Get user chat rooms
 * GET /chat/rooms
 */
export const getChatRooms = async (
  userId: string,
  page: number = 1,
  limit: number = 20,
): Promise<ChatRoom[]> => {
  try {
    const response = await api.get<ChatRoom[]>('/chat/rooms', {
      params: {
        userId,
        page,
        limit,
      },
    });
    // The user provided an array as response in the prompt,
    // but usually it's wrapped in a success/data object.
    // Based on the prompt structure: [{id, participant...}]
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

export default {
  getChatRooms,
};
