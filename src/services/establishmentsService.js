import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const establishmentsService = {
    async getEstablishments() {
        const response = await axios.get(`${API_URL}/establishments`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    },
    
    async getEstablishmentById(id) {
        const response = await axios.get(`${API_URL}/establishments/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    },
    
    async createEstablishment(data) {
        const response = await axios.post(`${API_URL}/establishments`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    },
    
    async updateEstablishment(id, data) {
        const response = await axios.put(`${API_URL}/establishments/${id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    },
    
    async deleteEstablishment(id) {
        const response = await axios.delete(`${API_URL}/establishments/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    },
    
    async getEstablishmentStats(id) {
        const response = await axios.get(`${API_URL}/establishments/${id}/stats`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    }
}; 