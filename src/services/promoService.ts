import api from '../config/api';
import { getSafeImageUrl } from '../utils/imageHelper';

export interface PopupPromo {
  id: string;
  title: string;
  description?: string; // API might return description or message
  message?: string;
  imageUrl: string;
  ctaText?: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}

export interface GetPopupPromosResponse {
  data: PopupPromo[];
}

/**
 * Get popup promos
 * GET /popup-promos
 */
export const getPopupPromos = async (
  activeOnly: boolean = true,
): Promise<PopupPromo[]> => {
  try {
    const response = await api.get<any>('/popup-promos', {
      params: {
        activeOnly,
      },
    });

    let promos: PopupPromo[] = [];

    // Handle different possible response structures
    if (Array.isArray(response.data)) {
      promos = response.data;
    } else if (response.data && Array.isArray(response.data.data)) {
      promos = response.data.data;
    } else if (response.data && Array.isArray(response.data.items)) {
      promos = response.data.items;
    }

    // Transform URLs if they are from storage.googleapis.com
    return promos.map(promo => {
      if (promo.imageUrl) {
        const originalUrl = promo.imageUrl;
        promo.imageUrl = getSafeImageUrl(promo.imageUrl);

        if (originalUrl !== promo.imageUrl) {
          console.log(
            `[PromoService] Transformed URL: \nFrom: ${originalUrl} \nTo: ${promo.imageUrl}`,
          );
        }
      }
      return promo;
    });
  } catch (error: any) {
    console.error('getPopupPromos error:', error);
    return [];
  }
};

/**
 * Get popup promo by ID
 * GET /popup-promos/:id
 */
export const getPopupPromoById = async (
  id: string,
): Promise<PopupPromo | null> => {
  try {
    const response = await api.get<any>(`/popup-promos/${id}`);
    let promo: PopupPromo | null = null;

    if (response.data) {
      // Handle nested data structure if necessary, similar to list endpoint
      if (response.data.data && !response.data.id) {
        promo = response.data.data;
      } else {
        promo = response.data;
      }
    }

    if (promo && promo.imageUrl) {
      promo.imageUrl = getSafeImageUrl(promo.imageUrl);
    }

    return promo;
  } catch (error: any) {
    console.error(`getPopupPromoById error for id ${id}:`, error);
    return null;
  }
};

export default {
  getPopupPromos,
  getPopupPromoById,
};
