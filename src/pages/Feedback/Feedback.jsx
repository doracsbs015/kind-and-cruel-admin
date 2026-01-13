import { useEffect, useState, useCallback } from "react";
import { getAdminFeedback } from "../../services/api";
import "./Feedback.css";

const Feedback = () => {
  const token = localStorage.getItem("adminToken");
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = useCallback(async () => {
  if (!token) return [];
  try {
    const res = await getAdminFeedback(token);
    return res; // return data instead of calling setFeedbacks here
  } catch (err) {
    console.error("❌ Fetch feedbacks failed:", err.message || err);
    return [];
  }
}, [token]);

useEffect(() => {
  let mounted = true;
  if (!token) return;

  (async () => {
    try {
      const res = await fetchFeedbacks();
      if (mounted) setFeedbacks(res);
    } catch (err) {
      console.error("❌ Initial load failed:", err);
    }
  })();

  return () => {
    mounted = false;
  };
}, [fetchFeedbacks, token]);

  return (
    <section className="feedback-section">
      <h3 className="feedback-title">Messages from Users</h3>

      {feedbacks.length === 0 ? (
        <p className="empty-text">No feedback received yet.</p>
      ) : (
        <div className="feedback-cards">
          {feedbacks.map((f) => (
            <div key={f._id} className="feedback-card">
              <p className="message">“{f.message}”</p>
              <div className="info">
                <span className="author">
                  {f.anonymous || !f.name ? "Anonymous" : f.name}
                </span>
                <span className="date">
                  {new Date(f.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Feedback;
