import React from 'react';
import useProfileStore from '../store/useProfileStore';


const Dashboard = () => {
    const {currentUser,isAutenticated,loading,error} = useProfileStore()
    console.log('currentUser: ', currentUser)
    return (
        <div>
            <h1>DASHBOARD</h1>
        </div>
    );
}

export default Dashboard;
