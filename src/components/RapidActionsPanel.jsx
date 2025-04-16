import React from 'react';
import { Card, Row, Col, Button, Space, Typography } from 'antd';
import { ShopOutlined, TeamOutlined, CalendarOutlined } from '@ant-design/icons';
import styles from './styles/RapidActionsPanel.module.css';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const RapidActionsPanel = () => {
    const navigate = useNavigate();

    const actions = [
        {
            title: 'Crear Establecimiento',
            icon: <ShopOutlined />,
            description: 'Agregar un nuevo establecimiento',
            action: () => navigate('/dashboard/establishment/new')
        },
        {
            title: 'Administrar Empleados',
            icon: <TeamOutlined />,
            description: 'Gestionar personal del establecimiento',
            action: () => navigate('/dashboard/employees')
        },
        {
            title: 'Ver Reservas',
            icon: <CalendarOutlined />,
            description: 'Consultar reservas y turnos',
            action: () => navigate('/dashboard/bookings')
        }
    ];

    return (
        <Card className={styles.rapidActionsCard}>
            <Title level={4} className={styles.panelTitle}>Acciones Rápidas</Title>
            <Row gutter={[16, 16]}>
                {actions.map((action, index) => (
                    <Col xs={24} sm={12} md={8} key={index}>
                        <Button 
                            type="default" 
                            className={styles.actionButton}
                            onClick={action.action}
                            icon={action.icon}
                        >
                            <Space direction="vertical" size={0}>
                                <span className={styles.actionTitle}>{action.title}</span>
                                <span className={styles.actionDescription}>{action.description}</span>
                            </Space>
                        </Button>
                    </Col>
                ))}
            </Row>
        </Card>
    );
};

export default RapidActionsPanel; 