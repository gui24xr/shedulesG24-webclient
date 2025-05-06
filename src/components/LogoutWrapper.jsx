// components/LogoutButton.jsx
import React from "react"
import { useProfileStore } from "../store/index"
import { useAuth0 } from '@auth0/auth0-react'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
export default function LogoutWrapper({ children }) {
    
    const logoutOwnerInServer = useProfileStore((state) => state.logoutOwnerInServer)
    const { logout:logoutInClient } = useAuth0()
    
    const handleLogout = () => {
        logoutOwnerInServer({
            onSuccess: () => {
                logoutInClient()
            },
            onFailure: () => {
                console.error("Error al cerrar sesión")
            }
        })
    };


    const showConfirm = () => {
        Modal.confirm({
            title: '¿Estás seguro que querés cerrar sesión?',
            icon: <ExclamationCircleOutlined />,
            content: 'Esta acción cerrará tu sesión actual.',
            okText: 'Sí, cerrar sesión',
            cancelText: 'Cancelar',
            onOk: handleLogout,
        });
    };

    return children(showConfirm)
    
}
