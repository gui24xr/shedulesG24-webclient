import React,{useState,useEffect} from 'react';
import useProfileStore from '../store/useProfileStore';
import { CreateCompanyForm, CompaniesContainer } from '../components';


const Dashboard = () => {
    const {currentUser,isAutenticated,loading,error} = useProfileStore()
   

    return (
        <div>
            <h1>DASHBOARD</h1>
            <CompaniesContainer/>
            
            
        </div>
    );
}

export default Dashboard;
