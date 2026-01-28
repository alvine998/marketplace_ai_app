import api from '../config/api';

export interface RegisterSellerResponse {
  message: string;
  data?: any;
}

export interface RegisterSellerPayload {
  storeName: string;
  description: string;
  address: string;
  userId: string;
  logo?: {
    uri: string;
    type: string;
    name: string;
  };
}

export interface SellerProfile {
  id: string;
  storeName: string;
  description: string;
  address: string;
  logoUrl?: string;
  isVerified: boolean;
  isOfficial: boolean;
  rating: number;
  totalProducts: number;
}

/**
 * Register a new seller
 * POST /sellers/register
 * Content-Type: multipart/form-data
 */
export const registerSeller = async (
  payload: RegisterSellerPayload,
): Promise<RegisterSellerResponse> => {
  try {
    const formData = new FormData();
    formData.append('storeName', payload.storeName);
    formData.append('description', payload.description);
    formData.append('address', payload.address);
    formData.append('userId', payload.userId);

    if (payload.logo) {
      formData.append('logo', {
        uri: payload.logo.uri,
        type: payload.logo.type,
        name: payload.logo.name,
      } as any);
    }

    const response = await api.post<RegisterSellerResponse>(
      '/sellers/register',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Get current user seller profile
 * GET /sellers/me
 */
export const getSellerProfile = async (): Promise<SellerProfile | null> => {
  try {
    const response = await api.get<SellerProfile>('/sellers/me');
    return response.data;
  } catch (error: any) {
    // If 404, user is not a seller yet
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

export default {
  registerSeller,
  getSellerProfile,
};
