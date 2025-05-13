import { Card, Typography, Space, Tag, Button, Row, Col, Divider, List } from 'antd';
import { 
    EnvironmentOutlined, 
    PhoneOutlined, 
    MailOutlined, 
    ClockCircleOutlined,
    TeamOutlined,
    EditOutlined,
    GlobalOutlined,
    InfoCircleOutlined,
    CalendarOutlined,
    SettingOutlined,
    CheckCircleOutlined,
    WarningOutlined
} from '@ant-design/icons';
import styles from './styles/EstablishmentDetail.module.css';

const { Title, Text, Paragraph } = Typography;

export default function EstablishmentDetail({ establishment }) {
    if (!establishment) return null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className={styles.container}>
            <Card className={styles.mainCard}>
                {/* Header Section */}
                <div className={styles.header}>
                    <div className={styles.titleSection}>
                        <div className={styles.titleRow}>
                            <Title level={2} className={styles.title}>{establishment.name}</Title>
                            <Tag color="blue" className={styles.codeTag}>Código: {establishment.establishmentCode}</Tag>
                        </div>
                        <Space>
                            <Tag color={establishment.status === 'active' ? 'green' : 'red'}>
                                {establishment.status === 'active' ? 'Activo' : 'Inactivo'}
                            </Tag>
                            <Tag color="purple">{establishment.establishmentConfig.businessCategory}</Tag>
                        </Space>
                    </div>
                    <Button 
                        type="primary" 
                        icon={<EditOutlined />}
                        className={styles.editButton}
                    >
                        Editar
                    </Button>
                </div>

                <Divider className={styles.divider} />

                {/* Main Info Section */}
                <Row gutter={[24, 24]} className={styles.mainInfo}>
                    <Col xs={24} md={12}>
                        <Card className={styles.infoCard}>
                            <Space direction="vertical" size="large" className={styles.infoSpace}>
                                <div className={styles.infoItem}>
                                    <PhoneOutlined className={styles.icon} />
                                    <div>
                                        <Text strong>Teléfonos de Contacto</Text>
                                        <List
                                            size="small"
                                            dataSource={establishment.contactPhones}
                                            renderItem={phone => (
                                                <List.Item>
                                                    <Text className={styles.infoText}>{phone}</Text>
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <MailOutlined className={styles.icon} />
                                    <div>
                                        <Text strong>Emails de Contacto</Text>
                                        <List
                                            size="small"
                                            dataSource={establishment.contactEmails}
                                            renderItem={email => (
                                                <List.Item>
                                                    <Text className={styles.infoText}>{email}</Text>
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                </div>
                            </Space>
                        </Card>
                    </Col>

                    <Col xs={24} md={12}>
                        <Card className={styles.infoCard}>
                            <Space direction="vertical" size="large" className={styles.infoSpace}>
                                <div className={styles.infoItem}>
                                    <SettingOutlined className={styles.icon} />
                                    <div>
                                        <Text strong>Configuración</Text>
                                        <div className={styles.configInfo}>
                                            <div className={styles.configItem}>
                                                <Text type="secondary">Modo de Atención:</Text>
                                                <Text>{establishment.establishmentConfig.attendanceMode}</Text>
                                            </div>
                                            <div className={styles.configItem}>
                                                <Text type="secondary">Tipo de Configuración:</Text>
                                                <Text>{establishment.establishmentConfig.schedulingConfigType}</Text>
                                            </div>
                                            <div className={styles.configItem}>
                                                <Text type="secondary">Mostrar Ubicaciones:</Text>
                                                <Text>{establishment.establishmentConfig.displayLocations ? 'Sí' : 'No'}</Text>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <CheckCircleOutlined className={styles.icon} />
                                    <div>
                                        <Text strong>Estado de Configuración</Text>
                                        <div className={styles.statusInfo}>
                                            <Tag color={establishment.establishmentConfig.status.status === 'complete' ? 'green' : 'orange'}>
                                                {establishment.establishmentConfig.status.status === 'complete' ? 'Completo' : 'Incompleto'}
                                            </Tag>
                                            {establishment.establishmentConfig.status.missingConfigs.length > 0 && (
                                                <div className={styles.missingConfigs}>
                                                    <Text type="secondary">Configuraciones faltantes:</Text>
                                                    <List
                                                        size="small"
                                                        dataSource={establishment.establishmentConfig.status.missingConfigs}
                                                        renderItem={config => (
                                                            <List.Item>
                                                                <Text className={styles.infoText}>{config}</Text>
                                                            </List.Item>
                                                        )}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Space>
                        </Card>
                    </Col>
                </Row>

                {/* Description Section */}
                <Card className={styles.descriptionCard}>
                    <div className={styles.infoItem}>
                        <InfoCircleOutlined className={styles.icon} />
                        <div>
                            <Text strong>Descripción</Text>
                            <Paragraph className={styles.description}>
                                {establishment.description || 'No hay descripción disponible'}
                            </Paragraph>
                        </div>
                    </div>
                </Card>

                {/* Footer Section */}
                <div className={styles.footer}>
                    <Space>
                        <Text type="secondary">Creado: {formatDate(establishment.createdAt)}</Text>
                        <Text type="secondary">Última actualización: {formatDate(establishment.updatedAt)}</Text>
                    </Space>
                </div>
            </Card>
        </div>
    );
} 