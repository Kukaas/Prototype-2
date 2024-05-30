import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Popconfirm, Spin, Table, Typography, message } from "antd";

const FinishedProductInventory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api-prototype-2-kukaas-projects.vercel.app/api/inventory")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (record) => {
    try {
      await axios.delete(
        `https://api-prototype-2-kukaas-projects.vercel.app/api/inventory/${record.id}`
      );
      message.success("Record deleted successfully");
      setData(data.filter((item) => item.id !== record.id));
    } catch (error) {
      console.error("Failed to delete record", error);
      message.error("Failed to delete record");
    }
  };

  const columns = [
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
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

  return (
    <Spin spinning={loading}>
      <div className="justify-center sm:w-full">
        <div className="text-center mt-2">
          <Typography.Title level={2}>
            Finished Product Inventory
          </Typography.Title>
        </div>
        <Table
          className="sm:w-full md:w-full"
          columns={columns}
          dataSource={data}
          rowKey="id"
          scroll={{ x: "max-content" }}
          pagination={{ pageSize: 9 }}
        />
      </div>
    </Spin>
  );
};

export default FinishedProductInventory;
