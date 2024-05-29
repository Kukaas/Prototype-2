import { Layout, Menu, Badge, Avatar } from 'antd';
import { UserOutlined, BellOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader = () => {
    return (
        <Header className="header">
            <div className="logo" />
            <div className="flex justify-end">
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="2">
                        <Avatar icon={<UserOutlined className="hover:text-blue-700" style={{ color: 'white' }} />} />
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Badge count={5}>
                            <BellOutlined className="hover:text-blue-700" style={{ fontSize: '20px', color: 'white' }} />
                        </Badge>
                    </Menu.Item>
                </Menu>
            </div>
        </Header>
    );
}

export default AppHeader;