import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { 
  UserOutlined, 
  DashboardOutlined, 
  MessageOutlined,
  TrophyOutlined,
  BarChartOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  TeamOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './styles/Sidebar.module.css';

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 768);
  const { logout } = useAuth0();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/dashboard')
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Mi perfil',
      onClick: () => navigate('/dashboard/profile')
    },
    {
      key: 'establishment',
      icon: <ShopOutlined />,
      label: 'Establecimiento',
      onClick: () => navigate('/dashboard/establishment')
    },
    {
      key: 'employees',
      icon: <TeamOutlined />,
      label: 'Empleados',
      onClick: () => navigate('/dashboard/employees')
    },
    {
      key: 'bookings',
      icon: <CalendarOutlined />,
      label: 'Reservas',
      onClick: () => navigate('/dashboard/bookings')
    },
    {
      key: 'messages',
      icon: <MessageOutlined />,
      label: 'Mensajes',
      onClick: () => navigate('/dashboard/messages')
    },
    {
      key: 'statistics',
      icon: <BarChartOutlined />,
      label: 'Estadísticas',
      onClick: () => navigate('/dashboard/statistics')
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Cerrar Sesión',
      onClick: () => logout(),
      className: styles.logoutMenuItem
    }
  ];

  return (
    <Sider 
      className={styles.sider} 
      width={250}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        setCollapsed(broken);
      }}
      trigger={null}
    >
      <div className={styles.logo}>
        <UserOutlined className={styles.avatarIcon} />
        {!collapsed && <h2>Mi Perfil</h2>}
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['dashboard']}
        items={menuItems}
        className={styles.siderMenu}
      />
      <div className={styles.headerTrigger}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className={styles.triggerButton}
        />
      </div>
    </Sider>
  );
};

export default Sidebar; 