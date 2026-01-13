import Feedback from "../Feedback/Feedback";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="welcome">
        <h1>Welcome, Admin Dora</h1>
        <p>All Messages from users were displayed below.</p>
      </div>
      <Feedback />
    </div>
  );
};

export default Dashboard;
