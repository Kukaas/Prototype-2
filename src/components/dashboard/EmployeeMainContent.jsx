import { Routes, Route, Outlet } from "react-router-dom";
import Production from "./employeecontent/Production";
import RawMaterials from "./employeecontent/RawMaterials";

const EmployeeMainContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="production" index element={<Production />} />
        <Route path="raw-material-inventory" index element={<RawMaterials />} />
      </Route>
    </Routes>
  );
};

export default EmployeeMainContent;
