import { create } from "zustand";
import { apiClient } from "../config/apiclient";

const useCompaniesStore = create((set, get) => ({
  data:[],
  loading: true,
  error: null,

  fetchData: async () =>{
    try{
        const result = await apiClient.get('/api/companies')
        console.log('Resultado: ',result.data)
        return set({data:result.data.companies})
    }catch(error){
        return set({error:error})
    }
},

  createCompany: async ({data,onSuccess,onError}) => {
    try {
      const response = await apiClient.post("/api/companies", { ...data });
      console.log("Respuesta: ", response.data);
      if (onSuccess) onSuccess(response.data)
      get().fetchData()
      return;
    } catch (error) {
      if (onError) onError(error)
      console.error(error);
    }
  },
}));

export default useCompaniesStore;
