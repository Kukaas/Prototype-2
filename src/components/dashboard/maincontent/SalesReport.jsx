import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  CartesianGrid,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import PropTypes from "prop-types";
import { Spin, Typography } from "antd";

const SalesReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios(
        "https://api-prototype-2-kukaas-projects.vercel.app/api/sales-report"
      );
      setData(result.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
  ];

  // Group data by productType and create a separate bar for each size and level
  const groupedData = data.reduce((acc, item) => {
    const key = item.productType;
    if (!acc[key]) {
      acc[key] = [];
    }
    const subKey = `${item.size}-${item.level}`;
    const subItem = acc[key].find((i) => i.name === subKey);
    if (subItem) {
      subItem.totalRevenue += item.totalRevenue;
    } else {
      acc[key].push({ name: subKey, totalRevenue: item.totalRevenue });
    }
    return acc;
  }, {});

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const date = moment(payload[0].payload.salesDate);
      const month = date.format("MMMM"); // Get the month name
      const year = date.format("YYYY"); // Get the year
      const [size, level] = payload[0].payload.name.split("-");

      return (
        <div className="p-3 bg-white border border-gray-300 text-gray-700">
          <p className="font-bold">{`Size: ${size}`}</p>
          <p className="font-bold">{`Level: ${level}`}</p>
          <p>{`Total Revenue: ₱${payload[0].value.toLocaleString()}`}</p>
          <p>{`Month: ${month} ${year}`}</p>
        </div>
      );
    }

    return null;
  };

  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        payload: PropTypes.shape({
          name: PropTypes.string,
          salesDate: PropTypes.string,
        }),
        value: PropTypes.number,
      })
    ),
  };

  return (
<Spin spinning={loading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
    {Object.entries(groupedData).map(([key, group], index) => (
      <div key={key} className="mb-10 border-b border-gray-200 ml-6">
        <Typography.Title level={4} className="text-center">
          {key}
        </Typography.Title>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart width={500} height={300} data={group}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis domain={[0, "dataMax + 10000"]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="totalRevenue"
              fill={colors[index % colors.length]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    ))}
  </div>
</Spin>
  );
};

export default SalesReport;
