import { create } from "zustand";
import apiClient from "../libs/apiclient";
import { platformService } from "../services";


//Guillermo 
const useProfileStore = create((set, get) => ({
  isAutenticated: false,
  currentUser: null,
  loading: false,
  error: null,


  loginOwnerInServerAndSetProfile: async ({ auth0Token, onSuccess, onFailure }) => {
    set({ loading: true })
    try {
      const profileData = await platformService.owners.loginOrRegisterOwner(auth0Token)
      set({
        isAutenticated: true,
        currentUser: { ...profileData },
        loading: false
      })
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error(error);
      set({ loading: false, error: error })
      if (onFailure) onFailure()
    }
    finally {
      set({ loading: false })
    }
  },


  checkSessionInServerAndSetProfile: async ({ onSuccess, onFailure }) => {
    console.log("setProfileStore")
    set({ loading: true })
    try {
      const profileData = await platformService.owners.checkSessionInServer()
      set({
        isAutenticated: true,
        currentUser: { ...profileData },
        loading: false
      })
      if (onSuccess) onSuccess()
    } catch (error) {
      //Aca tengo que manejar los estados de error de no auth, expired, etc
      console.debug('No hay un refresh token valido...');
      set({ loading: false })
      if (onFailure) onFailure()
    }
    finally {
      set({ loading: false })
    }
  },

  logoutOwnerInServer: async ({ onSuccess, onFailure }) => {
    set({ loading: true })
    try {
      await platformService.owners.logout()
      set({
        isAutenticated: false,
        currentUser: null,
        loading: false
      })
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error(error);
      set({ loading: false, error: error })
      if (onFailure) onFailure()
    }
    finally {
      set({ loading: false })
    }
  },

  //Esta funcion se ira al owners store que se encarga de las peticiones de owners
  updateOwnerDataInserver: async ({ data, onSuccess, onFailure }) => {
    try {
      set({ loading: true })
      const response = await apiClient.put("/api/owners", { ...data });
      console.log("Respuesta en store update owner: ", response.data);
      set({ loading: false, ownerStatus: response.data.status })
      if (onSuccess) {

        const updatedUserData = await apiClient.get("/api/owners")
        console.log("Respuesta en store update owner: ", updatedUserData.data);
        set({ currentUser: updatedUserData.data })
        onSuccess()
      }

      return;
    } catch (error) {
      console.error(error);
      set({ loading: false, error: error })
      if (onFailure) onFailure()
    }
    finally {
      set({ loading: false })
    }
  },

}));

export default useProfileStore;
