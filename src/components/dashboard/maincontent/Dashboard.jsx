import { Typography, Row, Col, Table, Spin } from "antd";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import moment from "moment";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  //Sales Report Start
  const [data, setData] = useState([]);

  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    setLoading(true)
    fetch("https://api-prototype-2-kukaas-projects.vercel.app/api/sales-report")
      .then((response) => response.json())
      .then((data) => {
        const productTypes = data.map((item) => item.productType);
        // Set only the first 2-3 product types
        setProductTypes(productTypes.slice(0, 3));
        setLoading(false)
      })
      .catch((error) => console.error("Error:", error));
      setLoading(false)
  }, []);

  useEffect(() => {
    setLoading(true)
    fetch("https://api-prototype-2-kukaas-projects.vercel.app/api/sales-report")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((item) =>
          productTypes.includes(item.productType)
        );
        setData(filteredData);
        setLoading(false)
      })
      .catch((error) => console.error("Error:", error));
      setLoading(false)
  }, [productTypes]);

  // Group data by productType
  const groupedData = data.reduce((acc, item) => {
    const { productType, totalRevenue } = item;
    if (!acc[productType]) {
      acc[productType] = { productType, totalRevenue: 0 };
    }
    acc[productType].totalRevenue += totalRevenue;
    return acc;
  }, {});

  // Convert grouped data object into an array suitable for recharts
  const formattedData = Object.values(groupedData);

  // Color for each bar in the chart
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const date = moment(payload[0].payload.salesDate);
      const month = date.format("MMMM"); // Get the month name
      const year = date.format("YYYY"); // Get the year

      return (
        <div className="p-3 bg-white border border-gray-300 text-gray-700">
          <p className="font-bold">{`Product Type: ${payload[0].payload.productType}`}</p>
          <p>{`Total Revenue: ₱${payload[0].value.toLocaleString()}`}</p>
          <p>{`Month: ${month} ${year}`}</p>
        </div>
      );
    }

    return null;
  };

  const CustomLegend = () => (
    <div className="flex justify-center">
      <ul className="flex">
        {formattedData.map((entry, index) => (
          <li key={index} className="mr-3">
            <span
              className="inline-block w-4 h-4 mr-1"
              style={{ backgroundColor: colors[index % colors.length] }}
            ></span>
            {entry.productType}
          </li>
        ))}
      </ul>
    </div>
  );

  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        payload: PropTypes.shape({
          productType: PropTypes.string,
          salesDate: PropTypes.string,
        }),
        value: PropTypes.number,
      })
    ),
  };
  //Sales Report End

  //Production Start
  const [production, setProduction] = useState([]);

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const result = await axios(
        "https://api-prototype-2-kukaas-projects.vercel.app/api/production"
      );
      setProduction(result.data);
      setLoading(false)
    };

    fetchData();
  }, []);

  const columnsProduction = [
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
  ];
  //Production End

  //Orders Start
  const [order, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        "https://api-prototype-2-kukaas-projects.vercel.app/api/order"
      );
      setOrders(response.data);
    };

    fetchData();
  }, []);

  const columnsOrders = [
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
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
  ];
  //Orders End

  return (
    <Spin spinning={loading}>
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <div>
          <Table
            className="w-full overflow-x-hidden"
            columns={columnsOrders}
            dataSource={order}
            scroll={{ x: 800 }}
            pagination={{ pageSize: 3 }}
            title={() => (
              <Typography.Title level={4} className="text-center mb-4">
                Orders
              </Typography.Title>
            )}
          />
        </div>
      </Col>
      <Col xs={24} md={12}>
        <div style={{ padding: 24 }}>
          <Row justify="center">
            <Col>
              <Typography.Title level={4}>Sales Report</Typography.Title>
            </Col>
          </Row>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={formattedData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="productType" />
              <YAxis domain={[0, 100000]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              <Bar
                dataKey="totalRevenue"
                isAnimationActive={true}
                animationDuration={2000}
              >
                {formattedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Col>
      <Col xs={24} md={24}>
        <div>
          <Table
            columns={columnsProduction}
            dataSource={production}
            rowKey="id"
            title={() => (
              <Typography.Title level={4} className="text-center mb-4">
                Production
              </Typography.Title>
            )}
            pagination={{ pageSize: 2 }}
            scroll={{ x: "max-content" }}
            className="sm:w-full md:w-full"
          />
        </div>
      </Col>
    </Row>
    </Spin>
  );
};

export default Dashboard;
