import { apiClient } from "../libs/index"
import loglevel from "../libs/loglevel"

const platformService = {
    
    owners:{
        loginOrRegisterOwner: async (auth0Token)=>{
            await apiClient.post("/api/auth/owners/login-or-register",{},{ headers: {Authorization: `Bearer ${auth0Token}`,},});
            loglevel.info("Respuesta en ownerService loginOrRegisterOwner: ")
        },
        logout: async ()=>{
            const {data:response} = await apiClient.post("/api/auth/owners/logout")
            loglevel.info("Respuesta en ownerService logout: ",response)
        },
        getProfile: async ()=>{
            const {data:profileData} = await apiClient.get("/api/owners/profile")
            loglevel.info("Respuesta en ownerService getProfile: ", profileData)
            return profileData
        },
        updateProfile: async (data)=>{
            const {data:updatedProfileData} = await apiClient.put("/api/owners", data)
            loglevel.info("Respuesta en ownerService updateProfile: ", updatedProfileData)
            return updatedProfileData
        }
    },

    establishments:{
        createEstablishment: async (data)=>{
            const {data:newEstablishmentData} = await apiClient.post("/api/establishments", data)
            loglevel.info("Respuesta en establishmentService createEstablishment: ", newEstablishmentData)
            return newEstablishmentData
        },
        getEstablishments: async ()=>{
            const {data:establishmentsData} = await apiClient.get("/api/establishments")
            loglevel.info("Respuesta en establishmentService getEstablishments: ", establishmentsData)
            return establishmentsData
        },
        getEstablishmentById: async (id)=>{
            const {data:establishmentData} = await apiClient.get(`/api/establishments/${id}`)
            loglevel.info("Respuesta en establishmentService getEstablishmentById: ", establishmentData)
            return establishmentData
        },
        updateEstablishment: async (id, data)=>{
            const {data:updatedEstablishmentData} = await apiClient.put(`/api/establishments/${id}`, data)
            loglevel.info("Respuesta en establishmentService updateEstablishment: ", updatedEstablishmentData)
            return updatedEstablishmentData
        }
    },

    employees:{
        createEmployee: async (data)=>{
            const {data:newEmployeeData} = await apiClient.post("/api/employees", data)
            loglevel.info("Respuesta en employeeService createEmployee: ", newEmployeeData)
            return newEmployeeData
        },
        getEmployees: async ()=>{
            const {data:employeesData} = await apiClient.get("/api/employees")
            loglevel.info("Respuesta en employeeService getEmployees: ", employeesData)
            return employeesData
        },
        getEmployeeById: async (id)=>{
            const {data:employeeData} = await apiClient.get(`/api/employees/${id}`)
            loglevel.info("Respuesta en employeeService getEmployeeById: ", employeeData)
            return employeeData
        },
        updateEmployee: async (id, data)=>{
            const {data:updatedEmployeeData} = await apiClient.put(`/api/employees/${id}`, data)
            loglevel.info("Respuesta en employeeService updateEmployee: ", updatedEmployeeData)
            return updatedEmployeeData
        }
    },
    
    
}

export default platformService