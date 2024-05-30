import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  PlusCircleOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); // Create a Form instance

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        "https://api-prototype-2-kukaas-projects.vercel.app/api/order"
      );
      setData(response.data);
    };

    fetchData();
  }, []);

  const handleDelete = async (record) => {
    try {
      await axios.delete(
        `https://api-prototype-2-kukaas-projects.vercel.app/api/order/${record.id}`
      );
      // Remove the deleted order from the local state
      setData(data.filter((order) => order.id !== record.id));
      message.success("Order deleted successfully");
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred. Please try again later.");
    }
  };

  const handleCreate = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const navigate = useNavigate();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const response = await axios.post(
        "https://api-prototype-2-kukaas-projects.vercel.app/api/order",
        values
      );
      setData([...data, response.data]);
      form.resetFields();
      setIsModalVisible(false);
      console.log(values);
      message.success("Order created successfully");
  
      // Redirect to the new page
      navigate(-1);
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred. Please try again later.");
    }
  };

  const columns = [
    {
      title: "Student Number",
      dataIndex: "studentNumber",
      key: "studentNumber",
      width: 150,
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      width: 150,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 100,
    },
    {
      title: "Items",
      dataIndex: "orderItems",
      key: "orderItems",
      width: 150,
      render: (items) =>
        items.map((item, index) => (
          <React.Fragment key={index}>
            <strong>{item.productType}</strong>: {item.quantity}
            {index < items.length - 1 && ", "}
          </React.Fragment>
        )),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (text, record) => (
        <Select
          defaultValue={text}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(value, record)}
        >
          <Select.Option value="CLAIMED">CLAIMED</Select.Option>
          <Select.Option value="UNCLAIMED">UNCLAIMED</Select.Option>
        </Select>
      ),
    },
    {
      title: (
        <Space size="middle">
          Action
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={handleCreate}
          >
            Create Order
          </Button>
        </Space>
      ),
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleUpdate(record)}>Update</Button>
          <Popconfirm
            title="Are you sure to delete this order?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        title={() => (
          <Typography.Title level={4} className="text-center mb-4">
            Orders
          </Typography.Title>
        )}
        pagination={{ pageSize: 7 }}
        scroll={{ x: "max-content" }}
        className="sm:w-full md:w-full"
      />
      <Modal
        title="Create Order"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Form form={form} layout="vertical" className="space-y-2 md:space-y-4">
          <Form.Item
            name="studentNumber"
            label="Student Number"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            name="studentName"
            label="Student Name"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            name="contactNumber"
            label="Contact Number"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Select>
              <Select.Option value="MALE">Male</Select.Option>
              <Select.Option value="FEMALE">Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            initialValue="UNCLAIMED"
            className="w-full"
          >
            <Select>
              <Select.Option value="CLAIMED">CLAIMED</Select.Option>
              <Select.Option value="UNCLAIMED">UNCLAIMED</Select.Option>
            </Select>
          </Form.Item>
          <Form.List name="orderItems">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "level"]}
                      key={[field.key, "level"]}
                      rules={[{ required: true, message: "Missing level" }]}
                    >
                      <Input placeholder="Level" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "productType"]}
                      key={[field.key, "productType"]}
                      rules={[
                        { required: true, message: "Missing product type" },
                      ]}
                    >
                      <Input placeholder="Product Type" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "quantity"]}
                      key={[field.key, "quantity"]}
                      rules={[{ required: true, message: "Missing quantity" }]}
                    >
                      <InputNumber placeholder="Quantity" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "size"]}
                      key={[field.key, "size"]}
                      rules={[{ required: true, message: "Missing size" }]}
                    >
                      <Input placeholder="Size" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "unitPrice"]}
                      key={[field.key, "unitPrice"]}
                      rules={[
                        { required: true, message: "Missing Unit Price" },
                      ]}
                    >
                      <Input placeholder="Unit Price" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Order Item
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default Orders;
