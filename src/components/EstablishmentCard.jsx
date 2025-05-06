import { Card, Row, Col, Button, Tag } from "antd"
import { EnvironmentOutlined, CalendarOutlined, UserOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

export default function EstablishmentCard({establishment}) {
    const navigate = useNavigate()
    return (
        <Card
          onClick={() => navigate(`/establishments/${establishment.id}`)}
          hoverable
          style={{ marginBottom: 24, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          bodyStyle={{ padding: 24 }}
          title={
            <Row align="middle" justify="space-between">
              <Col>
                <span style={{ fontSize: 22, fontWeight: 700, color: "#2563eb" }}>
                  {establishment.name}
                </span>
              </Col>
              <Col>
                <Tag color="blue">{establishment.status || "Activo"}</Tag>
              </Col>
            </Row>
          }
          extra={
            <Button type="primary" size="small">
              Ver detalles
            </Button>
          }
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <p style={{ margin: 0, color: "#4a5568" }}>
                <EnvironmentOutlined style={{ marginRight: 8, color: "#2563eb" }} />
                {establishment.address || "Sin dirección"}
              </p>
            </Col>
            <Col span={12}>
              <p style={{ margin: 0, color: "#4a5568" }}>
                <CalendarOutlined style={{ marginRight: 8, color: "#2563eb" }} />
                {establishment.openingHours || "Horario no definido"}
              </p>
            </Col>
            <Col span={12}>
              <p style={{ margin: 0, color: "#4a5568" }}>
                <UserOutlined style={{ marginRight: 8, color: "#2563eb" }} />
                {establishment.employeesCount != null
                  ? `${establishment.employeesCount} empleados`
                  : "Sin empleados"}
              </p>
            </Col>
          </Row>
        </Card>
      );
    }