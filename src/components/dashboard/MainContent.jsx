import { Col, Row } from 'antd';
import SalesReport from './maincontent/SalesReport';
import Production from './maincontent/Production';
import Orders from './maincontent/Order';

const MainContent = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <Orders />
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 12 }} xl={{ span: 10 }}>
        <SalesReport />
      </Col>
      <Col xs={24} md={24}>
        <Production />
      </Col>
    </Row>
  );
}

export default MainContent;