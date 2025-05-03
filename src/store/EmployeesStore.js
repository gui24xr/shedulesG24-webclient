import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { employeesService } from '../services/employeesService';

export const useEmployeesStore = create(
    persist(
        (set, get) => ({
            employees: [],
            currentEmployee: null,
            loading: false,
            error: null,
            
            setEmployees: (employees) => set({ employees }),
            setCurrentEmployee: (employee) => set({ currentEmployee: employee }),
            
            fetchEmployees: async (establishmentId) => {
                set({ loading: true, error: null });
                try {
                    const employees = await employeesService.getEmployees(establishmentId);
                    set({ employees, loading: false });
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            },
            
            fetchEmployeeById: async (id) => {
                set({ loading: true, error: null });
                try {
                    const employee = await employeesService.getEmployeeById(id);
                    set({ currentEmployee: employee, loading: false });
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            },
            
            createEmployee: async (data) => {
                set({ loading: true, error: null });
                try {
                    const newEmployee = await employeesService.createEmployee(data);
                    set(state => ({ 
                        employees: [...state.employees, newEmployee],
                        loading: false 
                    }));
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            },
            
            updateEmployee: async (id, data) => {
                set({ loading: true, error: null });
                try {
                    const updatedEmployee = await employeesService.updateEmployee(id, data);
                    set(state => ({
                        employees: state.employees.map(emp => 
                            emp.id === id ? updatedEmployee : emp
                        ),
                        currentEmployee: state.currentEmployee?.id === id 
                            ? updatedEmployee 
                            : state.currentEmployee,
                        loading: false
                    }));
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            },
            
            deleteEmployee: async (id) => {
                set({ loading: true, error: null });
                try {
                    await employeesService.deleteEmployee(id);
                    set(state => ({
                        employees: state.employees.filter(emp => emp.id !== id),
                        currentEmployee: state.currentEmployee?.id === id 
                            ? null 
                            : state.currentEmployee,
                        loading: false
                    }));
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            },
            
            clearEmployees: () => set({ 
                employees: [], 
                currentEmployee: null, 
                error: null 
            }),
        }),
        {
            name: 'employees-storage',
        }
    )
); 