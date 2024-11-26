import React from "react";
import './App.css';
import { RoleProvider } from "./context/RoleContext";
import AdminDashboard from "./Dashbord/AdminDashboard";

function App() {
  return (
    <RoleProvider>
      <div>
        <AdminDashboard />
      </div>
    </RoleProvider>
  );
}

export default App;
