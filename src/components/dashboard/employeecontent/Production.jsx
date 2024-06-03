import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Select,
  Spin,
  Typography,
  message,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
} from "antd";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Production = () => {
  const [productions, setProductions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    const fetchProductions = async () => {
      setLoading(true);
      const response = await axios.get(
        `https://api-prototype-2-kukaas-projects.vercel.app/api/production/user/${id}`
      );
      setProductions(response.data);
      setLoading(false);
    };

    fetchProductions();
  }, [id]);

  const handleUpdate = async (id) => {
    const status = selectedStatus[id];
    if (status) {
      const productionToUpdate = productions.find(
        (production) => production.id === id
      );
      if (!productionToUpdate) {
        message.error("Production not found");
        return;
      }

      const payload = {
        level: productionToUpdate.level,
        productType: productionToUpdate.productType,
        size: productionToUpdate.size,
        quantity: productionToUpdate.quantity,
        status: status,
      };

      try {
        await axios.put(
          `https://api-prototype-2-kukaas-projects.vercel.app/api/production/${id}`,
          payload
        );

        setProductions((prevProductions) =>
          prevProductions.map((item) =>
            item.id === id ? { ...item, status } : item
          )
        );

        message.success("Status updated successfully");
      } catch (error) {
        console.error("Failed to update status:", error);
        message.error("Failed to update status");
      }
    } else {
      message.error("Please select a status before updating");
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      values = {
        ...values,
        status: "IN_PROGRESS",
        quantity: parseInt(values.quantity),
        productionStartTime: new Date().toISOString(),
      };
      const response = await axios.post(
        "https://api-prototype-2-kukaas-projects.vercel.app/api/production/",
        values
      );
      setProductions((prevProductions) => [...prevProductions, response.data]);
      message.success("Production added successfully");
      console.log("Production added successfully:", response.data);
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to add production");
      console.error("Failed to add production:", error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const ProductionModal = ({ isVisible, handleOk, handleCancel }) => {
    return (
      <Modal
      title={<Title level={3} style={{ textAlign: 'center' }}>Add Production</Title>}
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          initialValues={{ status: "IN_PROGRESS" }}
          layout="vertical"
          className="space-y-2 md:space-y-4"
        >
          <Form.Item
            label="Level"
            name="level"
            className="w-full font-bold"
            rules={[{ required: true, message: "Please select the level!" }]}
          >
            <Select placeholder="Select a level" className="w-full font-normal">
              <Select.Option value="COLLEGE">COLLEGE</Select.Option>
              <Select.Option value="SHS">SHS</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Product Type"
            name="productType"
            className="w-full font-bold"
            rules={[
              { required: true, message: "Please select the product type!" },
            ]}
          >
            <Select placeholder="Select a product type" className="w-full font-normal">
              <Select.Option value="BLOUSE">BLOUSE</Select.Option>
              <Select.Option value="SKIRT">SKIRT</Select.Option>
              <Select.Option value="POLO">POLO</Select.Option>
              <Select.Option value="PANTS">PANTS</Select.Option>
              <Select.Option value="LOGO">LOGO</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            className="w-full font-bold"
            rules={[{ required: true, message: "Please input the quantity!" }]}
          >
            <InputNumber
              min={1}
              className="w-full font-normal"
              placeholder="Enter Quantity"
            />
          </Form.Item>
          <Form.Item
            label="Size"
            name="size"
            className="w-full font-bold"
            rules={[{ required: true, message: "Please select the size!" }]}
          >
            <Select placeholder="Select a size" className="w-full font-normal">
              <Select.Option value="S14">S14</Select.Option>
              <Select.Option value="S15">S15</Select.Option>
              <Select.Option value="S16">S16</Select.Option>
              <Select.Option value="S7">S7</Select.Option>
              <Select.Option value="S18">S18</Select.Option>
              <Select.Option value="S18+">S18+</Select.Option>
              <Select.Option value="S19+">S19+</Select.Option>
              <Select.Option value="S24">S24</Select.Option>
              <Select.Option value="S25">S25</Select.Option>
              <Select.Option value="S26">S26</Select.Option>
              <Select.Option value="S27">S27</Select.Option>
              <Select.Option value="S28+">S28+</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            className="w-full font-bold"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input type="email" placeholder="Enter your email" className="w-full font-normal"/>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  ProductionModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    handleOk: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
  };

  const columns = [
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      witdh: 100,
    },
    {
      title: "Product Type",
      dataIndex: "productType",
      key: "productType",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 180,
      render: (status, record) => {
        const statusOptions = [
          "IN_PROGRESS",
          "PATTERN_MAKING",
          "CUTTING",
          "SEWING",
          "ASSORTING",
          "RECORDING",
          "COMPLETED",
        ];
        return (
          <Select
            defaultValue={status}
            style={{ width: 120 }}
            disabled={status === "COMPLETED"}
            onChange={(value) =>
              setSelectedStatus({ ...selectedStatus, [record.id]: value })
            }
          >
            {statusOptions.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: (
        <Space size="middle">
          Action
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={showModal}
          >
            Add
          </Button>
        </Space>
      ),
      key: "actions",
      render: (text, record) => (
        <Button onClick={() => handleUpdate(record.id)}>Update</Button>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <div className="justify-center sm:w-full">
        <div className="text-center mt-2">
          <Typography.Title level={2}>PRODUCTIONS</Typography.Title>
        </div>
        <Table
          className="sm:w-full md:w-full"
          columns={columns}
          dataSource={productions}
          rowKey="id"
          scroll={{ x: "max-content" }}
          pagination={{ pageSize: 7 }}
        />
      </div>
      <ProductionModal
        isVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </Spin>
  );
};

Production.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Production;
