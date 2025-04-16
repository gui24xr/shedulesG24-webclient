import { create } from 'zustand'
import apiClient from '../config/apiclient'

const useEstablishmentsStore = create((set,get) => ({
    establishments: {loaded: false, data: []},
    loading: false,
    error: null,
    lastEstablismentCreated: null,

    createEstablishment: async ({establishmentData,onSuccess,onError}) => {
        set({loading: true})
        try {
            const response = await apiClient.post('/api/owners/establishments', establishmentData)
            console.log('Respuesta en store createEstablishment: ', response.data)
            set({lastEstablismentCreated: response.data})
            if (onSuccess) return onSuccess()
        } catch (error) {
           if (onError) return onError(error)
        } finally {
            return set({loading: false})
        }
    }
}))

export default useEstablishmentsStore