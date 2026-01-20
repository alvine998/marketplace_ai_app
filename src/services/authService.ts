import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/api';

// Storage keys
const TOKEN_KEY = '@auth_token';
const USER_KEY = '@auth_user';

// Types for API requests and responses
export interface RegisterPayload {
  name: string;
  phone: string;
  gender: string;
  address: string;
  password: string;
}

export interface LoginPayload {
  phone: string;
  password: string;
}

export interface User {
  id: string;
  username?: string;
  email?: string;
  name: string;
  phone: string;
  gender?: string;
  address?: string;
  role?: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  success?: boolean;
  user?: User;
}

/**
 * Save auth token to storage
 */
export const saveToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
  // Update axios default header
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

/**
 * Get auth token from storage
 */
export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

/**
 * Save user data to storage
 */
export const saveUser = async (user: User): Promise<void> => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Get user data from storage
 */
export const getUser = async (): Promise<User | null> => {
  const userData = await AsyncStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

/**
 * Clear auth session
 */
export const clearSession = async (): Promise<void> => {
  await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
  delete api.defaults.headers.common['Authorization'];
};

/**
 * Initialize auth session (call on app start)
 */
export const initializeSession = async (): Promise<{
  token: string | null;
  user: User | null;
}> => {
  const token = await getToken();
  const user = await getUser();

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return { token, user };
};

export interface UpdateProfilePayload {
  name: string;
  email: string;
  phone: string;
  gender: string;
}

/**
 * Register a new user
 * POST /auth/register
 */
export const register = async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>(
      '/auth/register',
      payload,
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
 * Update user profile
 * PUT /users/:id
 */
export const updateProfile = async (
  id: string,
  payload: UpdateProfilePayload,
): Promise<{ message: string; success?: boolean; user?: User }> => {
  try {
    const response = await api.put(`/users/${id}`, payload);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Login user
 * POST /auth/login
 */
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', payload);

    // Save token and user to storage on successful login
    if (response.data.token) {
      await saveToken(response.data.token);
    }
    if (response.data.user) {
      await saveUser(response.data.user);
    }

    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  await clearSession();
};

export default {
  register,
  login,
  logout,
  saveToken,
  getToken,
  saveUser,
  getUser,
  clearSession,
  initializeSession,
  updateProfile,
};
