import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast"; 

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Messages from "./pages/Messages/Messages";          
import Subscribers from "./pages/Subscribers/Subscribers"; 
import Feedback from "./pages/Feedback/Feedback";          
import AdminHeader from "./components/AdminHeader/AdminHeader";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("adminToken"));

  return (
    <Router>
      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Show header only if logged in */}
      {isLoggedIn && <AdminHeader onLogout={() => setIsLoggedIn(false)} />}

      <Routes>
        {/* Login route */}
        <Route
          path="/login"
          element={
            isLoggedIn 
              ? <Navigate to="/dashboard" /> 
              : <Login onLogin={() => setIsLoggedIn(true)} />
          }
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/messages"
          element={isLoggedIn ? <Messages /> : <Navigate to="/login" />}
        />
        <Route
          path="/subscribers"
          element={isLoggedIn ? <Subscribers /> : <Navigate to="/login" />}
        />
        <Route
          path="/feedback"
          element={isLoggedIn ? <Feedback /> : <Navigate to="/login" />}
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
