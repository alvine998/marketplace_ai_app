import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, initializeSession, logout as logoutService, saveUser, updateProfile } from '../services/authService';

interface AuthUser extends User {
    avatar?: string;
    fcmToken?: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    isLoading: boolean;
    user: AuthUser | null;
    token: string | null;
    login: (userData: User, token: string) => void;
    logout: () => Promise<void>;
    updateUser: (userData: Partial<AuthUser>) => void;
    updateFcmToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Initialize session on app start
    useEffect(() => {
        const initSession = async () => {
            try {
                const session = await initializeSession();
                if (session.token && session.user) {
                    setToken(session.token);
                    setUser(session.user);
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('Failed to initialize session:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initSession();
    }, []);

    const login = (userData: User, authToken: string) => {
        setIsLoggedIn(true);
        setUser(userData);
        setToken(authToken);
    };

    const logout = async () => {
        try {
            // Remove FCM Token from server before logging out
            if (user && user.id) {
                const currentTokens = user.fcmTokens || [];
                const filteredTokens = currentTokens.filter(t => t !== 'fcm_token');

                try {
                    await updateProfile(user.id, { fcmTokens: filteredTokens });
                } catch (fcmError) {
                    console.error('Failed to remove FCM token on server:', fcmError);
                }
            }
            await logoutService();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoggedIn(false);
            setUser(null);
            setToken(null);
        }
    };

    const updateUser = async (userData: Partial<AuthUser>) => {
        if (user) {
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
            await saveUser(updatedUser);
        }
    };

    const updateFcmToken = (fcmToken: string) => {
        if (user) {
            setUser({ ...user, fcmToken });
        }
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            isLoading,
            user,
            token,
            login,
            logout,
            updateUser,
            updateFcmToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
