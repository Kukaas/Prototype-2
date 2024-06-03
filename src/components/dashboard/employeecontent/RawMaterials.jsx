import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Spin,
  Typography,
  InputNumber,
  message,
} from "antd";

const RawMaterials = () => {
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
      title: "Action",
      key: "action",
      render: (record) => (
        <div>
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => handleUpdate(record.id)}
          >
            Update
          </Button>
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
    </Spin>
  );
};

export default RawMaterials;
