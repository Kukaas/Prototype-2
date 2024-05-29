import Header from "./dashboard/Header";
import MainContent from "./dashboard/MainContent";
import MenuPage from "./dashboard/Menu";

import { useMediaQuery } from 'react-responsive';
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useState } from "react";


const AdminPage = () => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
    const [drawerVisible, setDrawerVisible] = useState(false);

    const showDrawer = () => {
    setDrawerVisible(true);
    };

    const onClose = () => {
    setDrawerVisible(false);
};
    return (
        <div className="flex flex-col h-screen">
            <Header className="w-full" />
            <div className="flex flex-grow">
            {isSmallScreen ? (
                <>
                    <Button type="primary" onClick={showDrawer}>
                    <MenuOutlined />
                    </Button>
                    <Drawer
                    title="Menu"
                    placement="left"
                    onClick={onClose}
                    onClose={onClose}
                    open={drawerVisible}
                    >
                    <MenuPage />
                    </Drawer>
                </>
                ) : (
                <MenuPage className="w-1/4" />
                )}
                <MainContent className="w-3/4" />
            </div>
        </div>
    );
}

export default AdminPage;