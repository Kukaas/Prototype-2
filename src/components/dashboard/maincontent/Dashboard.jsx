import { Col, Row } from 'antd';
import SalesReport from './SalesReport';
import Orders from './Order';
import Production from './Production';

const Dashboard = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <Orders />
      </Col>
      <Col xs={24} md={12}>
        <SalesReport />
      </Col>
      <Col xs={24} md={24}>
        <Production />
      </Col>
    </Row>
  );
};

export default Dashboard;
