import React from 'react'
import { Row, Col, Card, Statistic, Progress, Button } from 'antd'
import { 
    UserOutlined, 
    ShopOutlined, 
    TeamOutlined, 
    DollarOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined
} from '@ant-design/icons'
import { EstablishmentsList, OwnersDashboardProfileBar } from '../components/index.js'
import styles from '../components/styles/Dashboard.module.css'

export default function OwnersDashboardIndex() {
    return (
        <div className={styles.dashboardContainer}>
            <Row gutter={[24, 24]}>
                {/* Tarjetas de estadísticas */}
                <Col xs={24} sm={12} lg={6}>
                    <Card className={styles.statCard}>
                        <Statistic
                            title="Total Establecimientos"
                            value={5}
                            prefix={<ShopOutlined />}
                            valueStyle={{ color: '#3f8600' }}
                            suffix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className={styles.statCard}>
                        <Statistic
                            title="Empleados Activos"
                            value={28}
                            prefix={<TeamOutlined />}
                            valueStyle={{ color: '#3f8600' }}
                            suffix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className={styles.statCard}>
                        <Statistic
                            title="Ingresos Mensuales"
                            value={12500}
                            prefix={<DollarOutlined />}
                            valueStyle={{ color: '#3f8600' }}
                            suffix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className={styles.statCard}>
                        <Statistic
                            title="Usuarios Activos"
                            value={156}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#3f8600' }}
                            suffix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>

                {/* Gráficos y métricas */}
                <Col xs={24} lg={16}>
                    <Card className={styles.chartCard} title="Rendimiento de Establecimientos">
                        <div style={{ height: 300 }}>
                            {/* Aquí iría el gráfico de rendimiento */}
                            <div style={{ 
                                height: '100%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                background: '#f5f5f5',
                                borderRadius: '8px'
                            }}>
                                Gráfico de Rendimiento
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card className={styles.metricsCard} title="Métricas Clave">
                        <div className={styles.metricItem}>
                            <div className={styles.metricLabel}>Tasa de Conversión</div>
                            <Progress percent={75} status="active" />
                        </div>
                        <div className={styles.metricItem}>
                            <div className={styles.metricLabel}>Satisfacción del Cliente</div>
                            <Progress percent={85} status="active" />
                        </div>
                        <div className={styles.metricItem}>
                            <div className={styles.metricLabel}>Eficiencia Operativa</div>
                            <Progress percent={65} status="active" />
                        </div>
                    </Card>
                </Col>

                {/* Lista de Establecimientos */}
                <Col span={24}>
                    <Card className={styles.listCard} title="Establecimientos">
                        <EstablishmentsList />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
