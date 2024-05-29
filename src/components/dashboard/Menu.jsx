import { Menu } from 'antd';
import { AppstoreOutlined, PieChartOutlined, DesktopOutlined, ContainerOutlined, MailOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const MenuPage = () => {

  return (
    <Menu style={{ width: 500 }} mode="vertical" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<PieChartOutlined />}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="2" icon={<DesktopOutlined />} >
        Production
      </Menu.Item>
      <Menu.Item key="3" icon={<ContainerOutlined />}>
        Finished Product
      </Menu.Item>
      <Menu.Item key="4" icon={<MailOutlined />}>
        Sales Report
      </Menu.Item>
      <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Inventory">
        <Menu.Item key="5">Raw Material Inventory</Menu.Item>
        <Menu.Item key="6">Finished Product Inventory</Menu.Item>
      </SubMenu>
      <Menu.Item key="7" icon={<DesktopOutlined />}>
        Employees
      </Menu.Item>
    </Menu>
  );
}

export default MenuPage;