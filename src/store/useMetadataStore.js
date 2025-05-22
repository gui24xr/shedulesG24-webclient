import { create } from 'zustand'
import { platformService } from '../services/index'

const useMetadataStore = create((set,get) => ({
    loaded: false,
    loading: false,
    error: null,
    data:{
        businessCategories: [],
        schedulingConfigType: [],
        establishmentStatus: [],
        attendanceModes: [],
        employeeTypes: [],
        businessSubtypes: [],
        createEstablishmentForm: [],
    },

    fetchMetadata: async () => {
        set({loading: true})
        try {
            const metadata = await platformService.metadata.getMetadata()
            console.log('Respuesta en store fetchMetadatasss: ', metadata)
            return set({
                data: {
                    businessCategories: metadata.businessCategories,
                    schedulingConfigType: metadata.schedulingConfigType,
                    establishmentStatus: metadata.establishmentStatus,
                    attendanceModes: metadata.attendanceModes,
                    employeeTypes: metadata.employeeTypes,
                    businessSubtypes: metadata.businessSubtypes,
                    createEstablishmentForm: metadata.createEstablishmentForm,
                },
                loaded: true,
                loading: false,
            })
        } catch (error) {
            console.log('Error en store fetchMetadata: ', error)
            return set({error: error})
        } finally {
           set({loading: false})
        }
    }
}))

export default useMetadataStore