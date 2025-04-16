import React from 'react';
import styles from './styles/NavBar.module.css'; 
import { useAuth0 } from '@auth0/auth0-react';
import useProfileStore from '../store/useProfileStore';
const NavBar = () => {
      const {currentUser,logoutUserInStoreAndServer} = useProfileStore()
      const { loginWithRedirect,logout:logoutInClient } = useAuth0();
   
      const loginAsOwner = () => {
        loginWithRedirect();
      };
      
      const logoutUserFromServerAndClient = () =>{
        logoutUserInStoreAndServer({onSuccess: logoutInClient()})
      }

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <h1>Mi App</h1>
            </div>
            <div className={styles.menu}>
                {currentUser ? (
                    <>
                        <span className={styles.userEmail}>{currentUser.email}</span>
                        <button className={styles.logoutButton} onClick={logoutUserFromServerAndClient}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                         <button className={styles.loginButton} onClick={loginAsOwner}>
                            Login as Owner
                        </button>
                       
                    </>
                   
                )}
            </div>
        </nav>
    );
};

export default NavBar;