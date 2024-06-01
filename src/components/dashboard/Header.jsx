import { Layout, Menu, Badge, Dropdown, Button, Modal } from "antd";
import { UserOutlined, BellOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import moment from "moment";
import UserContext from "../../UserContext";

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useContext(UserContext);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <Header className="header">
      <div className="logo" />
      <div className="flex justify-end">
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="2">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item
                    key="1"
                    icon={<UserOutlined />}
                    onClick={showModal}
                  >
                    View Profile
                  </Menu.Item>
                  <Menu.Item
                    key="2"
                    icon={<LogoutOutlined />}
                    onClick={() => navigate("/")}
                  >
                    Logout
                  </Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <Button shape="circle" icon={<UserOutlined />} />
            </Dropdown>
          </Menu.Item>
          <Menu.Item key="1">
            <Badge count={5}>
              <Button shape="circle" icon={<BellOutlined />} />
            </Badge>
          </Menu.Item>
        </Menu>
      </div>
      <Modal
        title={<span style={{ fontSize: "2em" }}>Profile</span>}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="text-xl md:text-2xl lg:text-3xl xl:text-4xl w-full md:w-3/4 lg:w-2/3 xl:w-1/2"
      >
        <p className="my-5 font-bold text-lg">
          Name: <span className="font-normal ml-2">{user.name}</span>
        </p>
        <p className="my-5 font-bold text-lg">
          Email: <span className="font-normal ml-2">{user.email}</span>
        </p>
        <p className="my-5 font-bold text-lg">
          Contact Number:{" "}
          <span className="font-normal ml-2">{user.contactNumber}</span>
        </p>
        <p className="my-5 font-bold text-lg">
          Address: <span className="font-normal ml-2">{user.address}</span>
        </p>
        <p className="my-5 font-bold text-lg">
          Birth Date:{" "}
          <span className="font-normal ml-2">
            {moment(user.birthDate).format("MMMM D, YYYY")}
          </span>
        </p>
      </Modal>
    </Header>
  );
};

export default AppHeader;
