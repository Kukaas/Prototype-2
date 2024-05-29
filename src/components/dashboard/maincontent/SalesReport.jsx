import { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { Typography } from 'antd';

const SalesReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://api-prototype-2-kukaas-projects.vercel.app/api/sales-report');
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Typography.Title level={4} className="text-center mb-4">Production</Typography.Title>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default SalesReport;