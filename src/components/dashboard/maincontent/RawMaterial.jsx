import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Spin,
  Typography,
  InputNumber,
  message,
  Popconfirm,
  Modal,
  Form,
  Input,
  Space,
} from "antd";
import PropTypes from "prop-types";
import { PlusCircleOutlined } from "@ant-design/icons";

const RawMaterial = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios(
        "https://api-prototype-2-kukaas-projects.vercel.app/api/raw-material-inventory"
      );
      setData(result.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleQuantityChange = (value, record) => {
    const newData = [...data];
    const index = newData.findIndex((item) => record.id === item.id); // Use record.id instead of record.key
    if (index > -1) {
      const item = newData[index];
      newData[index] = { ...item, quantity: value }; // Only update the quantity of the item
      setData(newData);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const rawMaterialToUpdate = data.find((item) => item.id === id);

      let status = rawMaterialToUpdate.status;
      if (parseInt(rawMaterialToUpdate.quantity) === 0) {
        status = "OUT_OF_STOCK";
      } else if (parseInt(rawMaterialToUpdate.quantity) > 0) {
        status = "IN_STOCK";
      }

      const payload = {
        quantity: parseInt(rawMaterialToUpdate.quantity),
        status: status,
      };

      console.log("Payload", payload);

      await axios.put(
        `https://api-prototype-2-kukaas-projects.vercel.app/api/raw-material-inventory/${id}`,
        payload
      );

      // Update the specific item in the data array
      const updatedData = data.map((item) =>
        item.id === id ? { ...item, ...payload } : item
      );

      // Set the state with the updated data
      setData(updatedData);

      message.success("Record updated successfully");
    } catch (error) {
      console.error("Failed to update record", error);
      message.error("Failed to update record");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://api-prototype-2-kukaas-projects.vercel.app/api/raw-material-inventory/${id}`
      );
      // Remove the deleted raw material from the local state
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);

      message.success("Order deleted successfully");
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred. Please try again later.");
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      let values = await form.getFieldsValue();
      values = {
        ...values,
        quantity: parseInt(values.quantity),
      };

      // Search for an existing product type
      const existingProduct = data.find(
        (item) => item.rawMaterialType === values.rawMaterialType
      );

      if (existingProduct) {
        // If the product type exists, update its quantity
        const updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + values.quantity,
        };

        const response = await axios.put(
          `https://api-prototype-2-kukaas-projects.vercel.app/api/raw-material-inventory/${existingProduct.id}`,
          updatedProduct
        );

        // Update the specific item in the data array
        const updatedData = data.map((item) =>
          item.id === existingProduct.id ? response.data : item
        );
        setData(updatedData);
      } else {
        // If the product type doesn't exist, add a new product
        const response = await axios.post(
          `https://api-prototype-2-kukaas-projects.vercel.app/api/raw-material-inventory/`,
          values
        );

        setData((prevData) => [...prevData, response.data]);
      }

      setIsModalVisible(false);
      form.resetFields();
      message.success("Raw material added successfully");
    } catch (error) {
      console.error("Failed to add raw material:", error);
      message.error("Failed to add raw material");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const RawMaterialModal = ({ isVisible, handleOk, handleCancel }) => {
    return (
      <Modal
        title="Raw Material"
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Raw Material Type"
            name="rawMaterialType"
            rules={[
              {
                required: true,
                message: "Please input the raw material type!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please input the quantity!" }]}
          >
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item
            label="Unit"
            name="unit"
            rules={[{ required: true, message: "Please input the unit!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  RawMaterialModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    handleOk: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
  };

  const columns = [
    {
      title: "Raw Material Type",
      dataIndex: "rawMaterialType",
      key: "rawMaterialType",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 150,
      render: (text, record) => (
        <InputNumber
          min={0}
          value={text}
          onChange={(value) => handleQuantityChange(value, record)}
        />
      ),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
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
      key: "action",
      render: (record) => (
        <div>
          <Button
            type="primary"
            style={{ marginRight: "10px" }}
            onClick={() => handleUpdate(record.id)}
          >
            Update
          </Button>
          <Popconfirm
            title="Are you sure to delete this record?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <div className="justify-center sm:w-full">
        <div className="text-center mt-2">
          <Typography.Title level={2}>RAW MATERIALS</Typography.Title>
        </div>
        <Table
          className="sm:w-full md:w-full"
          columns={columns}
          dataSource={data}
          rowKey="id"
          scroll={{ x: "max-content" }}
          pagination={{ pageSize: 7 }}
        />
      </div>
      <RawMaterialModal
        isVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </Spin>
  );
};

export default RawMaterial;
