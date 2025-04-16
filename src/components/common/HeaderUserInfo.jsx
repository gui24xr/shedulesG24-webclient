import React from 'react'
import { Card, Row, Col, Avatar, Space, Typography, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from '../styles/Dashboard.module.css'      
import { NavLink } from 'react-router-dom';

const { Title, Text } = Typography;

const HeaderUserInfo = ({currentUser}) => {
    
console.log(currentUser)
return (
    <Card className={styles.headerCard}>
        <Row align="middle" gutter={16}>
            <Col>
                <Avatar 
                    size={64} 
                    icon={<UserOutlined />} 
                    className={styles.userAvatar}
                />
            </Col>
            <Col>
                <Space direction="vertical" size={0}>
                    <Title level={4}>{currentUser?.status == 'pendingData' ? 'Bienvenido, para comenzar a operar debes completar tus datos...' : `Bienvenido ${currentUser?.firstName} ${currentUser?.lastName}...`}</Title>
                    {
                        currentUser?.status == 'pendingData' 
                        ? 
                        <NavLink to='/dashboard/profile'>
                            <Button type='primary'>Completar datos</Button> 
                        </NavLink> 
                        : 
                        <Text type="secondary">{currentUser?.email}</Text>
                    }
                   
                </Space>
            </Col>
        </Row>
    </Card>
    )
  
}

export default HeaderUserInfo; 