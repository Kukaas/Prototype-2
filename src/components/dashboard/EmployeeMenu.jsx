import { Menu } from "antd";
import { DesktopOutlined, DatabaseOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";

const EmployeeMenu = () => {
  const { id } = useParams();

  return (
    <Menu style={{ width: 350 }} mode="vertical" defaultSelectedKeys={["1"]}>
      <Menu.Item
        key="1"
        icon={<DesktopOutlined />}
        style={{ marginBottom: "10px" }}
      >
        <Link to={`/home/employee/${id}/production`}>Production</Link>
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<DatabaseOutlined />}
        style={{ marginBottom: "10px" }}
      >
        <Link to={`/home/employee/${id}/raw-material-inventory`}>Raw Material Inventory</Link>
      </Menu.Item>
    </Menu>
  );
};

export default EmployeeMenu;
