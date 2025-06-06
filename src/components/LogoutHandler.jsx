import { loglevel } from '../libs/index.js'
import { useEffect } from "react";
import { useProfileStore } from "../store/index.js"
import { useNavigate } from "react-router-dom";
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default function LogoutHandler() {
  
  const logoutOwnerInServer = useProfileStore((state) => state.logoutOwnerInServer)
  const isLoading = useProfileStore((state) => state.isLoading)
  const isAuthenticated = useProfileStore((state) => state.isAutenticated)
  const navigate = useNavigate()

  const cleanSession = () =>{
    logoutOwnerInServer({
      onSuccess: () =>  navigate("/"),
      onFailure: () => {
          console.error("Error al cerrar sesión")
      }
  })}

  const checkConfirmLogout = () => {
    Modal.confirm({
      title: '¿Estás seguro que querés cerrar sesión?',
      icon: <ExclamationCircleOutlined />,
      content: 'Esta acción cerrará tu sesión actual.',
      okText: 'Sí, cerrar sesión',
      cancelText: 'Cancelar',
      onOk: cleanSession,
  });
  }

  useEffect(() => {
    if (isAuthenticated) return checkConfirmLogout()
    return cleanSession()
  }, []);

  if (isLoading) return <Spin />
  return null
}
