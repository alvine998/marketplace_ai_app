import api from '../config/api';

export type TransactionStatus =
  | 'pending'
  | 'paid'
  | 'shipped'
  | 'completed'
  | 'cancelled';

export interface Transaction {
  id: string;
  totalAmount: number;
  paymentMethod: string;
  status: TransactionStatus;
  createdAt: string;
}

export interface GetTransactionsResponse {
  totalItems: number;
  data: Transaction[];
  totalPages: number;
  currentPage: number;
}

/**
 * Get user transactions
 * GET /transactions
 */
export const getTransactions = async (
  userId: string,
  status?: TransactionStatus | string,
  page: number = 1,
  limit: number = 10,
): Promise<GetTransactionsResponse> => {
  try {
    const params: any = { userId, page, limit };
    if (status && status !== 'all') {
      params.status = status;
    }

    const response = await api.get<GetTransactionsResponse>('/transactions', {
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

export default {
  getTransactions,
};
