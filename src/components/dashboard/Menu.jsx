import { Menu } from "antd";
import {
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";

const { SubMenu } = Menu;

const MenuPage = () => {
  const { id } = useParams();
  
  return (
    <Menu style={{ width: 350 }} mode="vertical" defaultSelectedKeys={["1"]}>
      <Menu.Item
        key="1"
        icon={<PieChartOutlined />}
        style={{ marginBottom: "10px" }}
      >
        <Link to={`/home/admin/${id}/`}>Dashboard</Link>
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<DesktopOutlined />}
        style={{ marginBottom: "10px" }}
      >
        <Link to={`/home/admin/${id}/production`}>Production</Link>
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<ContainerOutlined />}
        style={{ marginBottom: "10px" }}
      >
        <Link to={`/home/admin/${id}/finished-product`}>Finished Product</Link>
      </Menu.Item>
      <Menu.Item
        key="4"
        icon={<MailOutlined />}
        style={{ marginBottom: "10px" }}
      >
        <Link to={`/home/admin/${id}/sales-report`}>Sales Report</Link>
      </Menu.Item>
      <SubMenu
        key="sub1"
        icon={<AppstoreOutlined />}
        title="Inventory"
        style={{ marginBottom: "10px" }}
      >
        <Menu.Item key="5">Raw Material Inventory</Menu.Item>
        <Menu.Item key="6">Finished Product Inventory</Menu.Item>
      </SubMenu>
      <Menu.Item
        key="7"
        icon={<DesktopOutlined />}
        style={{ marginBottom: "10px" }}
      >
        <Link to={`/home/admin/${id}/employees`}>Employees</Link>
      </Menu.Item>
    </Menu>
  );
};

export default MenuPage;
