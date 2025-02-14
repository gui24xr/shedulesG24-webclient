import { create } from "zustand";
import { apiClient } from "../config/apiclient";

const useProfileStore = create((set, get) => ({
  currentUser: null,
  isAutenticated: false,
  loading: true,
  error: null,

  loginUserInServer: async ({auth0Token,onSuccess})=>{
    console.log('Token adentro de login nuevo: ', auth0Token)
    try {
      const response = await apiClient.post(
        "/api/auth/login",
        {},
        {
          headers: {
            Authorization: `Bearer ${auth0Token}`,
          },
        }
      );
      console.log("Respuesta: ", response.data);
     set({ 
        isAutenticated:true,
        currentUser: { ...response.data.user } 
      })

      if (onSuccess) onSuccess()
    } catch (error) {
      console.error(error);
    }
  },

  logoutUserInServer: async () =>{
    const response = await apiClient.post("/api/auth/logout", { });
    console.log("Respuesta: ", response.data);
    set({ 
      isAutenticated:false,
      currentUser: null
    })
    return;
  },

  logoutUser: () =>{
    return {set:{isAutenticated:false, currentUser:null}}
  },

  createCompany: async (data) => {
    try {
      const response = await apiClient.post("/api/companies", { ...data });

      console.log("Respuesta: ", response.data);
      return;
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useProfileStore;
