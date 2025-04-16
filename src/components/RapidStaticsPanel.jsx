import React from 'react'
import { UserOutlined, ShopOutlined, CalendarOutlined } from '@ant-design/icons';
import { Card, Row, Col, Space, Typography } from 'antd';
import styles from './styles/Dashboard.module.css';

const { Title, Text } = Typography;

const RapidStaticsPanel = () => {
  return (
    <Row gutter={[16, 16]} className={styles.statsRow}>
    <Col span={8}>
        <Card className={styles.statCard}>
            <Space direction="vertical" align="center">
                <ShopOutlined className={styles.statIcon} />
                <Title level={3}>0</Title>
                <Text type="secondary">Empresas</Text>
            </Space>
        </Card>
    </Col>
    <Col span={8}>
        <Card className={styles.statCard}>
            <Space direction="vertical" align="center">
                <CalendarOutlined className={styles.statIcon} />
                <Title level={3}>0</Title>
                <Text type="secondary">Reservas</Text>
            </Space>
        </Card>
    </Col>
    <Col span={8}>
        <Card className={styles.statCard}>
            <Space direction="vertical" align="center">
                <UserOutlined className={styles.statIcon} />
                <Title level={3}>0</Title>
                <Text type="secondary">Empleados</Text>
            </Space>
        </Card>
    </Col>
</Row>

  )
}

export default RapidStaticsPanel;
