import React from 'react';
import { Card, Row, Col, Button, Typography } from 'antd';
import { FileAddOutlined, FileSearchOutlined, FileDoneOutlined } from '@ant-design/icons';
import styles from './RapidActionsPanel.module.css';

const { Title } = Typography;

const RapidActionsPanel = () => {
  return (
    <Card className={styles.actionsCard}>
      <Title level={4}>Acciones Rápidas</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Button 
            type="primary" 
            icon={<FileAddOutlined />}
            className={styles.actionButton}
            block
          >
            Nuevo Documento
          </Button>
        </Col>
        <Col xs={24} sm={8}>
          <Button 
            type="primary" 
            icon={<FileSearchOutlined />}
            className={styles.actionButton}
            block
          >
            Buscar Documento
          </Button>
        </Col>
        <Col xs={24} sm={8}>
          <Button 
            type="primary" 
            icon={<FileDoneOutlined />}
            className={styles.actionButton}
            block
          >
            Mis Documentos
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default RapidActionsPanel; 