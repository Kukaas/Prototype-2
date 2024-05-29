import { useState, useEffect } from 'react';
import { Table, Typography } from 'antd';
import axios from 'axios';

const Production = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://api-prototype-2-kukaas-projects.vercel.app/api/production');
      setData(result.data);
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Assigned Employee',
      dataIndex: ['user', 'name'],
      key: 'name',
    },
    {
      title: 'Product Type',
      dataIndex: 'productType',
      key: 'productType',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div>
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id" 
        title={() => <Typography.Title level={4} className="text-center mb-4">Production</Typography.Title>}
        pagination={{ pageSize: 2 }}
      />
    </div>
  );
};

export default Production;