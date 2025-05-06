import { Card, Descriptions, Typography, Space, Tag } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function EstablishmentDetail({ establishment }) {
    if (!establishment) return null;

    return (
        <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                    <Title level={2}>{establishment.name}</Title>
                    <Tag color="blue">{establishment.type}</Tag>
                </div>

                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Dirección">
                        <Space>
                            <EnvironmentOutlined />
                            <Text>{establishment.address}</Text>
                        </Space>
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="Teléfono">
                        <Space>
                            <PhoneOutlined />
                            <Text>{establishment.phone}</Text>
                        </Space>
                    </Descriptions.Item>

                    <Descriptions.Item label="Email">
                        <Space>
                            <MailOutlined />
                            <Text>{establishment.email}</Text>
                        </Space>
                    </Descriptions.Item>

                    <Descriptions.Item label="Descripción">
                        <Text>{establishment.description}</Text>
                    </Descriptions.Item>
                </Descriptions>
            </Space>
        </Card>
    );
} 