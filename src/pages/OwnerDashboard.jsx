import React,{useState,useEffect} from 'react';
import useProfileStore from '../store/useProfileStore';
import { useAuth0 } from '@auth0/auth0-react';

const OwnerDashboard = () => {
    const {currentUser,isAutenticated,loading,error, loginOwnerInServer, logoutUserInServer} = useProfileStore()
   
    const { user, getAccessTokenSilently, isAuthenticated, logout } = useAuth0()

   
  useEffect(()=>{ 
    if (!isAuthenticated) logoutUserInServer()
    else {
      getAccessTokenSilently()
      .then((auth0Token) => {
        console.log('Token en nuevo use efectt: ', auth0Token)
        loginOwnerInServer({
          auth0Token: auth0Token,
          onSuccess: () => {
            return alert('Se inicio sesion en el server, redirigir a dashboard....')
           
          },
          onFailure: () => {
            alert('Error al iniciar sesion en el server, redirigir a login...')
            return logout()
          }
        })
      })
      .catch((error) => console.log('Error al obtener token de auth0...', error))
    }
  },[isAuthenticated])
    
    return (
        <div>
            <h1>Owner DASHBOARD</h1>
            
            
        </div>
    );
}

export default OwnerDashboard;
