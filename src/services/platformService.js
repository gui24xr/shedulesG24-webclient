import { apiClient } from "../libs/index"
import loglevel from "../libs/loglevel"
import { RefreshTokenExpiredError } from "./errors"

async function _makeRequestWithAccessToken(requestFn){
    try{
        console.log("Voy a hacer la request con el access token desde _makeRequestWithAccessToken", requestFn)
        const {data} = await requestFn()
        console.log('El token no murio...')
        return data
    }catch(error){
        console.log('Un error ocurrio en _makeRequestWithAccessToken', error)
        if (error.response?.status === 401) {
            try{
                console.log('Vencio el access token... intentando refresh!!!')
                await apiClient.post("/api/auth/owners/refresh-token")
                const {data} = await requestFn()
                return data
            }catch(error){
                if (error.response?.status === 401){
                    loglevel.error("Aca el refresh estan vencido y deberia cerrar la sesion: ", error)
                    window.location.href = "/logout"
                    throw new RefreshTokenExpiredError()
                }
                throw error;
            }    
        }
        throw error;
    }
}

const platformService = {

    metadata:{
        getMetadata: async ()=> {
            const {data} = await apiClient.get('/api/metadata')
            return data
    } 
    },
    owners:{
        loginOrRegisterOwner: async (auth0Token)=>{
                const {data} = await apiClient.post("/api/auth/owners/login-or-register",{},{ headers: {Authorization: `Bearer ${auth0Token}`,},});
                loglevel.info("Respuesta en platformService loginOrRegisterOwner: ", data)
                return data.payload
        },
        checkSessionInServer: async ()=>{
            const {data} = await apiClient.get("/api/auth/owners/check-session")
            loglevel.info("Respuesta en platformService checkSessionInServer: ", data)
            return data.payload
        },
        refreshToken: async ()=>{
            const {data:refreshTokenData} = await apiClient.post("/api/auth/owners/refresh-token")
            loglevel.info("Respuesta en platformService getRefreshToken: ", refreshTokenData)
            return refreshTokenData
        },
        logout: async ()=>{
            const {data:response} = await apiClient.post("/api/auth/owners/logout")
            loglevel.info("Respuesta en platformService logout: ",response)
        },
        getProfile: async ()=>{
            const profileData = await _makeRequestWithAccessToken(()=>apiClient.get("/api/owners/profile"))
            loglevel.info("Respuesta en platformService getProfile: ", profileData)
            return profileData
        },
        updateProfile: async (data)=>{
            const updatedProfileData = await _makeRequestWithAccessToken(()=>apiClient.put("/api/owners/profile", data))
            loglevel.info("Respuesta en platformService updateProfile: ", updatedProfileData)
            return updatedProfileData
        }
    },

    establishments:{
        createEstablishment: async (data)=>{
            const newEstablishmentData = await _makeRequestWithAccessToken(()=>apiClient.post("/api/establishments", data))
            loglevel.info("Respuesta en platformService createEstablishment: ", newEstablishmentData)
            return newEstablishmentData
        },
        getEstablishments: async ()=>{
            const establishmentsData = await _makeRequestWithAccessToken(()=>apiClient.get("/api/establishments"))
            loglevel.info("Respuesta en platformService getEstablishments: ", establishmentsData)
            return establishmentsData 
        },
        getEstablishmentById: async (id)=>{
            const establishmentData = await _makeRequestWithAccessToken(()=>apiClient.get(`/api/establishments/${id}`))
            loglevel.info("Respuesta en platformService getEstablishmentById: ", establishmentData)
            return establishmentData
        },
        updateEstablishment: async (id, data)=>{
            const updatedEstablishmentData = await _makeRequestWithAccessToken(()=>apiClient.put(`/api/establishments/${id}`, data))
            loglevel.info("Respuesta en platformService updateEstablishment: ", updatedEstablishmentData)
            return updatedEstablishmentData
        }
    },

    employees:{
        createEmployee: async (data)=>{
            const newEmployeeData = await _makeRequestWithAccessToken(()=>apiClient.post("/api/employees", data))
            loglevel.info("Respuesta en platformService createEmployee: ", newEmployeeData)
            return newEmployeeData
        },
        getEmployees: async ()=>{
            const employeesData = await _makeRequestWithAccessToken(()=>apiClient.get("/api/employees"))
            loglevel.info("Respuesta en platformService getEmployees: ", employeesData)
            return employeesData
        },
        getEmployeeById: async (id)=>{
            const employeeData = await _makeRequestWithAccessToken(()=>apiClient.get(`/api/employees/${id}`))
            loglevel.info("Respuesta en platformService getEmployeeById: ", employeeData)
            return employeeData
        },
        updateEmployee: async (id, data)=>{
            const updatedEmployeeData = await _makeRequestWithAccessToken(()=>apiClient.put(`/api/employees/${id}`, data))
            loglevel.info("Respuesta en platformService updateEmployee: ", updatedEmployeeData)
            return updatedEmployeeData
        }
    },
    
    
}

export default platformService