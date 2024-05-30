import { useState, useEffect } from "react";
import { Table, Button, Typography, Popconfirm, message, Spin } from "antd";
import axios from "axios";

const Production = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const result = await axios(
        "https://api-prototype-2-kukaas-projects.vercel.app/api/production"
      );
      setData(result.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Assigned Employee",
      dataIndex: ["user", "name"],
      key: "name",
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
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Popconfirm
            title="Are you sure delete this record?"
            onConfirm={() => handleDelete(record)}
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

  const handleDelete = async (record) => {
    try {
      await axios.delete(
        `https://api-prototype-2-kukaas-projects.vercel.app/api/production/${record.id}`
      );
      // After deleting, you can fetch the data again or filter out the deleted record from the state
      const newData = data.filter((item) => item.id !== record.id);
      message.success("Production deleted successfully");
      setData(newData);
    } catch (error) {
      console.error("Failed to delete record", error);
      message.error("Failed to delete Production");
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="justify-center sm:w-full">
        <div className="text-center mt-2">
          <Typography.Title level={2}>Productions</Typography.Title>
        </div>
        <Table
          className="sm:w-full md:w-full"
          columns={columns}
          dataSource={data}
          rowKey="id"
          scroll={{ x: "max-content" }}
        />
      </div>
    </Spin>
  );
};

export default Production;
