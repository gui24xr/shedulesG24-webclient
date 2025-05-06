import { apiClient, loglevel } from "../libs/index"
const API_URL = import.meta.env.VITE_API_URL;

export const authService = {


    async loginOrRegisterOwner(auth0Token){
        const {data} = await apiClient.post(`${API_URL}/auth/owners/login-or-register`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${auth0Token}`
                }
            }
        )
        return data
    },

    asyncupdateOwnerProfile(data){
        const {data} = await apiClient.put(`${API_URL}/api/owners`, data)
        return data
    },



    //----------------------------------------------------------------
    async login(credentials) {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    },
    
    async register(userData) {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    },
    
    async getCurrentUser() {
        const response = await axios.get(`${API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    },
    
    async updateProfile(data) {
        const response = await axios.put(`${API_URL}/auth/profile`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    },
    
    async resetPassword(email) {
        const response = await axios.post(`${API_URL}/auth/reset-password`, { email });
        return response.data;
    },
    
    async verifyResetToken(token) {
        const response = await axios.post(`${API_URL}/auth/verify-reset-token`, { token });
        return response.data;
    },
    
    async updatePassword(data) {
        const response = await axios.post(`${API_URL}/auth/update-password`, data);
        return response.data;
    }
}; 