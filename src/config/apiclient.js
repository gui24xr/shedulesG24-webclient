import axios from 'axios'


export const apiClient = axios.create({
    baseURL:  "http://localhost:8085",
    //timeout: 5000,
    withCredentials: true
   
})
 
