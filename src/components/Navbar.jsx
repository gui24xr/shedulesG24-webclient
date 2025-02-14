import React from 'react';
import styles from './styles/NavBar.module.css'; // Importa el CSS module
import { useAuth0 } from '@auth0/auth0-react';


const NavBar = () => {
    const { user, loginWithRedirect, logout } =
    useAuth0();
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <h1>Mi App</h1>
            </div>
            <div className={styles.menu}>
                {user ? (
                    <>
                        <span className={styles.userEmail}>{user ? user.email : 'Nada@nada.com'}</span>
                        <button className={styles.logoutButton} onClick={logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <button className={styles.loginButton} onClick={loginWithRedirect}>
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default NavBar;