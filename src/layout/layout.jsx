import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../components/index.js';
import styles from './Outlet.module.css'
import { useAuth0 } from '@auth0/auth0-react';
import useProfileStore from '../store/useProfileStore';
import { useNavigate } from 'react-router-dom';

const Layout = () => {


  const {  getAccessTokenSilently, isAuthenticated, logout, isLoading } = useAuth0()
  const { loginOwnerInServer, logoutUserInStoreAndServer} = useProfileStore()
  const navigate = useNavigate()
  useEffect(()=>{ 
      const callLoginInServer = async () => {
        try{
          if (isLoading) return;
          const auth0Token = await getAccessTokenSilently()
          loginOwnerInServer({ 
            auth0Token: auth0Token,
            onSuccess: () => {
              alert('Bienvenido....')
              navigate('/dashboard')
            },
            onFailure: () => {
              alert('Error al iniciar sesion en el server, redirigir a login...')
              navigate('/')
              return logout() 
            }
          })
        }catch(error){
            console.log('Error al obtener token de auth0...', error.message)
            return logout()
        }
      }
  
     // if (!isAuthenticated) return console.log('No esta autenticado...')
      callLoginInServer()
  
    },[isAuthenticated,isLoading])

    return (
        <div>
        <header>
        </header>
        <main className={styles.layout}>
          <Outlet />
        </main>
      </div>
    );
    
}

export default Layout;
