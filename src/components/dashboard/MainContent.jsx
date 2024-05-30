import { Routes, Route, Outlet } from 'react-router-dom';
import Dashboard from './maincontent/Dashboard';
import Production from './maincontent/Production';
import FinishedProduct from './maincontent/FinishedProduct';
import Employees from './maincontent/Employees';
import SalesReport from './maincontent/SalesReport';

const MainContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Dashboard />} />
        <Route path="production" element={<Production />} />
        <Route path="finished-product" element={<FinishedProduct />} />
        <Route path="sales-report" element={<SalesReport />} />
        <Route path="employees" element={<Employees />} />
      </Route>
    </Routes>
  );
}

export default MainContent;
