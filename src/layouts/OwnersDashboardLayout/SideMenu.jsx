import React from 'react';
import { Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  {
    key: '/owners',
    icon: <DashboardOutlined />, 
    label: 'Inicio',
  },
  {
    key: '/dashboard/establecimientos',
    icon: <CalendarOutlined />, 
    label: 'Establecimientos',
  },
  {
    key: '/dashboard/empleados',
    icon: <TeamOutlined />, 
    label: 'Empleados',
  },
  {
    key: '/owners/profile',
    icon: <UserOutlined />, 
    label: 'Perfil',
  },
  {
    key: '/owners/establishment/new',
    icon: <UserOutlined />, 
    label: 'Crear Establecimiento',
  },
  {
    key: '/dashboard/configuracion',
    icon: <SettingOutlined />, 
    label: 'Configuración',
  },
  {
    key: '/logout',
    icon: <LogoutOutlined />, 
    label: 'Salir',
  },
];

export default function SideMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    if (e.key === '/logout') {
      // Aquí puedes poner tu lógica de logout
      navigate('/login');
    } else {
      navigate(e.key);
    }
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      style={{
        height: '100vh',
        borderRight: 0,
        paddingTop: 32,
        background: '#fff',
        fontSize: 16,
      }}
      items={menuItems}
      onClick={handleClick}
    />
  );
}
