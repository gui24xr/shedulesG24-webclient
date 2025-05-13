import React from 'react';
import styles from './styles/NavBar.module.css'; 
import { useProfileStore } from '../store/index';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate()
      const currentUser = useProfileStore((state) => state.currentUser)
      const isAuthenticated = useProfileStore((state) => state.isAutenticated)
          
   
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <h1>Mi App</h1>
            </div>
            <div className={styles.menu}>
                {isAuthenticated ? (
                    <>
                        <span className={styles.userEmail}>{currentUser.email}</span>
                      
                            <Button type="primary" danger onClick={() => navigate('/logout')}>Logout</Button>
                       
                        
                    </>
                ) : (
                    <>
                         <button className={styles.loginButton} onClick={() => navigate('/login')}>
                            Login as Owner
                        </button>
                       
                    </>
                   
                )}
            </div>
        </nav>
    );
};

export default NavBar;