import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import "./App.css";
import AdminPage from "./components/AdminPage";
import EmployeePage from "./components/EmployeePage";
import MainContent from "./components/dashboard/MainContent";
import { useState } from "react";
import UserContext from "./UserContext";

function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home/admin/:id/*" element={<AdminPage />}>
              <Route path="*" element={<MainContent />} />
            </Route>
            <Route path="/home/employee/:id" element={<EmployeePage />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
