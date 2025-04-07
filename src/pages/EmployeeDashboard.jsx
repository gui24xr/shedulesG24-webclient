import React,{useState,useEffect} from 'react';
import useProfileStore from '../store/useProfileStore';


const EmployeeDashboard = () => {
    const {currentUser,isAutenticated,loading,error} = useProfileStore()
   

    return (
        <div>
            <h1>Employee DASHBOARD</h1>
            
            
        </div>
    );
}

export default EmployeeDashboard;
