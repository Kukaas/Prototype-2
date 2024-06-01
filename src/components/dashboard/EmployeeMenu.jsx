import { Menu } from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";

const EmployeeMenu = () => {
  const { id } = useParams();

  return (
    <Menu style={{ width: 350 }} mode="vertical" defaultSelectedKeys={["1"]}>
      <Menu.Item
        key="1"
        icon={<PieChartOutlined />}
        style={{ marginBottom: "10px" }}
      >
        <Link to={`/home/employee/${id}/`}>Dashboard</Link>
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<DesktopOutlined />}
        style={{ marginBottom: "10px" }}
      >
        <Link to={`/home/employee/${id}/production`}>Production</Link>
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<ContainerOutlined />}
        style={{ marginBottom: "10px" }}
      >
        <Link to={`/home/employee/${id}/finished-product`}>Finished Product</Link>
      </Menu.Item>
    </Menu>
  );
};

export default EmployeeMenu;
