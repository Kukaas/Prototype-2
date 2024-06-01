import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Popconfirm, Spin, Table, Typography, message } from "antd";

const FinishedProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios(
        "https://api-prototype-2-kukaas-projects.vercel.app/api/finished-product"
      );
      setData(result.data);
      console.log(result.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (record) => {
    try {
      await axios.delete(
        `https://api-prototype-2-kukaas-projects.vercel.app/api/finished-product/${record.id}`
      );
      // After deleting, filter out the deleted record from the current state
      setData(data.filter((item) => item.id !== record.id));
      message.success("Finished Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete record", error);
      message.error("Failed to delete Finished Product");
    }
  };

  const columns = [
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      width: 150,
    },
    {
      title: "Product Type",
      dataIndex: "productType",
      key: "productType",
      width: 150,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: 100,
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
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
          <Typography.Title level={2}>Finished Products</Typography.Title>
        </div>
        <Table
          className="sm:w-full md:w-full"
          columns={columns}
          dataSource={data}
          scroll={{ x: "max-content" }}
        />
      </div>
    </Spin>
  );
};

export default FinishedProduct;
