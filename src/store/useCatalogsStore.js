import { create } from 'zustand'
import apiClient from '../config/apiclient'

const useCatalogsStore = create((set,get) => ({
    establishmentsCategories: {loaded: false, data: []},
    loading: false,
    error: null,

    fetchEstablishmentsCategories: async () => {
        set({loading: true})
        try {
            const response = await apiClient.get('/api/catalogs/establishment-categories')
            console.log('Respuesta en store fetchEstablishmentsCategories: ', response.data)
            set({establishmentsCategories: {loaded: true, data: response.data}, loading: false})
        } catch (error) {
            set({error: error, loading: false})
        } finally {
            set({loading: false})
        }
    }
}))

export default useCatalogsStore