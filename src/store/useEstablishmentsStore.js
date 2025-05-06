import { create } from 'zustand'
import { platformService } from '../services/index'


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
            set({loading: false, error: error})
        }
    },

    getCurrentItem: () => {
        const { data, currentId } = get();
        return data.items.find(est => est.id === currentId) || null;
    }

}))

export default useEstablishmentsStore