import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService';

export const useProfileStore = create(
    persist(
        (set, get) => ({
            currentUser: null,
            loading: false,
            error: null,
            
            setCurrentUser: (user) => set({ currentUser: user }),
            
            fetchCurrentUser: async () => {
                set({ loading: true, error: null });
                try {
                    const user = await authService.getCurrentUser();
                    set({ currentUser: user, loading: false });
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            },
            
            updateProfile: async (data) => {
                set({ loading: true, error: null });
                try {
                    const updatedUser = await authService.updateProfile(data);
                    set({ currentUser: updatedUser, loading: false });
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            },
            
            clearProfile: () => set({ currentUser: null, error: null }),
        }),
        {
            name: 'profile-storage',
        }
    )
); 