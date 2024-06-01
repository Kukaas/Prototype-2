import {
  Button,
  Form,
  Input,
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

const Orders = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); // Create a Form instance
  const [selectedStatus, setSelectedStatus] = useState({});

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

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form Values: ", values); // Log the values to ensure they're correct
      if (
        !values.studentNumber ||
        !values.studentName ||
        !values.contactNumber ||
        !values.gender ||
        !values.status ||
        !Array.isArray(values.orderItems)
      ) {
        message.error("Please fill all required fields.");
        return;
      }

      values.orderItems.forEach((item) => {
        console.log(item);
        item.quantity = Number(item.quantity);
        item.unitPrice = Number(item.unitPrice);
        if (
          !item.level ||
          !item.productType ||
          typeof item.quantity !== "number" ||
          !item.size ||
          typeof item.unitPrice !== "number"
        ) {
          message.error("Please fill all required fields in order items.");
          return;
        }
      });

      const response = await axios.post(
        "https://api-prototype-2-kukaas-projects.vercel.app/api/order",
        values
      );
      console.log("Response: ", response); // Log the entire response object

      if (response.status === 201) {
        setData([...data, response.data]); // Use the response data to update the state
        form.resetFields();
        setIsModalVisible(false);
        message.success("Order created successfully");
      } else {
        throw new Error("Unexpected server response");
      }
    } catch (error) {
      console.error("Error:", error);
      console.log("Error Response: ", error.response); // Log the error response
      message.error("An error occurred. Please try again later.");
    }
  };

  const handleUpdate = async (id) => {
    const status = selectedStatus[id];
    console.log(status);
    if (status) {
      const orderToUpdate = data.find((order) => order.id === id);
      if (!orderToUpdate) {
        message.error("Order not found");
        return;
      }

      const payload = {
        studentNumber: orderToUpdate.studentNumber,
        studentName: orderToUpdate.studentName,
        gender: orderToUpdate.gender,
        status: status,
        orderItems: orderToUpdate.orderItems,
      };

      console.log("Updating status with payload:", payload);

      try {
        await axios.put(
          `https://api-prototype-2-kukaas-projects.vercel.app/api/order/${id}`,
          payload
        );

        setData((prevData) =>
          prevData.map((item) => (item.id === id ? { ...item, status } : item))
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
          onChange={(value) =>
            setSelectedStatus({ ...selectedStatus, [record.id]: value })
          }
          disabled={record.status === "CLAIMED"}
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
          <Button onClick={() => handleUpdate(record.id)}>Update</Button>
          <Popconfirm
            title="Are you sure to delete this order?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
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
            <Select disabled>
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
                      <Select placeholder="Level">
                        <Select.Option value="SHS">SHS</Select.Option>
                        <Select.Option value="COLLEGE">COLLEGE</Select.Option>
                      </Select>
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
                      name={[field.name, "size"]}
                      key={[field.key, "size"]}
                      rules={[{ required: true, message: "Missing size" }]}
                    >
                      <Select placeholder="Select a size">
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
                      {...field}
                      name={[field.name, "quantity"]}
                      key={[field.key, "quantity"]}
                      rules={[{ required: true, message: "Missing quantity" }]}
                    >
                      <Input placeholder="Quantity" type="number" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "unitPrice"]}
                      key={[field.key, "unitPrice"]}
                      rules={[
                        { required: true, message: "Missing Unit Price" },
                        {
                          pattern: /^\d+$/,
                        },
                      ]}
                    >
                      <Input placeholder="Unit Price" type="number" />
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
