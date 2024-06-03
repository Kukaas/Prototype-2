import Header from "./dashboard/Header";

import { useMediaQuery } from "react-responsive";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import EmployeeMenu from "./dashboard/EmployeeMenu";

const EmployeePage = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { id } = useParams();

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
            <Button onClick={showDrawer} className="mt-4 ml-4">
              <MenuOutlined />
            </Button>
            <Drawer
              title="Menu"
              placement="left"
              onClick={onClose}
              onClose={onClose}
              open={drawerVisible}
            >
              <EmployeeMenu />
            </Drawer>
          </>
        ) : (
          <EmployeeMenu className="w-1/4" userId={id} />
        )}
        <div className="w-3/4">
          <Outlet /> {/* Render nested routes here */}
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
