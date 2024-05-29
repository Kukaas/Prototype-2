import { Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const columns = [
  {
    title: 'Student Number',
    dataIndex: 'studentNumber',
    key: 'studentNumber',
    width: 150,
  },
  {
    title: 'Student Name',
    dataIndex: 'studentName',
    key: 'studentName',
    width: 150,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 100,
  },
  {
    title: 'Total Price',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    width: 100,
  },
  {
    title: 'Items',
    dataIndex: 'orderItems',
    key: 'orderItems',
    width: 150,
    render: items => items.map((item, index) => 
      <React.Fragment key={index}>
        <strong>{item.productType}</strong>: {item.quantity}
        {index < items.length - 1 && ', '}
      </React.Fragment>
    ),
  },
];

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://api-prototype-2-kukaas-projects.vercel.app/api/order');
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <Table 
        className='w-full overflow-x-hidden'
        columns={columns} 
        dataSource={data} 
        scroll={{ x:  800 }}
        pagination={{ pageSize: 3 }}
        title={() => <Typography.Title level={4} className="text-center mb-4">Orders</Typography.Title>}
      />
  );
};

export default DataTable;