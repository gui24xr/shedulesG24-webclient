import { create } from "zustand";
import apiClient from "../libs/apiclient";
import { platformService } from "../services";


//Guillermo 
const useProfileStore = create((set, get) => ({
  isAutenticated: false,
  currentUser: null,
  loading: false,
  error: null,


  loginOwnerInServerAndSetProfile: async ({ auth0Token, deleteAuth0TokenFunction,onSuccess, onFailure }) => {
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
      if (deleteAuth0TokenFunction) deleteAuth0TokenFunction()
    }
  },


  checkSessionInServerAndSetProfile: async ({ onSuccess, onFailure }) => {
    console.log("setProfileStore")
    set({ loading: true })
    try {
      const profileData = await platformService.owners.checkSessionInServer()
      console.log("profileData", profileData.profile)
      set({
        isAutenticated: true,
        currentUser: { ...profileData.profile },
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
    set({ loading: true })
    try {
      const updatedUser = await platformService.owners.updateProfile(data);
      console.log("Respuesta en store update owner: ", updatedUser);
      set({ loading: false, currentUser: { ...updatedUser } })
      if (onSuccess) return onSuccess()
    } catch (error) {
      console.error(error);
      set({ loading: false, error: error })
      if (onFailure) return onFailure()
    }
  
  },

}));

export default useProfileStore;
