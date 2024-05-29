import { Col, Row } from 'antd';
import SalesReport from './maincontent/SalesReport';
import Production from './maincontent/Production';
import Orders from './maincontent/Order';
import { Routes, Route } from 'react-router-dom';

const MainContent = () => {
  return (
    <Routes>
      <Route path="/" element={
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
      } />
      <Route path="" element={<Production />} />
    </Routes>
  );
}

export default MainContent;