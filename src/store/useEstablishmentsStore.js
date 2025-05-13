import { create } from 'zustand'
import { platformService } from '../services/index'
import { PlatformServiceError } from '../services/errors/PlatformServiceError'


//ESTABLISHMENTS STORE guillermo

const useEstablishmentsStore = create((set,get) => ({
    loading: false,
    error: null,
    data: {loaded: false, partialLoaded: false, items: []},
    currentItem: null,
    currentId: null,
    
    createEstablishment: async ({data,onSuccess,onError}) => {
        set({loading: true})
        try {
            const newEstablishment = await platformService.establishments.createEstablishment(data)
            set({
                loading: false,
                data: {
                    loaded: true, 
                    items: [...get().data.items, newEstablishment], 
                   
                },
                currentId: newEstablishment.id
            })
            if (onSuccess) return onSuccess()
        } catch (error) {
           if (onError) return onError(error)
        } finally {
            return set({loading: false})
        }
    },

    getEstablishmentById: async (id) => {
        const { data } = get();
        
        if (data.loaded) {
          const foundedItem = data.items.find(item => item.id === id);
          return set({ currentId: foundedItem.id, currentItem: foundedItem });;
        }
      
        set({ loading: true });
        try {
          const fetched = await platformService.establishments.getEstablishmentById(id);
          return set({
            loading: false,
            data: {
              ...data,
              partialLoaded: true,
              items: [...data.items, fetched],
            },
            currentId: fetched.id,
            currentItem: fetched
          });
          
        } catch (error) {
          return set({ error, loading: false });
        }
      },
      

    getEstablishments: async () => {
        const {data} = get()
        if (data.loaded) return 
        set({loading: true})
        try {
            const establishments = await platformService.establishments.getEstablishments()
            set({
                loading: false,
                data: {...data, loaded: true, items: establishments}
            })
        } catch (error) {
            if (error instanceof PlatformServiceError && error.isRefreshTokenExpired) {
                // Aquí podrías disparar una acción para cerrar sesión
                set({loading: false, error: new Error('Sesión expirada. Por favor, vuelva a iniciar sesión.')})
            } else {
                set(state => ({
                    loading: false, 
                    error: error,
                    data: state.data // mantener los datos anteriores
                }))
            }
        }
    },

    getCurrentItem: () => {
        const { data, currentId } = get();
        return data.items.find(est => est.id === currentId) || null;
    }

}))

export default useEstablishmentsStore