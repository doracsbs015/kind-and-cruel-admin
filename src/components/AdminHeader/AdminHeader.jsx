import { NavLink, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa"; // 
import toast from "react-hot-toast"; 
import "./AdminHeader.css";

const AdminHeader = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    if (onLogout) onLogout();
    toast.success("Logged out successfully "); 
    navigate("/login");
  };

  return (
    <header className="admin-header">
      {/* Heart icon → Front-end user link */}
      <div className="admin-icon">
        <a
          href="https://kindandcruel.vercel.app/" 
          target="_blank"
          rel="noopener noreferrer"
          title="Go to Front-end"
        >
          <FaHeart size={24} color="#f0e6e6" />
        </a>
      </div>

      <h2>Admin Panel</h2>
      <nav>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/messages" className={({ isActive }) => isActive ? "active" : ""}>Quotes</NavLink>
        <NavLink to="/subscribers" className={({ isActive }) => isActive ? "active" : ""}>Subscribers</NavLink>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default AdminHeader;
