import { Routes, Route, Outlet } from "react-router-dom";
import Production from "./employeecontent/Production";

const EmployeeMainContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="production" index element={<Production />} />
      </Route>
    </Routes>
  );
};

export default EmployeeMainContent;
