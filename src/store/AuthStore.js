import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService';
import { useProfileStore } from './ProfileStore';

export const useAuthStore = create(
        (set, get) => ({
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null,
            
            login: async (credentials) => {
                set({ loading: true, error: null });
                try {
                    const { token, user } = await authService.login(credentials);
                    set({ token, isAuthenticated: true, loading: false });
                    useProfileStore.getState().setCurrentUser(user);
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            },
            
            register: async (userData) => {
                set({ loading: true, error: null });
                try {
                    const { token, user } = await authService.register(userData);
                    set({ token, isAuthenticated: true, loading: false });
                    useProfileStore.getState().setCurrentUser(user);
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            },
            
            logout: () => {
                set({ token: null, isAuthenticated: false });
                useProfileStore.getState().clearProfile();
            },
            
            clearError: () => set({ error: null }),
        }),
      
); 