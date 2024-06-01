import { Routes, Route, Outlet } from "react-router-dom";
import Production from "./employeecontent/Production";
import FinishedProduct from "./employeecontent/FinishedProduct";

const EmployeeMainContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="production" index element={<Production />} />
        <Route path="finished-product" element={<FinishedProduct />} />
      </Route>
    </Routes>
  );
};

export default EmployeeMainContent;
