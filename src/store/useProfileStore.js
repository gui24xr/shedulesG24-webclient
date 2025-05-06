import { create } from "zustand";
import apiClient from "../libs/apiclient";
import { platformService } from "../services";

const useProfileStore = create((set, get) => ({
  isAutenticated: false,
  currentUser: null,
  loading: false,
  error: null,

  loginOwnerInServer: async ({ auth0Token, onSuccess, onFailure }) => {
    set({ loading: true })
    try {
      await platformService.owners.loginOrRegisterOwner(auth0Token)
      const profileData = await platformService.owners.getProfile()
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

  logoutOwnerInServer: async ({ onSuccess, onFailure }) => {
    try {
      await platformService.owners.logout()
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

  logoutUserInStoreAndServer: async ({ onSuccess }) => {
    //const response = await apiClient.post("/api/auth/logout", { });

    set({
      currentUser: null
    })
    if (onSuccess) onSuccess()
    return;
  },

  logoutUser: () => {
    return { set: { isAutenticated: false, currentUser: null } }
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
