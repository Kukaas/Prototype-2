import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Typography, Popconfirm, message } from "antd";
import moment from "moment";

const Employees = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api-prototype-2-kukaas-projects.vercel.app/api/user")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleDelete = async (record) => {
    try {
      await axios.delete(
        `https://api-prototype-2-kukaas-projects.vercel.app/api/user/${record.id}`
      );
      message.success("User deleted successfully");
      setData(data.filter((item) => item.id !== record.id));
    } catch (error) {
      console.error("Failed to delete record", error);
      message.error("Failed to delete user");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Birth Date",
      dataIndex: "birthDate",
      key: "birthDate",
      width: 150,
      render: (text) => moment(text).format("MMMM, D, YYYY"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
      width: 150,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button type="primary" className="mr-2">
            Edit
          </Button>
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
    <div className="justify-center sm:w-full">
      <div className="text-center mt-2">
        <Typography.Title level={2}>Users</Typography.Title>
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
  );
};

export default Employees;
