import api from '../config/api';
import { Platform } from 'react-native';

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  subcategoryId?: string;
  isFlashSale: boolean;
  flashSalePrice?: number;
  flashSaleExpiry?: string; // ISO date string
  image?: {
    uri: string;
    type: string;
    name: string;
  };
}

/**
 * Create a new product
 * POST /products
 * Content-Type: multipart/form-data
 */
export const createProduct = async (
  payload: CreateProductPayload,
): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('description', payload.description);
    formData.append('price', String(payload.price));
    formData.append('stock', String(payload.stock));
    formData.append('category', payload.category);

    if (payload.subcategoryId) {
      formData.append('subcategoryId', payload.subcategoryId);
    }

    formData.append('isFlashSale', String(payload.isFlashSale));

    if (payload.isFlashSale) {
      if (payload.flashSalePrice) {
        formData.append('flashSalePrice', String(payload.flashSalePrice));
      }
      if (payload.flashSaleExpiry) {
        formData.append('flashSaleExpiry', payload.flashSaleExpiry);
      }
    }

    if (payload.image) {
      formData.append('image', {
        uri:
          Platform.OS === 'android'
            ? payload.image.uri
            : payload.image.uri.replace('file://', ''),
        type: payload.image.type || 'image/jpeg',
        name: payload.image.name || 'product_image.jpg',
      } as any);
    }

    const response = await api.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Create product failed:', error.response.data);
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Update an existing product
 * PUT /products/:id
 */
export const updateProduct = async (
  id: string,
  payload: CreateProductPayload,
): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('description', payload.description);
    formData.append('price', String(payload.price));
    formData.append('stock', String(payload.stock));
    formData.append('category', payload.category);

    if (payload.subcategoryId) {
      formData.append('subcategoryId', payload.subcategoryId);
    }

    formData.append('isFlashSale', String(payload.isFlashSale));

    if (payload.isFlashSale) {
      if (payload.flashSalePrice) {
        formData.append('flashSalePrice', String(payload.flashSalePrice));
      }
      if (payload.flashSaleExpiry) {
        formData.append('flashSaleExpiry', payload.flashSaleExpiry);
      }
    }

    if (payload.image) {
      formData.append('image', {
        uri:
          Platform.OS === 'android'
            ? payload.image.uri
            : payload.image.uri.replace('file://', ''),
        type: payload.image.type || 'image/jpeg',
        name: payload.image.name || 'product_image.jpg',
      } as any);
    }

    const response = await api.put(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Update product error:', error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Delete a product
 * DELETE /products/:id
 */
export const deleteProduct = async (id: string): Promise<any> => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Delete product error:', error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

export default {
  createProduct,
  updateProduct,
  deleteProduct,
};
