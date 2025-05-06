import React from 'react';
import styles from './styles/NavBar.module.css'; 
import { useAuth0 } from '@auth0/auth0-react';
import { useProfileStore } from '../store/index';
import { Button } from 'antd';
import { LogoutWrapper } from './index';

const NavBar = () => {
    
      const currentUser = useProfileStore((state) => state.currentUser)
      const { loginWithRedirect} = useAuth0();
   
      const loginAsOwner = () => {
        loginWithRedirect();
      };
      
   
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <h1>Mi App</h1>
            </div>
            <div className={styles.menu}>
                {currentUser ? (
                    <>
                        <span className={styles.userEmail}>{currentUser.email}</span>
                       <LogoutWrapper>
                         {(showConfirm) => (
                            <Button type="primary" danger onClick={showConfirm}>Logout</Button>
                         )}
                       </LogoutWrapper>
                        
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