import React from 'react';
import { Button, Row, Col, Card } from 'antd';
import { AppstoreOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import styles from './styles/HomeIndex.module.css';

export default function HomeIndex() {
  return (
    <div className={styles.landing}>
      <Row align="middle" justify="center" className={styles.hero}>
        <Col xs={24} md={12} className={styles.heroText}>
          <h1>Agenda profesional para cualquier servicio</h1>
          <p>Gestioná turnos, empleados y recordatorios<br />en un sistema simple, potente y accesible.</p>
          <Button type="primary" size="large" className={styles.cta}>Comenzar ahora</Button>
        </Col>
        <Col xs={24} md={12} className={styles.heroImage}>
          {/* SVG de calendario profesional y minimalista */}
          <svg width="100%" height="260" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="32" y="40" width="336" height="180" rx="16" fill="#f8fafc" stroke="#2563eb" strokeWidth="2"/>
            <rect x="60" y="72" width="60" height="32" rx="6" fill="#2563eb" fillOpacity="0.15"/>
            <rect x="130" y="72" width="90" height="32" rx="6" fill="#2563eb" fillOpacity="0.25"/>
            <rect x="230" y="72" width="80" height="32" rx="6" fill="#2563eb" fillOpacity="0.15"/>
            <rect x="60" y="120" width="110" height="32" rx="6" fill="#2563eb" fillOpacity="0.25"/>
            <rect x="180" y="120" width="130" height="32" rx="6" fill="#2563eb" fillOpacity="0.15"/>
            <rect x="60" y="168" width="60" height="32" rx="6" fill="#2563eb" fillOpacity="0.15"/>
            <rect x="130" y="168" width="90" height="32" rx="6" fill="#2563eb" fillOpacity="0.25"/>
            <rect x="230" y="168" width="80" height="32" rx="6" fill="#2563eb" fillOpacity="0.15"/>
            <rect x="32" y="40" width="336" height="32" rx="8" fill="#2563eb" fillOpacity="0.1"/>
            <rect x="52" y="52" width="24" height="8" rx="4" fill="#2563eb" fillOpacity="0.7"/>
            <rect x="84" y="52" width="24" height="8" rx="4" fill="#2563eb" fillOpacity="0.4"/>
            <rect x="116" y="52" width="24" height="8" rx="4" fill="#2563eb" fillOpacity="0.2"/>
            <text x="60" y="220" fill="#2563eb" fontSize="16" fontWeight="bold">Servicios</text>
            <text x="230" y="220" fill="#2563eb" fontSize="16" fontWeight="bold">Empleados</text>
          </svg>
        </Col>
      </Row>

      <Row gutter={32} justify="center" className={styles.features}>
        <Col xs={24} md={8}>
          <Card bordered={false} className={styles.featureCard}>
            <AppstoreOutlined className={styles.icon} />
            <h3>Gestión multi-servicio y multi-empleado</h3>
            <p>Cada servicio tiene su propia agenda. O compartila si necesitás.</p>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false} className={styles.featureCard}>
            <CheckCircleOutlined className={styles.icon} />
            <h3>Notificaciones automáticas</h3>
            <p>Tus clientes reciben confirmaciones por WhatsApp, SMS o email.</p>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false} className={styles.featureCard}>
            <ClockCircleOutlined className={styles.icon} />
            <h3>Historial de movimientos y control total</h3>
            <p>Siempre sabés quién reservó, canceló o modificó.</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
