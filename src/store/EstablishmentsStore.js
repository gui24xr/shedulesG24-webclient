import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { establishmentsService } from '../services/establishmentsService';

export const useEstablishmentsStore = create(
    persist(
        (set, get) => ({
            establishments: [],
            currentEstablishment: null,
            loading: false,
            error: null,
            
            setEstablishments: (establishments) => set({ establishments }),
            setCurrentEstablishment: (establishment) => set({ currentEstablishment: establishment }),
            
            fetchEstablishments: async () => {
                set({ loading: true, error: null });
                try {
                    const establishments = await establishmentsService.getEstablishments();
                    set({ establishments, loading: false });
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            },
            
            fetchEstablishmentById: async (id) => {
                set({ loading: true, error: null });
                try {
                    const establishment = await establishmentsService.getEstablishmentById(id);
                    set({ currentEstablishment: establishment, loading: false });
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            },
            
            createEstablishment: async (data) => {
                set({ loading: true, error: null });
                try {
                    const newEstablishment = await establishmentsService.createEstablishment(data);
                    set(state => ({ 
                        establishments: [...state.establishments, newEstablishment],
                        loading: false 
                    }));
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            },
            
            updateEstablishment: async (id, data) => {
                set({ loading: true, error: null });
                try {
                    const updatedEstablishment = await establishmentsService.updateEstablishment(id, data);
                    set(state => ({
                        establishments: state.establishments.map(est => 
                            est.id === id ? updatedEstablishment : est
                        ),
                        currentEstablishment: state.currentEstablishment?.id === id 
                            ? updatedEstablishment 
                            : state.currentEstablishment,
                        loading: false
                    }));
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            },
            
            deleteEstablishment: async (id) => {
                set({ loading: true, error: null });
                try {
                    await establishmentsService.deleteEstablishment(id);
                    set(state => ({
                        establishments: state.establishments.filter(est => est.id !== id),
                        currentEstablishment: state.currentEstablishment?.id === id 
                            ? null 
                            : state.currentEstablishment,
                        loading: false
                    }));
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            },
            
            clearEstablishments: () => set({ 
                establishments: [], 
                currentEstablishment: null, 
                error: null 
            }),
        }),
        {
            name: 'establishments-storage',
        }
    )
); 