import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const employeesService = {
    async getEmployees(establishmentId) {
        const response = await axios.get(`${API_URL}/establishments/${establishmentId}/employees`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    },
    
    async getEmployeeById(id) {
        const response = await axios.get(`${API_URL}/employees/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    },
    
    async createEmployee(data) {
        const response = await axios.post(`${API_URL}/employees`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    },
    
    async updateEmployee(id, data) {
        const response = await axios.put(`${API_URL}/employees/${id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    },
    
    async deleteEmployee(id) {
        const response = await axios.delete(`${API_URL}/employees/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    },
    
    async getEmployeeStats(establishmentId) {
        const response = await axios.get(`${API_URL}/establishments/${establishmentId}/employee-stats`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    }
}; 